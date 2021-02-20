// for registering and adding users
const express = require('express');
// to use express router
const router = express.Router();


// @route   GET api/users
// @desc    Test route
// @access  Public means no jwt or other tokens required
router.get('/', (req, res) => res.send('User route'));

//export routers
module.exports = router;