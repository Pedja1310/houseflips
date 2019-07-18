const express = require('express');
const connectDB = require('./config/db');

// Database connection
connectDB();

const app = express();

// Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('Api working');
});

// Define routes
app.use('/api/user', require('./routes/user'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})