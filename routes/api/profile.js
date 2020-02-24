const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load profile model
const Profile = require('../../models/Profile');

//Load user model
const User = require('../../models/User');

//Load validation
const validateProfileInput = require('../../validation/profile');

//@route POST api/Profile
//@desc  GET current users profile
//@access Private
router.get('/', 
    passport.authenticate('jwt', {session: false}), 
    (req, res) => {
        const errors = {};

        Profile.findOne({user: req.user.id})
            .populate('user',['name','avatar'])
            .then(profile => {
                if(!profile){
                    errors.noprofile = "Profile user not found";
                    return res.status(404).json(errors);
                }
                res.json(profile);
            })
            .catch(err => console.log(err));
    })

    //@route GET api/profile/all
    //@desc  GET all users profile
    //@access public
    router.get('/all', (req,res) => {
        const errors= {};

        Profile.find({user: req.body.id})
            .populate('user',['user','avatar'])
            .then(profiles => {
                if(!profiles) {
                    error.noprofile = "Profile user not found";
                    return res.status(404).json(errors);
                }
                res.json(profiles);
            })
            .catch(err => console.log(err));
    })

    //@route GET api/profile/handle/:handle
    //@desc  GET profile by handle
    //@access Public
    router.get('/handle/:handle',(req,res) => {
        const errors = {};
        Profile.findOne({handle: req.params.handle})
            .populate('user',['user','avatar'])
            .then(profile => {
                if(!profile) {
                    errors.noprofile = "Profile user not found";
                    return res.status(404).json(errors);
                }
                res.json(profile);
            })
            .catch(err => res.status(404).json(err));
    })

    //@route GET api/profile/user/:user_id
    //@desc  GET profile by user
    //@access Public
    router.get('/user/user_id', (req, res) => {
        const error = {};
        console.log(re.params.id);
        Profile.findOne({user: req.params.user_id})
            .populate('user',['user','avatar'])
            .then(profile => {
                if(!profile) {
                    errors.noprofile = "Profile user not found";
                    return res.status(404).json(error);
                }
                res.json(profile);
            })
            .catch(err => res.status(404).json(err));
    })

   // @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateProfileInput(req.body);
      // Check Validation
      if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
      }
      
      // Get fields
      const profileFields = {}; 
      profileFields.user = req.user.id;
      if(req.body.handle) profileFields.handle = req.body.handle;
      if(req.body.website) profileFields.website = req.body.website;
      if(req.body.bio) profileFields.bio = req.body.bio;
      if(req.body.location) profileFields.location = req.body.location;
      if(req.body.status) profileFields.status = req.body.status;
      if(req.body.phoneno) profileFields.phoneno = req.body.phoneno;
      if(req.body.gender) profileFields.gender = req.body.gender;
      
      Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          // Update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(profile => res.json(profile));
        } else {
          // Create
  
          // Check if handle exists
          Profile.findOne({ handle: profileFields.handle })
          .then(profile => {
            if (profile) {
              errors.handle = 'That handle already exists';
              res.status(400).json(errors);
            }
           // Save Profile
           new Profile(profileFields)
           .save()
           .then(profile => res.json(profile));
          });
        }
      });
    }
  );
  
    //@route DELETE api/profile
    //@desc Delete user profile
    //@access Private
    router.delete('/', 
        passport.authenticate('jwt',{session: false}),
        (req,res) => {
            Profile.findOneAndRemove({user: req.user.id}).then(() => {
                User.findOneAndRemove({_id : req.user.id}).then(() => 
                    res.json({success : true})
                );
            });
    }
);
 module.exports = router;