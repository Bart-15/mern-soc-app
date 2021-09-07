const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// validateProfileInput
const validateProfileInput = require('../../validation/profile');


// Profile
const Profile = require('../../models/Profile')
// User
const User = require('../../models/User');


router.get('/profile/test', async (req, res) => {
    res.json({msg:"Test message"})
})


// get current user
// private
router.get('/api/profile', passport.authenticate('jwt', {session:false}), async (req, res) => {
    const errors = {}
    // find user
    const user = await Profile.findOne({user: req.user._id}).populate('user', ['name', 'avatar']);

    try{
        if(!user){
            errors.noprofile = 'There is no profile this user';
            return res.status(404).send(errors);
        }
        res.json(user);
    }catch(err){
        console.log(err);
    }
})


// create user pofile
// private
router.post('/api/profile', passport.authenticate('jwt', {session:false}), async (req, res) => {
    const {errors, isValid} = validateProfileInput(req.body);

    if(!isValid){
        return res.status(401).json(errors);
    }
    
    const profileFields = {};
    profileFields.user = req.user._id;
    
    // get and set the fields
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.github) profileFields.github = req.body.github;


    if(typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }

    // initialize socials
    profileFields.social = {};
     if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
     if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
     if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
     if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
     if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

    // find the profile then update if it exist and if not then create;
    const user = await Profile.findOne({user: req.user._id});

    try{
        if(user){
           const profile = await Profile.findOneAndUpdate({user: req.user._id}, profileFields, {new: true})
           return res.json(profile);
        }
    
    
        const newProfile = await new Profile(profileFields).save();
        res.json(newProfile);
        
        
    }catch(err){
        console.log(err);
    }
    

  

})



module.exports = router;
