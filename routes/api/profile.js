// to do curd operation on profiles


const express = require('express');
// to use express router
const router = express.Router();


// @route   GET api/profile
// @desc    Test route
// @access  Public means no jwt or other tokens required
router.get('/', (req, res) => res.send('Profile route'));

//export routers
module.exports = router;