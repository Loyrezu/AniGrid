import { Router } from 'express';
import healthController from '../controllers/healthController';
import openingsRouter from './openings';
import animeGridRouter from './animegrid';
import aniWordleRouter from './aniwordle';
import connectionsRouter from './connections';
import top10Router from './top10';
import impostorRouter from './impostor';
import userRouter from './user';

const router = Router();

router.get('/health', healthController);
router.use('/openings', openingsRouter);
router.use('/animegrid', animeGridRouter);
router.use('/aniwordle', aniWordleRouter);
router.use('/connections', connectionsRouter);
router.use('/top10', top10Router);
router.use('/impostor', impostorRouter);
router.use('/user', userRouter);

export default router; 