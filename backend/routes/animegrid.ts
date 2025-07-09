import { Router } from 'express';
import { getRandomAnimeGrid } from '../services/animeGridService';

const router = Router();

// GET /api/animegrid/random
router.get('/random', (req, res) => {
  const grid = getRandomAnimeGrid();
  res.json(grid);
});

export default router; 