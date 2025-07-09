import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/userService';

export function register(req: Request, res: Response) {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  try {
    const user = registerUser(email, name, password);
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  try {
    const user = loginUser(email, password);
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
} 