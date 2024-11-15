import mongoose, { Document, Schema } from 'mongoose';

interface IArticle extends Document {
  title: string;
  shortDescription: string;
  content: string;
  category: string;
  tags: string[];
  imageUrl: string;
  userId: mongoose.Schema.Types.ObjectId; 
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
}, {
  timestamps: true, 
});

const Article = mongoose.model<IArticle>('Article', articleSchema);

export default Article;
