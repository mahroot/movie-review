import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import Movie from './models/Movie.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/moviereview';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:8080';

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: CORS_ORIGIN }));

// Health endpoint
app.get('/api/health', async (req, res) => {
  const state = mongoose.connection.readyState; // 1=connected
  res.json({ status: 'ok', dbConnected: state === 1 });
});

// Get all movies
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

// Add a movie
app.post('/api/movies', async (req, res) => {
  try {
    const { title, rating, review, posterUrl } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    const r = Number(rating);
    if (rating !== undefined && (isNaN(r) || r < 0 || r > 10)) {
      return res.status(400).json({ error: 'Rating must be between 0 and 10' });
    }
    const movie = await Movie.create({
      title,
      rating: r || 0,
      review: review || '',
      posterUrl: posterUrl || ''
    });
    res.status(201).json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create movie' });
  }
});

// Connect to DB and start server
async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Seed sample data if empty
    const count = await Movie.countDocuments();
    if (count === 0) {
      await Movie.insertMany([
        { title: 'Inception', rating: 9, review: 'Mind-bending sci-fi.', posterUrl: '' },
        { title: 'Interstellar', rating: 8.5, review: 'Space and time epic.', posterUrl: '' }
      ]);
      console.log('Seeded initial movies');
    }

    app.listen(PORT, () => {
      console.log(`API running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
