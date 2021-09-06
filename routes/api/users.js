const express = require('express');
const User = require('../../models/User')
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys').JWT_SECRET;
const passport = require('passport');


// validate register;
const validateRegisterInput = require('../../validation/register')

// register route
router.post('/register',  async (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body)
    const user =  await User.findOne({email: req.body.email})
 
    if(!isValid){
        return res.status(400).json(errors)
    }
  
      try{
        if(user){
            errors.email = 'Email is already taken'
            return res.status(400).json(errors)
        }

        const avatar = gravatar.url(req.body.email, { 
            s:'200', //size of image
            r:'pg', 
            d:'mm'
        })
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            avatar,
            password: req.body.password,
        })


    
        newUser.password = await bcrypt.hash(newUser.password, 8);
        await newUser.save()
        res.json(newUser);
    
        res.status(400).send()

      } catch(err){
          res.status(500).send()
      }
        
    
})

// login User
router.post('/users/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({email:"User not found"});
    }

    //check the password
    const passMatch = await bcrypt.compare(password, user.password);
    if(!passMatch){
        return res.status(400).json({password:"Password does not match"});
    }

    // Generate Token
    const payload = {_id: user._id, name: user.name, email: user.email, avatar:user.avatar}
    const token =  await jwt.sign(payload, keys, {expiresIn: 3600});

    res.json({success: true, token:'Bearer ' + token})
})


// return current user with valid jwt

router.get('/api/users/current', passport.authenticate('jwt', {session:false}),  (req, res) => {
    const { _id, name, email, } = req.user;
    res.json({_id, name, email})  
})

module.exports = router;