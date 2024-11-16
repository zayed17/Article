import {  Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';



const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  const token = req.cookies?.userToken; 
  console.log(token,"chekcing")

  if (!token) {
     res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'justforfunn') as any;

    req.userId = decoded.userId; 
    next(); 
  } catch (err) {
     res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

export default authMiddleware;
