const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    id: Schema.Types.ObjectId,
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true, select: false },
    posts: { type: [Schema.Types.ObjectId], ref: 'Post', default: [] }, // array of posts ids
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);