import { Router } from 'express';
import { DeckController } from '../controllers/deck.controller';

const router = Router();
const deckController = new DeckController();

// Get all decks for the current user
router.get('/', deckController.getUserDecks.bind(deckController));

// Get a specific deck
router.get('/:id', deckController.getOne.bind(deckController));

// Create a new deck
router.post('/', deckController.createDeck.bind(deckController));

// Update a deck
router.put('/:id', deckController.updateDeck.bind(deckController));

// Delete a deck
router.delete('/:id', deckController.deleteDeck.bind(deckController));

export default router; 