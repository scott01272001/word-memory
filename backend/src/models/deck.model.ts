import mongoose, { Document, Schema } from 'mongoose';

export interface IDeck extends Document {
  name: string;
  description?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const deckSchema = new Schema<IDeck>({
  name: {
    type: String,
    required: [true, 'Deck name is required'],
    trim: true,
    minlength: [2, 'Deck name must be at least 2 characters long'],
    maxlength: [50, 'Deck name cannot exceed 50 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  userId: {
    type: String,
    required: [true, 'User ID is required'],
    index: true
  }
}, {
  timestamps: true,
  versionKey: false
});

// Ensure unique deck names per user
deckSchema.index({ name: 1, userId: 1 }, { unique: true });

export const Deck = mongoose.model<IDeck>('Deck', deckSchema); 