const express = require('express');
const {signup ,login ,updatePassword} = require("../controllers/authController")
const {authenticate , authorizeRoles} = require('../middleware/authMIddleware')
const router = express.Router();

router.post('/signup' , signup);
router.post('/login', login);
router.put('/update-password', authenticate, updatePassword);

module.exports = router;