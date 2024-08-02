
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/product');

const app = express();
connectDB();

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Welcome to the mini Amazon');
});

app.use('/api', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
