const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NetworkSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    follower: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            name: {
                type: String
            },
            avatar: {
                type:String
            }
        }
    ],
    following: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'users'
                },
                name: {
                    type: String
                },
                avatar: {
                    type:String
                }
            }
    ],
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = Network = mongoose.model('explore', NetworkSchema);