
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './router/auth.router.js';
import categoryRouter from './router/category.router.js';
import productRouter from './router/product.router.js';
import cartRouter from './router/cart.router.js';
import orderRouter from './router/order.router.js';

const app = express();

const allowedOrigins = ['http://localhost:5173'];

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use('/api/auth', authRouter);
app.use('/api/cat', categoryRouter);
app.use('/api', productRouter);
app.use('/api', cartRouter);
app.use('/api', orderRouter);

export default app;