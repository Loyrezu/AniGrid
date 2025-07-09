import { Router } from 'express';
import { getRandomAniWordle } from '../services/aniWordleService';

const router = Router();

// GET /api/aniwordle/random
router.get('/random', (req, res) => {
  const { word } = getRandomAniWordle();
  res.json({ word });
});

export default router; 