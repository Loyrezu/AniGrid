// Servicio para AnimeGrid
// En el futuro, puedes obtener grids aleatorios desde una base de datos o API

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const estudios = ['Wit Studio', 'MAPPA', 'Bones', 'Pierrot'];
const anios = ['2019', '2020', '2021', '2022', '2023'];
const generos = ['Shonen', 'Seinen', 'Isekai', 'Deportivo'];

const poolRespuestas: Record<string, string[]> = {
  'Wit Studio|Shonen': ['Shingeki no Kyojin', 'Vinland Saga'],
  'MAPPA|Shonen': ['Jujutsu Kaisen', 'Chainsaw Man'],
  'Bones|Shonen': ['My Hero Academia'],
  'Pierrot|Shonen': ['Naruto', 'Bleach'],
  'MAPPA|Seinen': ['Dorohedoro'],
  'Wit Studio|Seinen': ['Great Pretender'],
  'MAPPA|Deportivo': ['Yuri on Ice'],
  'Pierrot|Isekai': ['Re:Zero'],
  'Bones|Isekai': ['Mob Psycho 100'],
  'Wit Studio|2022': ['Spy x Family'],
  'MAPPA|2022': ['Chainsaw Man'],
  'Bones|2022': ['Mob Psycho 100 III'],
  'Pierrot|2022': ['Bleach: TYBW'],
};

export function getRandomAnimeGrid() {
  // Seleccionar aleatoriamente categorías
  const rowCategories = [
    `Estudio: ${getRandom(estudios)}`,
    `Año: ${getRandom(anios)}`,
    `Género: ${getRandom(generos)}`,
  ];
  const colCategories = [
    `Género: ${getRandom(generos)}`,
    `Estudio: ${getRandom(estudios)}`,
    `Año: ${getRandom(anios)}`,
  ];

  // Generar respuestas correctas por celda
  const correctAnswers: string[][] = Array(3)
    .fill(null)
    .map((_, row) =>
      Array(3)
        .fill(null)
        .map((_, col) => {
          // Buscar respuesta por combinación de estudio/género/año
          const estudio = rowCategories[row].includes('Estudio')
            ? rowCategories[row].replace('Estudio: ', '')
            : colCategories[col].replace('Estudio: ', '');
          const genero = rowCategories[row].includes('Género')
            ? rowCategories[row].replace('Género: ', '')
            : colCategories[col].replace('Género: ', '');
          const anio = rowCategories[row].includes('Año')
            ? rowCategories[row].replace('Año: ', '')
            : colCategories[col].replace('Año: ', '');

          // Buscar por estudio y género
          const key1 = `${estudio}|${genero}`;
          if (poolRespuestas[key1]) return getRandom(poolRespuestas[key1]);
          // Buscar por estudio y año
          const key2 = `${estudio}|${anio}`;
          if (poolRespuestas[key2]) return getRandom(poolRespuestas[key2]);
          // Buscar por género y año
          const key3 = `${genero}|${anio}`;
          if (poolRespuestas[key3]) return getRandom(poolRespuestas[key3]);
          // Si no hay coincidencia, devolver vacío
          return '';
        })
    );

  return { rowCategories, colCategories, correctAnswers };
} 