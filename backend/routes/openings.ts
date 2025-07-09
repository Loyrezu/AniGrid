import { Router } from 'express';
import { getRandomOpening } from '../services/openingService';

const router = Router();

// GET /api/openings/random
router.get('/random', async (req, res) => {
  // En el futuro, aquí puedes obtener datos reales de una API pública
  const opening = await getRandomOpening();
  res.json(opening);
});

export default router; 