const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    imageurl: {
        type: String,
        default: 'none',
        required:  true
    },
    name: { 
        type: String,
    },
    avatar: {
        type: String
    }, 
    likes: [
        {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    }],
    comments: [
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required:  true
            },
            name:{
                type: String
            },
            avatar:
            {
                type: String
            },
            date: {
                type:Date,
                deafult: Date.now 
            }
        }
    ],
    hashtag: {
        type: [String]
    }, 
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = Post = mongoose.model('post',PostSchema);