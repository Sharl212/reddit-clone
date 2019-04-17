const PostSchema = require('../models/PostSchema');

const fetchPosts = () => {
    return new Promise((resolve, reject) => {
        try {
            resolve(PostSchema.find({}).populate('creator').exec())
        }
        catch (e) {
            reject(e)
        }
    })
}


const votePost = async (id, type) => {
    let value = type == 'like' ? 1 : -1;
    return new Promise((resolve, reject) => {
        try {
            resolve(PostSchema.findOneAndUpdate(id, { $inc: { votes: value } }, { new: true }).exec())
        }
        catch (e) {
            reject(e)
        }
    })
}

module.exports = { fetchPosts, votePost }