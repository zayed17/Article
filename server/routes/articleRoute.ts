import express, { Request, Response } from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3'; 
import dotenv from 'dotenv';
import { addArticle,getArticles, likeArticle ,unlikeArticle,getUserArticleStats , deleteArticle , getArticle,userArticles,updateArticle} from '../controllers/articleController';
import authMiddleware from '../middleware/authMiddleware';

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME as string, 
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const fileName = `articles/${Date.now()}_${file.originalname}`;
      cb(null, fileName); 
    },
  }),
});

const router = express.Router();

router.post('/add-article', upload.single('image'), authMiddleware, addArticle);
router.get('/get-articles',authMiddleware, getArticles);
router.get('/user-articles',authMiddleware, userArticles);
router.patch('/like/:articleId', authMiddleware, likeArticle);
router.patch('/unlike/:articleId', authMiddleware, unlikeArticle);
router.get('/user-stats', authMiddleware, getUserArticleStats);
router.delete('/delete/:articleId', authMiddleware, deleteArticle);
router.get('/get-article/:articleId',authMiddleware, getArticle);
router.put('/update-article',authMiddleware, updateArticle);

export default router;
