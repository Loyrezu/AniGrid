import { Router } from 'express';
import { getRandomConnections } from '../services/connectionsService';

const router = Router();

// GET /api/connections/random
router.get('/random', (req, res) => {
  const { elements, groups } = getRandomConnections();
  res.json({ elements, groups });
});

export default router; 