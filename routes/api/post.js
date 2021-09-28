const express = require('express');
const passport = require('passport');
const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
// Load validation for post request
const validatePostInput = require('../../validation/post');
const validateCommentInput = require('../../validation/comment')
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
        res.status(400).json();
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
router.delete('/api/post/:id', passport.authenticate('jwt', {session:false}),  (req, res) =>{
   Profile.findOne({user: req.user._id})
    .then(profile => {
        Post.findById(req.params.id).then(post => {
            // check if the user is authorized to delete the post
            if(post.user.toString() !== req.user._id.toString()){
                return res.status(401).json({unauthorized:"User is not authorized to delete this post"});
            }

            post.remove().then(() => res.json({success: true}));
        })
        .catch(err => res.status(404).json({postnotfound:"No post found"}))
    })
})



///api/posts/like/:id
router.post('/api/posts/like/:id', passport.authenticate('jwt', {session:false}),  (req, res) => {
    Profile.findOne({user: req.user._id})
    .then(profile => {
        Post.findById(req.params.id).then(post => {
            // check if the user already liked this post
            if(post.likes.filter(like => like.user.toString() === req.user._id.toString()).length > 0) {
                return res.status(400).json({alreadyLiked:"User already liked this post"})
            }
            // Add likes to post
            post.likes.unshift({user: req.user._id});
            post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({postnotfound:"No post found"}))
    })       
  }
);

///api/posts/unlike/:id
router.post('/api/posts/unlike/:id', passport.authenticate('jwt', {session:false}),  (req, res) => {
    Profile.findOne({user:req.user._id})
        .then(profile => {
            Post.findById(req.params.id).then(post => {
                if(post.likes.filter(like => like.user.toString() === req.user._id.toString()).length === 0) {
                    return res.status(400).json({notliked:"You have not liked yet"})
                }

                // remove like
                const removeLike = post.likes.filter(like => like.user !== req.user._id)
                post.likes.splice(removeLike, 1)
                post.save().then(post =>  res.json(post))
            })
            .catch(err => res.status(404).json({postnotfound:"No post found"}))
        })
});


// add comment to post
// /api/post/comments/:id 
router.post('/api/posts/comment/:id', passport.authenticate('jwt', {session:false}), async(req, res) => {
    const post = await Post.findById(req.params.id);
    const {errors, isValid} = validateCommentInput(req.body)

    if(!isValid){
        return res.status(400).json(errors)
    }
    
    const newComment = {
        user: req.user._id,
        text: req.body.text,
        name: req.body.name,    
        avatar: req.body.avatar,
    }   

    try{
        if(!post) {
            return res.status(404).json({postnotfound:"Post not found"})
        }

        post.comments.unshift(newComment)
        await post.save();
        res.status(200).json(post);
    }catch(err){
        res.status(404).json({postnotfound:"Post not found"})
    }
})

// delete comment by ID
// Private get the post

router.delete('/api/posts/comment/:id/:comment_id', passport.authenticate('jwt', {session:false}), async (req, res) => {
    const posts = await Post.findById(req.params.id);

    try{
        if(posts.comments.filter(comment => comment._id.toString() === req.params.comment_id.toString()).length === 0) {
            return res.status(404).json({commentnotexist:"Comment not exist"});
        }

        const removeComment = posts.comments.map(comment => comment._id.toString()).indexOf(req.params.comment_id);
        posts.comments.splice(removeComment, 1);
        await posts.save()
        res.json(posts)

    }catch(err){
        res.status(404).json({postnotfound:"Post not found"})
    }

});




module.exports = router;