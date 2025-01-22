const express = require('express');
const connectDB = require('./db');

const app = express();

// Middleware
app.use(express.json());

// Connect to DB
connectDB();

// Rutas de API
app.use('/concesionarios', require('./routes/concesionarios'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
