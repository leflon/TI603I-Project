import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authMiddleware from './middleware/auth.js';
import productsRouter from './routes/products.js';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';

require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
	origin: process.env.CLIENT_URL,
	credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(authMiddleware);


// API Routes
app.use('/api/products', productsRouter);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
