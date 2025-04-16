import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow all common HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow common headers
}));

app.use(express.json());

export { app };
