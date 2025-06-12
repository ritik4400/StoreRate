const express = require('express');
require('dotenv').config();
const { connectDB , sequelize } = require('./src/config/db');
const User = require('./src/models/user');
const Store = require('./src/models/store');
const Rating = require('./src/models/user');
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World Ready')
})

sequelize.sync()
  .then(() => console.log(' Database synced successfully'))
  .catch(err => console.error(' Error syncing database:', err));
connectDB();
const PORT = process.env.PORT || 3000;

app.listen(PORT , () =>{
    console.log("Express setup completed");
})