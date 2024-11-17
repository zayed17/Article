import { Request, Response } from 'express';
import Article from '../models/articleModel';
import mongoose from 'mongoose';




export const addArticle = async (req: any, res: Response) => {
    try {
        const { title, shortDescription, content, category, tags } = req.body;

        const imageUrl = req.file ? req.file.location : null;
        const userId = req.userId
        const newArticle = new Article({
          title,
          shortDescription,
          content,
          category,
          tags,
          userId,
          imageUrl, 
        });
    
        await newArticle.save();
    
        res.status(201).json({ message: 'Article added successfully', article: newArticle });
      } catch (error:any) {
        res.status(500).json({ message: 'Failed to add article', error: error.message, });
      }
    };
    
    export const getArticles = async (req: any, res: Response) => {
        try {
          const articles = await Article.find({}).populate('userId')
          // console.log(articles)
          res.status(200).json(articles);
        } catch (error: any) {
          res.status(500).json({message: 'Failed to fetch articles',error: error.message,});
        }
      };


    export const likeArticle = async (req: any, res: Response) => {
        const { articleId } = req.params;
        const userId = req.userId;
      
        try {
          if (!articleId || !userId || !mongoose.Types.ObjectId.isValid(articleId) || !mongoose.Types.ObjectId.isValid(userId)) {
             res.status(400).json({ message: 'Invalid article ID or user ID' });
             return
          }
      
          const article = await Article.findById(articleId);
          if (!article) {
             res.status(404).json({ message: 'Article not found' });
             return
          }
      
          if (article.dislikedBy.includes(userId)) {
            article.dislikedBy = article.dislikedBy.filter((id: mongoose.Schema.Types.ObjectId) => id.toString() !== userId.toString());
          }
      
          if (article.likedBy.includes(userId)) {
            article.likedBy = article.likedBy.filter((id: mongoose.Schema.Types.ObjectId) => id.toString() !== userId.toString());
             res.status(200).json({ message: 'Article unliked successfully' });
             return
          } else {
            article.likedBy.push(userId);
          }
      
          await article.save();
          res.status(200).json({ message: 'Article liked successfully' });
        } catch (error: any) {
          console.error(error);
          res.status(500).json({ message: 'Error liking/unliking article', error: error.message });
        }
      };


      export const unlikeArticle = async (req: any, res: Response) => {
        const { articleId } = req.params;
        const userId = req.userId;
      console.log(userId,articleId,"hello")
        try {
          if (!articleId || !userId || !mongoose.Types.ObjectId.isValid(articleId) || !mongoose.Types.ObjectId.isValid(userId)) {
             res.status(400).json({ message: 'Invalid article ID or user ID' });
             return
          }
      
          const article = await Article.findById(articleId);
          if (!article) {
             res.status(404).json({ message: 'Article not found' });
             return
          }
      
          if (article.likedBy.includes(userId)) {
            console.log("first")
            article.likedBy = article.likedBy.filter((id: mongoose.Schema.Types.ObjectId) => id.toString() !== userId.toString());
          }
          console.log(article.likedBy,"ehcd")
      
          if (article.dislikedBy.includes(userId)) {
            article.dislikedBy = article.dislikedBy.filter((id: mongoose.Schema.Types.ObjectId) => id.toString() !== userId.toString());
             res.status(200).json({ message: 'Article liked again successfully' });
             return
          } else {
            article.dislikedBy.push(userId);
          }
      
          await article.save();
          res.status(200).json({ message: 'Article unliked successfully' });
        } catch (error: any) {
          console.error(error);
          res.status(500).json({ message: 'Error liking/unliking article', error: error.message });
        }
      };
            