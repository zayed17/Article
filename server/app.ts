import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute';
import articleRoutes from './routes/articleRoute';
import connectDB from './config/db';
import cors from 'cors'
import cookieParser from 'cookie-parser';

dotenv.config(); 

const app = express();
// const corsOptions = {
//     // origin:"http://localhost:5173",
//     origin:  'https://article-murex.vercel.app',
//     methods: ['GET', 'POST', 'OPTIONS','PUT','PATCH','DELETE'], 
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
//   };
const corsOptions = {
  
  origin: 'https://article-murex.vercel.app/',  // Allow only this origin
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],  // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],  // Allowed headers
  credentials: true,  // Allow credentials (cookies)
  preflightContinue: false,  // Let Express handle OPTIONS requests
  optionsSuccessStatus: 204,  // Status code for successful OPTIONS requests
};
app.use(cors(corsOptions));  // Apply the CORS middleware globally

// app.use(cors(corsOptions))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

connectDB(); 

app.use('/api/users', userRoute);
app.use('/api/articles', articleRoutes);

const port = process.env.PORT || 1717; 

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
