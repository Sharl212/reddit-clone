const router = require('express').Router();
const mongoose = require('mongoose');
const PostSchema = require('../models/PostSchema');
const { fetchPosts, votePost } = require('../queries/post');
const { PostVal } = require('../validators/post');
const { addPostToUser } = require('../queries/user');

router.post("/", async ({ body, user }, res) => {
    if (!PostVal(body)) return res.status(400).send();
    const { content, flair } = body;
    const { _id } = user;

    try {
        const newPost = new PostSchema({
            _id: new mongoose.Types.ObjectId(),
            creator: _id,
            content,
            flair
        })

        newPost.save(() => addPostToUser(_id, newPost._id));
        res.status(201).send();
    } catch (e) {
        console.error(e)
    }
})

router.put("/:id", async ({ body, params, user }, res) => {
    console.log(body)
    const result = await votePost(params.id, body.type, user._id);
    res.status(200).send(result);
})


router.get("/", async (req, res) => {
    const posts = await fetchPosts();

    if (posts.length >= 1) {
        res.status(200).send(posts);
    } else {
        res.status(404).send([]);
    }
})

module.exports = router