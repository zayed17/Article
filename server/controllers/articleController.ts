import { Request, Response } from 'express';
import Article from '../models/articleModel';




export const addArticle = async (req: any, res: Response) => {
    try {
        const { title, shortDescription, content, category, tags } = req.body;

        const imageUrl = req.file ? req.file.location : null;
    
        const newArticle = new Article({
          title,
          shortDescription,
          content,
          category,
          tags,
          imageUrl, 
        });
    
        await newArticle.save();
    
        res.status(201).json({ message: 'Article added successfully', article: newArticle });
      } catch (error:any) {
        res.status(500).json({ message: 'Failed to add article', error: error.message, });
      }
    };
    