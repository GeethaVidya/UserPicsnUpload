const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    website: {
        type: String
    },
    bio: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    phoneno: {
        type: Number,
    },
    gender: {
         type:String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);