import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute';
import articleRoutes from './routes/articleRoute';
import connectDB from './config/db';
import cors from 'cors'
import cookieParser from 'cookie-parser';

dotenv.config(); 

const app = express();
const corsOptions = {
    // origin:"http://localhost:5173",
    origin:'https://article-azure.vercel.app',
    methods: ['GET', 'POST', 'OPTIONS','PUT','PATCH','DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

connectDB(); 
app.use(cors(corsOptions))

app.use('/api/users', userRoute);
app.use('/api/articles', articleRoutes);

const port = process.env.PORT || 1717; 

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
