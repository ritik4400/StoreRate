const express = require('express');
const {authenticate , authorizeRoles} = require('../middleware/authMIddleware');
const router = express.Router();

const {createRating , updateRating , getMyRatings ,getRatingsForStore} = require("../controllers/ratingController");

router.post('/addRating', authenticate, authorizeRoles('user'),createRating);
router.put('/updateRating/:id', authenticate, authorizeRoles('user'),updateRating);
router.get('/getMyRating', authenticate, authorizeRoles('user'),getMyRatings);

router.get('/store/:id', authenticate,authorizeRoles('user') ,getRatingsForStore);

module.exports = router;