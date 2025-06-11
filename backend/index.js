const express = require('express');
require('dotenv').config();
const { connectDB } = require('./src/config/db');

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World Ready')
})

connectDB();
const PORT = process.env.PORT || 3000;

app.listen(PORT , () =>{
    console.log("Express setup completed");
})