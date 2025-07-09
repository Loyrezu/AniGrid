// Servicio mock de usuarios (en memoria)

interface User {
  id: number;
  email: string;
  name: string;
  passwordHash: string;
}

let users: User[] = [];
let nextId = 1;

function hashPassword(password: string): string {
  // Hash simple (NO usar en producción)
  return Buffer.from(password).toString('base64');
}

export function registerUser(email: string, name: string, password: string) {
  if (users.find(u => u.email === email)) {
    throw new Error('El email ya está registrado');
  }
  const user: User = {
    id: nextId++,
    email,
    name,
    passwordHash: hashPassword(password),
  };
  users.push(user);
  return { id: user.id, email: user.email, name: user.name };
}

export function loginUser(email: string, password: string) {
  const user = users.find(u => u.email === email);
  if (!user) throw new Error('Usuario no encontrado');
  if (user.passwordHash !== hashPassword(password)) throw new Error('Contraseña incorrecta');
  return { id: user.id, email: user.email, name: user.name };
} 