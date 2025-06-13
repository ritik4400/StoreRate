const User = require("../src/models/user");
const Store = require("../src/models/store");
const Rating = require("../src/models/rating");

const associateModels = require('./models/associateModels');

associateModels({User, Store, Rating})

module.exports = {
    Store, User, Rating
}