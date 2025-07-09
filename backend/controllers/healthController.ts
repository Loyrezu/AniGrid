import { Request, Response } from 'express';
import healthService from '../services/healthService';

export default function healthController(req: Request, res: Response) {
  const status = healthService();
  res.json({ status });
} 