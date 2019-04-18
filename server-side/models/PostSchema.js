const mongoose = require('mongoose')
const { Schema } = mongoose

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
  votes: {
    sum: { type: Number, default: 0 },
    voters: [
      {
        voterId: { // id of the user who voted
          type: Schema.Types.ObjectId,
          unique: true,
          ref: 'User',
          default: null
        },
        voteType: { type: String, enum: ['like', 'dislike'], default: null }
      }
    ]
  },
  flairs: { type: [String], default: [] } // array of strings
})

module.exports = mongoose.model('Post', PostSchema)
