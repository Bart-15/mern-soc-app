const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');



// validation config
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');
const {deleteAccountEmail} =  require('../../email/account')




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
            errors.noprofile = 'There is no profile for this user';
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
        return res.status(400).json(errors);
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


// get /api/profile/handle/:handle
// get profile by Handle
router.get('/api/profile/handle/:handle', async (req, res) => {
    const errors = {}
    const profile = await Profile.findOne({handle: req.params.handle}).populate('user', ['name', 'avatar'])

    try{
        if(!profile){
            errors.noprofile = "Profile not found"
            return res.status(404).json(errors)
        }

        res.status(200).json(profile)
    }catch (err){
        res.status(401).send(err)
    }
});


// GET profile by ._id
// public route
router.get('/api/user/:user_id', async (req, res) => {
    const errors = {}

    const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar'])
    try{
        if(!profile){
            errors.noprofile = "There is no profile for this user";
            return res.status(404).send(errors);   
        }

        res.status(200).json(profile)
    }catch(err){
        res.status(404).send({errors:"Theres no profile for this"})
    }
})

// get profile all users
// public route
router.get('/api/all', async (req, res) => {
    const errors = {}
    const profile = await Profile.find({}).populate('user', ['name', 'avatar']);


    try{
        if(!profile){
            errors.noprofile = "There's no profile this time"
            return res.status(404).send(errors)
        }


        res.status(200).json(profile)
    }catch(err){
        res.ststatus(404).send({errors:"There's no profile this time"})
    }
})


// @route POST api/profile/experience
router.post('/api/profile/experience', passport.authenticate('jwt', {session:false}), async (req, res) => {
    const {errors, isValid} = validateExperienceInput(req.body)

    if(!isValid) {
        return res.status(400).json(errors)
    }


    const newExperience = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
    };

    try{
        const profile = await Profile.findOne({user: req.user._id});
        profile.experience.unshift(newExperience)
        await profile.save();
        res.json(profile);
    }catch(err){
        res.status(400).send()
    }

});




// @route POST api/profile/education
// add education
router.post('/api/profile/education',  passport.authenticate('jwt', {session:false}), async (req, res) => {
    const {errors, isValid} = validateEducationInput(req.body)

    if(!isValid){
        return res.status(400).json(errors)
    }

    const newEduc = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        description: req.body.description,
    }

    try{
        const profile = await Profile.findOne({user: req.user._id});
        if(!profile){
            return res.status(404).json({noprofile:"No profile found"})
        }

        profile.education.unshift(newEduc);
        await profile.save();
        res.status(200).json(profile)

    }catch(e){
        res.status(400).send()
    }
})



// delete experience
// /api/experience/experience/:epx_id
router.delete('/api/profile/experience/:exp_id', passport.authenticate('jwt', {session:false}), async (req, res) => {
 
    // You can use the filter method to delete the experience
    //  const removeExp =  profile.experience.filter(item => item._id !== req.params.exp_id)
    //  profile.experience.splice(removeExp, 1)

    const profile = await Profile.findOne({user: req.user._id});

    try{
    if(!profile){
        return res.status(404).json()
    }

    // Get remove the object
    const removeIndex = profile.experience.map(item => item._id).indexOf(req.params.exp_id);
    
    //Splice the array
    profile.experience.splice(removeIndex, 1)

    // then save
     await profile.save()
     res.status(200).json(profile)
    
    }catch(err){
        res.status(404).send()
    }
});


// delete education 
// private
// /api/profile/education/:edc_id
router.delete('/api/profile/education/:edu_id', passport.authenticate('jwt', {session:false}), async (req, res) => {
    const profile = await Profile.findOne({user: req.user._id});

    try{
        if(!profile){
            return res.status(404).send();
        }
    // filter the profile education profile
    const removeEducation = profile.education.filter(item => item._id !== req.params.edu_id);
    profile.education.splice(removeEducation, 1);
    await profile.save();
    res.status(200).json(profile);
    }catch (err){
        res.status(404).send()
    }

})


// delete user and profileFields
router.delete('/api/profile', passport.authenticate('jwt', {session:false}), async (req, res) => {
     await Profile.findOneAndRemove({user: req.user._id});
     await User.findOneAndRemove({_id: req.user._id});
     deleteAccountEmail(req.user.email)
     res.json({success: true})
})
module.exports = router;
