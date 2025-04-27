import express from 'express';
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import { connectDB } from './config/db.js';

dotenv.config()

const port = process.env.PORT  || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})

connectDB();