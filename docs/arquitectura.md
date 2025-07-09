# Arquitectura de AniGrid

## Estructura General

- **Frontend:** React + Vite (SPA)
- **Backend:** Node.js + Express + Prisma
- **Base de Datos:** PostgreSQL (gestionada por Prisma)

## Estructura de Carpetas

- `/frontend`: Aplicación cliente (SPA)
- `/backend`: API y lógica de negocio
- `/docs`: Documentación y guías

## Actualización de la Base de Datos

1. Modifica el archivo `prisma/schema.prisma` según los nuevos datos o modelos.
2. Ejecuta las migraciones con Prisma:
   ```bash
   npx prisma migrate dev --name descripcion-del-cambio
   ```
3. Para poblar datos automáticamente, utiliza scripts que consuman la AniList API o Jikan API.

## Despliegue

- **Frontend:** Vercel, Netlify
- **Backend:** Render, Railway, Heroku

---

## Integración de datos reales para Guess the Opening

Actualmente, el backend usa mock data para los openings. Para migrar a datos reales:

1. Abre `backend/services/openingService.ts`.
2. Sustituye la función `getRandomOpening` para que haga fetch a una API pública (AniList, Jikan, etc).
3. Ajusta el formato de los datos recibidos para que coincidan con la interfaz esperada por el frontend.
4. Puedes usar endpoints como:
   - [Jikan API - Anime Search](https://docs.api.jikan.moe/#tag/anime/operation/getAnime)
   - [AniList API](https://anilist.gitbook.io/anilist-apiv2-docs/)
5. Mantén el mock data como fallback si la API falla.

---

## Minijuego: The Impostor

- **Endpoint:** `GET /api/impostor/random`
- **Respuesta:**
  ```json
  {
    "elements": ["Naruto Uzumaki", "Sasuke Uchiha", ..., "Gon Freecss"],
    "impostorIndex": 7,
    "group": "Personajes de Naruto"
  }
  ```
- **Lógica:**
  - Devuelve 8 elementos: 7 pertenecen a un grupo (anime/franquicia), 1 es el impostor.
  - El frontend debe mostrar los elementos y permitir seleccionar cuál es el impostor.
  - El feedback se da según si el usuario acierta el impostor.

## Autenticación y gestión de usuario

- **Contexto:** Toda la app está envuelta en `UserProvider` (React Context) para gestionar sesión, login, registro y logout.
- **Menú global:** El componente `UserMenu` muestra el usuario actual y permite cerrar sesión, o enlaces a login/registro si no hay sesión.
- **Endpoints backend:**
  - `POST /api/user/register` — Registra un usuario (campos: email, name, password)
  - `POST /api/user/login` — Inicia sesión (campos: email, password)
- **Estructura de usuario:**
  ```ts
  interface User {
    id: number;
    email: string;
    name: string;
  }
  ```
- **Flujo:**
  1. El usuario se registra o inicia sesión desde el frontend.
  2. El backend responde con los datos del usuario (mock, en memoria por ahora).
  3. El contexto guarda el usuario y lo expone a toda la app.
  4. El menú global y las páginas reaccionan según el estado de sesión.
- **Extensión profesional:**
  - Para persistencia real, conectar el servicio a la base de datos (Prisma, modelo User).
  - Para seguridad, implementar JWT o cookies seguras para mantener la sesión.
  - Proteger rutas de minijuegos usando un componente `PrivateRoute`.
  - Escalar a OAuth (Google, Discord, etc.) si se desea.

*Completa esta documentación a medida que avances en el desarrollo.* 