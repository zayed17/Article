import { Request, Response } from 'express';
import Article from '../models/articleModel';
import mongoose from 'mongoose';
import { Types } from 'mongoose'; // Ensure mongoose.Types is available




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
            

      
export const getUserArticleStats = async (req: any, res: Response) => {
  try {
    const userId = req.userId; 

    if (!userId) {
       res.status(400).json({ message: 'User ID is required' });
       return
    }

    const userObjectId = new Types.ObjectId(userId); 
    const result = await Article.aggregate([
      {
        $facet: {
          likes: [
            { $match: { likedBy: { $in: [userObjectId] } } },
            { $count: "liked" }
          ],
          dislikes: [
            { $match: { dislikedBy: { $in: [userObjectId] } } },
            { $count: "disliked" }
          ],
          articles: [
            { $match: { userId: userObjectId } },
            { $count: "articles" }
          ]
        }
      }
    ]);
    if (!result || result.length === 0) {
       res.status(404).json({ message: 'No articles found for this user' });
       return
    }

    const simplifiedResult = {
      likes: result[0].likes.length > 0 ? result[0].likes[0].liked : 0,
      dislikes: result[0].dislikes.length > 0 ? result[0].dislikes[0].disliked : 0,
      articles: result[0].articles.length > 0 ? result[0].articles[0].articles : 0
    };
    console.log(simplifiedResult)

    res.status(200).json(simplifiedResult);
  } catch (error) {
    console.error('Error fetching user article stats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const deleteArticle = async (req: any, res: Response) => {
  try {
    const { articleId } = req.params;

    const article = await Article.findByIdAndDelete(articleId);

    if (!article) {
       res.status(404).json({ message: 'Article not found' });
       return
    }
    res.status(200).json({ message: 'Article deleted successfully', article });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const getArticle = async (req: any, res: Response) => {
  try {
    const { articleId } = req.params;

    const articles = await Article.findOne({_id:articleId}).populate('userId')
    console.log(articles)
    res.status(200).json(articles);
  } catch (error: any) {
    res.status(500).json({message: 'Failed to fetch articles',error: error.message,});
  }
};