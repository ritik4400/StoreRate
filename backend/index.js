const express = require('express');
require('dotenv').config();
const { connectDB , sequelize } = require('./src/config/db');
const {User , Store , Rating} = require('./src/index')

const authRoutes= require('./src/routes/authRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const storeRoutes = require('./src/routes/storeRoutes');
const ratingRoutes = require('./src/routes/ratingRoutes');

const app = express()
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World Ready')
})

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/store', storeRoutes );
app.use('/rating', ratingRoutes );

sequelize.sync()
  .then(() => console.log(' Database synced successfully'))
  .catch(err => console.error(' Error syncing database:', err));
  
connectDB();
const PORT = process.env.PORT || 3000;

app.listen(PORT , () =>{
    console.log("Express setup completed");
})