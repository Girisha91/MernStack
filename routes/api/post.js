// for posts like comments etc..


const express = require('express');
// to use express router
const router = express.Router();

const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Post = require('../../models/Posts');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/post
// @desc    Test route
// @access  Public means no jwt or other tokens required
// router.get('/', (req, res) => res.send('Posts route'));

// @route   POST api/post
// @desc    Create a Post
// @access  Private
router.post('/', [auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    console.log("value of errors", errors)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        console.log("inside try block")
        const user = await User.findById(req.user.id).select('-password');
        console.log("value of user is", user);
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });
        console.log("value of newpost is", newPost);

        await newPost.save();
        res.json(newPost);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }



});

//export routers
module.exports = router;