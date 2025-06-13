const express = require('express');
const {authenticate , authorizeRoles} = require('../middleware/authMIddleware');
const router = express.Router();

const {createStore ,getAllStores ,getStoreById} = require("../controllers/storeController");
router.post('/createStore', authenticate, authorizeRoles('admin'),createStore);
router.get('/stores', getAllStores );
router.get('/stores/:id',getStoreById);
module.exports = router;