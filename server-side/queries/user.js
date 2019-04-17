const UserSchema = require('../models/UserSchema');

const findUserByEmail = username => {
    return new Promise((resolve, reject) => {
        try {
            resolve(UserSchema.findOne({ username }).exec())
        }
        catch (e) {
            reject(e)
        }
    })
}

const addPostToUser = (userId, postId) => {
    return new Promise((resolve, reject) => {
        try {
            const update = UserSchema.findByIdAndUpdate(userId, { $push: { posts: postId } }).exec()
            resolve(update)
        }
        catch (e) {
            reject(e)
        }
    })
}

module.exports = { findUserByEmail, addPostToUser }