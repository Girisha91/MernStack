// for posts like comments etc..


const express = require('express');
// to use express router
const router = express.Router();


// @route   GET api/post
// @desc    Test route
// @access  Public means no jwt or other tokens required
router.get('/', (req, res) => res.send('Posts route'));

//export routers
module.exports = router;