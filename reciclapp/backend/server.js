const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/userroutes');
const requestRoutes = require('./src/routes/requestRoutes');
const recyclingPointRoutes = require('./src/routes/recyclingPointRoutes');


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);

app.use('/api/requests', requestRoutes);

app.use('/api/points', recyclingPointRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
