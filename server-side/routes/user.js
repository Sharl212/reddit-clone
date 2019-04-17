const router = require('express').Router();
const UserSchema = require('../models/UserSchema');
const Token = require('../authentication/authorizationToken');
// const { PostVal } = require('../validators/post');

router.post("/", async ({ body }, res) => {
    // if (!PostVal(body)) return res.status(400).send();
    const { username, password } = body;

    try {
        const newUser = new UserSchema({
            username,
            password
        })

        newUser.save();
        res.cookie("jWtToken", Token(username)).status(201).send();
    } catch (e) {
        console.error(e)
    }
})

module.exports = router