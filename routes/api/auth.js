// for authentication purpose and jwt tokens


const express = require('express');
// to use express router
const router = express.Router();

const User = require('../../models/User');

const auth = require('../../middleware/auth');

// json web token
const jwt = require('jsonwebtoken');

const config = require('config');

//adding validators
const { check, validationResult } = require('express-validator');

// encrypting password
const bcrypt = require('bcryptjs');


// @route   GET api/auth
// @desc    Test route
// @access  Public means no jwt or other tokens required
// router.get('/', (req, res) => res.send('Auth route'));

// @route   GET api/auth
// @desc    Take JWT token and return users data
// @access  Private means jwt or other tokens required
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


// @route   Post api/auth
// @desc    Authenticate user and get token
// @access  Public means no jwt or other tokens required
router.post('/', [

    check('email', 'Please add a email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    console.log("body is", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // mongoose query
        // see if the user exist
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }


        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
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