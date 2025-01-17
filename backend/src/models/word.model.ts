import mongoose, { Document, Schema } from 'mongoose';

export interface IExample {
  sentence: string;
  translation?: string;
  createdAt: Date;
}

export interface IWord extends Document {
  word: string;
  definition?: string;
  pronunciation?: string;
  partOfSpeech?: string;
  examples: IExample[];
  deckId: Schema.Types.ObjectId;
  lastReviewed?: Date;
  nextReview?: Date;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const exampleSchema = new Schema<IExample>({
  sentence: {
    type: String,
    required: [true, 'Example sentence is required'],
    trim: true
  },
  translation: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const wordSchema = new Schema<IWord>({
  word: {
    type: String,
    required: [true, 'Word is required'],
    trim: true,
    minlength: [1, 'Word must not be empty'],
    maxlength: [50, 'Word cannot exceed 50 characters']
  },
  definition: {
    type: String,
    trim: true
  },
  pronunciation: {
    type: String,
    trim: true
  },
  partOfSpeech: {
    type: String,
    trim: true,
    enum: ['noun', 'verb', 'adjective', 'adverb', 'preposition', 'conjunction', 'pronoun', 'interjection', 'other']
  },
  examples: [exampleSchema],
  deckId: {
    type: Schema.Types.ObjectId,
    ref: 'Deck',
    required: [true, 'Deck ID is required'],
    index: true
  },
  lastReviewed: Date,
  nextReview: Date,
  reviewCount: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true,
  versionKey: false
});

// Ensure unique words per deck
wordSchema.index({ word: 1, deckId: 1 }, { unique: true });

export const Word = mongoose.model<IWord>('Word', wordSchema); 