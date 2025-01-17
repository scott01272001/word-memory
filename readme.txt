# Word Memory Application

A full-stack application to help users memorize words with AI-generated example sentences.

## Project Structure
- Backend: Express.js + TypeScript
- Frontend: Vue.js (Coming soon)
- Database: MongoDB
- Authentication: Keycloak
- API Documentation: Swagger
- Testing: Jest

## Current Progress

### Backend Setup (✓)
- [x] Project structure initialized
- [x] TypeScript configuration
- [x] Basic Express server setup
- [x] MongoDB connection setup
- [x] Environment variables configuration
- [x] Basic health endpoint with test
- [x] Testing environment setup
- [x] Docker setup for MongoDB
- [x] Database initialization script
- [x] Base controller with CRUD operations
- [x] Deck model and controller
- [x] Deck routes
- [x] Error handling middleware

### Next Steps
- [ ] Implement Word model and tests
- [ ] Setup OpenAI service for example sentences
- [ ] Implement CRUD operations for words
- [ ] Setup Keycloak authentication
- [ ] Create API documentation with Swagger

## API Endpoints

### Decks
- GET /api/decks - Get all decks for the current user
- GET /api/decks/:id - Get a specific deck
- POST /api/decks - Create a new deck
- PUT /api/decks/:id - Update a deck
- DELETE /api/decks/:id - Delete a deck

## Getting Started

### 1. Start MongoDB with Docker
```bash
# Start MongoDB and Mongo Express
docker-compose up -d

# MongoDB will be available at: mongodb://localhost:27017
# Mongo Express (Web UI) will be available at: http://localhost:8081
```

### Database Initialization
The MongoDB container will automatically:
- Create required collections (decks, words)
- Set up necessary indexes for performance
- Create unique constraints to prevent duplicates
- Add a sample deck if the database is empty

### 2. Install dependencies:
```bash
cd backend
npm install
```

### 3. Set up environment variables:
Create a .env file in the backend directory with the following:
```
PORT=3000
MONGODB_URI=mongodb://admin:password123@localhost:27017/word-memory?authSource=admin
OPENAI_API_KEY=your_openai_key
NODE_ENV=development
```

### 4. Run development server:
```bash
npm run dev
```

### 5. Run tests:
```bash
npm test
```

## MongoDB Management
- Access MongoDB data through Mongo Express UI: http://localhost:8081
  - Username: dev
  - Password: dev123
- Default MongoDB credentials:
  - Username: admin
  - Password: password123

## Database Structure
- Collections:
  - decks: Stores card decks
    - name: string (required)
    - description: string (optional)
    - userId: string (required)
    - createdAt: date
    - updatedAt: date
  - words: Stores words with their example sentences
    - word: string (required)
    - definition: string (optional)
    - pronunciation: string (optional)
    - partOfSpeech: string (enum)
    - examples: array of example sentences
    - deckId: ObjectId (required)
    - lastReviewed: date
    - nextReview: date
    - reviewCount: number
    - createdAt: date
    - updatedAt: date
