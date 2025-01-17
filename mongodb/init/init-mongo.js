db = db.getSiblingDB('word-memory');

// Create collections if they don't exist
db.createCollection('decks');
db.createCollection('words');

// Create indexes
db.decks.createIndex({ "userId": 1 });
db.words.createIndex({ "deckId": 1 });
db.words.createIndex({ "word": 1 });

// Insert some sample data if collections are empty
if (db.decks.countDocuments() === 0) {
    db.decks.insertOne({
        name: "Sample Deck",
        description: "A sample deck for demonstration",
        userId: "system",
        createdAt: new Date(),
        updatedAt: new Date()
    });
}

// Create unique indexes to prevent duplicates
db.decks.createIndex({ "name": 1, "userId": 1 }, { unique: true });
db.words.createIndex({ "word": 1, "deckId": 1 }, { unique: true }); 