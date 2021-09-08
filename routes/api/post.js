const express = require('express');
const passport = require('passport');
const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
// Load validation for post request
const validatePostInput = require('../../validation/post');
const router = express.Router();

// Create Post
// Private
router.post('/api/posts', passport.authenticate('jwt', {session:false}), async (req, res) => {
   

    const {errors, isValid} = validatePostInput(req.body)

    if(!isValid) {
        return res.status(400).json(errors)
    }

    const newPost = {
        user: req.user._id, 
        text: req.body.text,
        avatar: req.body.avatar,    
        name: req.body.name, 
    }

    try{
       const post =  await new Post(newPost).save();
       res.status(200).json(post)
    }catch(e) {
        res.status(400).send();
    }

})


// Fetch All Post
// Public
router.get('/api/posts', async (req, res) => {
    const post = await Post.find({});
    const errors = {}
    try{
        if(!post){
            errors.nopost = "No post available right now."
            return res.status(404).json(errors)
        }


        res.status(200).json(post)
    }catch(e) {
        res.status(500).send(); 
    }
})


// Fetch post by ID
// Public
router.get('/api/posts/:id', async (req, res) => {
    const post = await Post.findById({_id: req.params.id});
    const errors = {};

    try{
        if(!post){
            errors.nopost = "Post not found";
            return res.status(404).send(errors);
        }

        res.status(200).json(post)
    }catch(e){
        res.status(400).send();
    }
})

// delete post by id
// Private Route

router.delete('/api/post/:id', passport.authenticate('jwt', {session:false}), async (req, res) =>{
   const post = await Post.findById({_id:req.params.id}) 
  
   const post_id = JSON.stringify(post.user);
   const user_id = JSON.stringify(req.user._id);
   
  
   try{
       if(post_id !== user_id){
           return res.status(401).json({unauthorized:"The user is not authorized to access this"})
       } 

       await post.remove()
       res.json({success: true})
   }catch(err){
       res.status().json(err)
   }

   
})

module.exports = router;