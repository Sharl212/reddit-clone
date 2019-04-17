const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    id: Schema.Types.ObjectId,
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    date: { type: Number, default: Date.now },
    content: {
        title: { type: String, required: true },
        type: {
            type: String,
            enum: ['post', 'media', 'link'],
            default: 'post'
        },
        description: { type: String, default: null }
    },
    votes: { type: Number, default: 0 },
    flairs: { type: [String], default: [] } // array of strings
});

module.exports = mongoose.model('Post', PostSchema);