const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
//User model
const User = require('../../models/User');

//Profile model
const Profile = require('../../models/Profile');

//Network model
const Network = require('../../models/Network');

//@route Get api/network
//@desc Get profile
//@access public
router.get('/follow', 
    passport.authenticate('jwt', {session: false}), 
    (req, res) => {
        Network.findOne({user: req.user.id})
            .populate('user',['name','avatar'])
            .then(follow => {
                if(!follow){
                   return res.status(404).json("Network not found");
                }
                res.json(follow);
            })
            .catch(err => console.log(err));
    }
);

//@route POST api/network/follow
//@desc Follow a profile
//@access private
router.get('/follow/:id', 
    passport.authenticate('jwt',{session: false}),
    (req, res) => {
        Network.findById(req.params.id)
        .then(network => {
            if(network.follower.filter(follow => follow.user.toString() === req.user.id).length > 0)
            {
                return res.status(400).json({alreadyliked: 'User already followed the person'});
            }
            const newFollower = {
                user: req.user.id,
                name: req.body.name,
                avatar: req.body.avatar
            };
             //Add user id to Follower array
             network.follower.unshift(newFollower);
             //Save follow
             network.save().then(network => res.json(network));
          })
          .catch(err => res.status(400).json({networknotfound: "No network found"}));
        
    }
);
 //@route POST api/network/unfollow
//@desc Unfollow a profile
//@access private
router.post('unfollow/:id',
    passport.authenticate('jwt', {session: false}),
    (req,res) => {
        Network.findById(req.params.id)
        .populate('user',['name','avatar'])
        .then(network => {
            if(network.follower.filter(follow => follow.user.toString() === req.user.id).length === 0)
            {
                return res.status(400).json({alreadyunfollowed: 'You have not followed this profile'});
            }
            //Remove Follow
            const removeIndex = network.follower.map(item => item.user.toString())
                                .indexOf(req.user.id);
            //Splice out of Array
            network.follower.splice(removeIndex, 1);

            //Save
            network.save()
                .then(network => res.json(network));
        })
        .catch(err => res.status(400).json({followernotfound: 'No follower found'}));
});

//@route GET api/network/following
//@desc Get users following your profile
//@access public
router.get('/following', 
    passport.authenticate('jwt', {session: false}), 
    (req, res) => {
        Network.findOne({user: req.user.id})
            .populate('user',['name','avatar'])
            .then(following => {
                if(!following){
                   return res.status(404).json("Following users not found");
                }
                res.json(following);
            })
            .catch(err => console.log(err));
    }
);

module.exports = router;