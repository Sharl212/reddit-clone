const PostSchema = require('../models/PostSchema')

const fetchPosts = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(
        PostSchema.find({})
          .populate('creator')
          .exec()
      )
    } catch (e) {
      reject(e)
    }
  })
}

const votePost = async (id, type, userId) => {
  const value = type == 'like' ? 1 : -1

  return new Promise((resolve, reject) => {
    try {
      resolve(
        PostSchema.findOneAndUpdate(
          id,
          {
            $inc: { 'votes.sum': value },
            $push: { 'votes.voters': { voterId: userId, voteType: type } }
          },
          { new: true }
        ).exec()
      )
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = { fetchPosts, votePost }
