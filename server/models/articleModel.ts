import mongoose, { Document, Schema } from 'mongoose';

interface IArticle extends Document {
  title: string;
  shortDescription: string;
  content: string;
  category: string;
  tags: string[];
  imageUrl: string;
  userId: mongoose.Schema.Types.ObjectId; 
  likes: number;  
  unlikes: number;
  likedBy: mongoose.Schema.Types.ObjectId[]; 
  dislikedBy: mongoose.Schema.Types.ObjectId[]; 
  createdAt: Date;
  updatedAt: Date;
}

const articleSchema = new Schema<IArticle>({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  imageUrl: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
  dislikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, {
  timestamps: true, 
});

const Article = mongoose.model<IArticle>('Article', articleSchema);

export default Article;
