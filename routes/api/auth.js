// for authentication purpose and jwt tokens


const express = require('express');
// to use express router
const router = express.Router();


// @route   GET api/auth
// @desc    Test route
// @access  Public means no jwt or other tokens required
router.get('/', (req, res) => res.send('Auth route'));

//export routers
module.exports = router;