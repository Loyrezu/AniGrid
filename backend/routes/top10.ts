import { Router } from 'express';
import { getRandomTop10 } from '../services/top10Service';

const router = Router();

// GET /api/top10/random
router.get('/random', (req, res) => {
  const { elements, correctOrder } = getRandomTop10();
  res.json({ elements, correctOrder });
});

export default router; 