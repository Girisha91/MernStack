// for registering and adding users
const express = require('express');
// to use express router
const router = express.Router();
//adding validators
const { check, validationResult } = require('express-validator');

// adding gravator
const gravatar = require('gravatar')

// calling user model
const User = require('../../models/User');

// encrypting password
const bcrypt = require('bcryptjs');

// json web token
const jwt = require('jsonwebtoken');

const config = require('config');
// @route   GET api/users
// @desc    Test route
// @access  Public means no jwt or other tokens required
// router.get('/', (req, res) => res.send('User route'));


// @route   Post api/users
// @desc    Test route
// @access  Public means no jwt or other tokens required
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please add a email').isEmail(),
    check('password', 'Please enter a Password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
    console.log("body is", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        // mongoose query
        // see if the user exist
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'Users Already exist ' }] })
        }


        // get users gravatar
        const avatar = gravatar.url(email, { s: '200', r: "pg", d: "mm" })
        user = new User({
            name,
            email,
            avatar,
            password
        })
        // encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt)
        await user.save();
        const payload = {
            user: {
                id: user.id
            }
        }

        // Return jsonwebtoken
        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600000 }, (err, token) => {
            if (err) throw err;
            res.json({ token })
        });


        // res.send('User Register');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }

});

//export routers
module.exports = router;