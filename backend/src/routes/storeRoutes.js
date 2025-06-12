const express = require('express');
const {authenticate , authorizeRoles} = require('../middleware/authMIddleware');
const router = express.Router();

const {createStore} = require("../controllers/storeController");
router.post('/createStore', authenticate, authorizeRoles('admin'),createStore);

module.exports = router;