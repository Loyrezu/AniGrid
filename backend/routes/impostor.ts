import { Router } from 'express';
import { getImpostor } from '../controllers/impostorController';

const router = Router();

router.get('/random', getImpostor);

export default router; 