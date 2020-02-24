const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Post model
const Post = require('../../models/Post');

//Profile model
const Profile = require('../../models/Profile');

//Validation
const validatePostInput = require('../../validation/post');

//@route GET api/posts
//@desc Get all Post
//@access public
router.get('/', (req,res) => {
    Post.find()
    .sort({date: -1})
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({nopostsfound : 'No posts found'}));
});

//@route GET api/posts/:id
//@desc Get post by id
//@access public
router.get('/:id', (req,res) => {
    Post.findById(req.params)
    .sort({date: -1})
    .then(post => res.json(post))
    .catch(err => res.status(404).json({nopostfound : 'No posts found for that ID'}));
});

//@route POST api/posts
//@desc Create post
//@access private
router.post('/', 
    passport.authenticate('jwt', {session: false}),
    (req,res) => {
        const {errors, isValid} = validatePostInput(req.body);

        //Check validation
        if(!isValid)
        {
            return res.status(400).json(errors);
        }
        //Create post               
        const newPost = {};
        newPost.user = req.user.id;
        if(req.body.imageurl) newPost.imageurl = req.body.imageurl;
        if(req.body.name) newPost.name = req.body.name;
        if(req.body.avatar) newPost.avatar = req.body.avatar;

        //Hashtag -Split into array
        if(typeof req.body.hashtag !== 'undefined')
            newPost.hashtag = req.body.hashtag.split(' ');

        new Post(newPost)
        .save()
        .then(post => res.json(post));
    }
);

//@route POST api/posts
//@desc Delete post by id
//@access private
router.delete('/:id',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Post.findById(req.params.id)
            .then(post => {
                if(post.user.toString() !== req.user.id) {
                    return res.status(404).json({notauthorized: 'User not authorized'});
                }
                //Delete
                post.remove
                    .then(() => res.json({success: true}));
            })
            .catch(err =>res.status(404).json({postnotfound: 'No post found'}));
         });

//@route GET api/posts/like
//@desc Get all Like
//@access private
router.post('/like',
   passport.authenticate('jwt', {session: false}),  
    (req,res) => {
        Post.find()
        .then(likes => {
            res.json(likes);
        })
        .catch(err => res.status(404).json({likesnotfound : 'No likes for this post'}));
    }
);

//@route POST api/posts/like/:id
//@desc Like post
//@access private
router.post('/like/:id',
    passport.authenticate('jwt', {session: false}),
    (req,res) => {
        Post.findById(req.params.id)
        .then(post => {
            if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0)
            {
                return res.status(400).json({alreadyliked: 'User already liked the post'});
            }
            //Add user id to likes array
            post.likes.unshift({user: req.user.id});
            post
            .save()
            .then(post => res.json(post));
        })
        .catch(err => res.status(400).json({postnotfound: "No post found"}));
    }
    );

//@route POST api/posts/unlike/:id
//@desc Unlike post
//@access private
router.post('unlike/:id',
    passport.authenticate('jwt', {session: false}),
    (req,res) => {
        Post.findById(req.params.id)
        .then(post => {
            if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0)
            {
                return res.status(400).json({alreadyliked: 'You have not liked this post'});
            }
            //Remove like
            const removeIndex = post.likes.map(item => item.user.toString())
                                .indexOf(req.user.id);
            //Splice out of Array
            post.likes.splice(removeIndex, 1);

            //Save
            post.save()
                .then(post => res.json(post));
        })
        .catch(err => res.status(400).json({postnotfound: 'No post found'}));
});

//@route GET api/posts/comment
//@desc Get all comments
//@access private
router.post('/comment', 
    passport.authenticate('jwt', {session: false}),
    (req,res) => {
        Post.find()
        .then(comments => {
            res.json(comments);
        })
        .catch(err => res.status(404).json({commentsnotfound : 'Comments not found'}));
    }
);
//@route POST api/posts/comment/:id
//@desc Add comment
//@access private
router.post('/comment/:id', 
    passport.authenticate('jwt', {session: false}),
    (req,res) => {
        const {errors, isValid} = validatePostInput(req.body);
            if(!isValid){
                return res.status(400).json(errors);
            }
        Post.findById(req.params.id)
            .then(post => {
               const newComment = {
                   text: req.body.text,
                   name: req.body.name,
                   avatar: req.body.avatar,
                   user: req.user.id
               };
            //Add to comments array
            post.comments.unshift(newComment);
            //Save comment
            post.save().then(post => res.json(post));   
        })
        .catch(err => res.status(400).json({postnotfound: 'No post found'}));
    }
);

//@route DELETE api/posts/comment/:id
//@desc Delete comment
//@access private
router.delete('/comment/:id/:comment_id ', 
    passport.authenticate('jwt', {session : false}),
        (req, res) => {
            Post.findById(req.params.id)
              .then(post => {
                if(post.comments.filter(
                    comment => comment._id.toString() === req.params.comment_id
                ).length === 0)
                {
                    return res.status(404).json({commentnotexists: 'Comment does not exists'});
                }
                //Remove index
                const removeIndex = post.comments
                    .map(item => item._id.toString())
                    .indexOf(req.params.comment_id);

                 //Splice comment out of array
                 post.comments.splice(removeIndex, 1);

                 post.save().then(post => res.json(post));   
             } )
             .catch(err =>res.status(404).json({postnotfound : 'No post found'}));
        }
);


//@route GET api/posts/hastag
//@desc Get all hashtag
//@access private
router.post('/hashtag', 
    passport.authenticate('jwt', {session: false}),
    (req,res) => {
        /*Hashtag.find(postid: req.body.id)
         .then(posts => {
             posts.foreach(hashtag => {
                 if(hashtag){
                    res.json(posts);
                 }
             })
         })
        */
        Post.find({hashtag: req.body.hashtag})
        .then(posts => {
            res.json(posts);
        })
        .catch(err => res.status(404).json({hastagnotfound : 'Hashtag not found'}));
    }
);

module.exports = router;