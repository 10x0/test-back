import { app } from './src/app.js';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 8000;

process.on('uncaughtException', (error) => {
  console.log(error.message);
  console.log('Shutting down due to uncaught exception.');
  process.exit(1);
});

app.listen(PORT, async () => {
  console.log(`@${process.env.PORT || 8000} 🚀`);
});
