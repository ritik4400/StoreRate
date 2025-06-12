const express = require('express');
const {authenticate , authorizeRoles} = require('../middleware/authMIddleware');
const router = express.Router();

const {addUser ,getAllUsers ,getUserById ,fetchAllUsers} = require("../controllers/adminController")
router.post('/addUser', authenticate, authorizeRoles('admin'),addUser);
router.get('/getAllUsers', authenticate, authorizeRoles('admin'),getAllUsers);
router.get('/getUser/:id', authenticate, authorizeRoles('admin'),getUserById);
router.post('/fetchAllUsers', authenticate, authorizeRoles('admin'),fetchAllUsers);

module.exports = router;
