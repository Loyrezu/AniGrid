import { Request, Response } from 'express';
import { getImpostorSet } from '../services/impostorService';

export function getImpostor(req: Request, res: Response) {
  const set = getImpostorSet();
  res.json(set);
} 