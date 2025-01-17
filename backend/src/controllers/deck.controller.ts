import { Request, Response, NextFunction } from 'express';
import { BaseController } from './base.controller';
import { Deck, IDeck } from '../models/deck.model';
import { ApiResponse, PaginatedResponse } from '../types/api.types';

export class DeckController extends BaseController<IDeck> {
  constructor() {
    super(Deck, 'Deck');
  }

  // Get all decks for a specific user
  async getUserDecks(req: Request, res: Response<PaginatedResponse<IDeck[]>>, next: NextFunction) {
    const userId = req.user?.id; // Will be set by auth middleware
    await this.getAll(req, res, next, { userId });
  }

  // Create a deck for the current user
  async createDeck(req: Request, res: Response<ApiResponse<IDeck>>, next: NextFunction) {
    req.body.userId = req.user?.id; // Will be set by auth middleware
    await this.create(req, res, next);
  }

  // Update a deck (only if user owns it)
  async updateDeck(req: Request, res: Response<ApiResponse<IDeck>>, next: NextFunction) {
    const userId = req.user?.id;
    const deck = await Deck.findOne({ _id: req.params.id, userId });
    
    if (!deck) {
      return res.status(404).json({
        success: false,
        error: 'Deck not found or access denied'
      });
    }

    await this.update(req, res, next);
  }

  // Delete a deck (only if user owns it)
  async deleteDeck(req: Request, res: Response<ApiResponse<null>>, next: NextFunction) {
    const userId = req.user?.id;
    const deck = await Deck.findOne({ _id: req.params.id, userId });
    
    if (!deck) {
      return res.status(404).json({
        success: false,
        error: 'Deck not found or access denied'
      });
    }

    await this.delete(req, res, next);
  }
} 