// Servicio para AniWordle
// En el futuro, puedes obtener palabras aleatorias desde una base de datos o API

const poolPalabras = [
  'NARUTO',
  'LELOUCH',
  'ISEKAI',
  'GOKU',
  'SAITAMA',
  'EREN',
  'ANIME',
  'KIRA',
  'SENPAI',
  'YAMETE',
  'NEZUKO',
  'ZORO',
  'INUYASHA',
  'SHINJI',
  'L',
  'REM',
  'KAGOME',
  'KAWORU',
  'KYOYA',
  'KIRITO',
];

export function getRandomAniWordle() {
  const word = poolPalabras[Math.floor(Math.random() * poolPalabras.length)];
  return { word };
} 