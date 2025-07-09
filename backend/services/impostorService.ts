// Servicio para el minijuego The Impostor

interface ImpostorSet {
  elements: string[];
  impostorIndex: number;
  group: string;
}

// Mock de sets posibles (puedes escalar a base de datos o API real)
const sets: { group: string; elements: string[]; impostor: string }[] = [
  {
    group: 'Personajes de Naruto',
    elements: [
      'Naruto Uzumaki',
      'Sasuke Uchiha',
      'Sakura Haruno',
      'Kakashi Hatake',
      'Shikamaru Nara',
      'Hinata Hyuga',
      'Rock Lee',
    ],
    impostor: 'Gon Freecss', // de Hunter x Hunter
  },
  {
    group: 'Personajes de One Piece',
    elements: [
      'Monkey D. Luffy',
      'Roronoa Zoro',
      'Nami',
      'Usopp',
      'Sanji',
      'Tony Tony Chopper',
      'Nico Robin',
    ],
    impostor: 'Saitama', // de One Punch Man
  },
  {
    group: 'Personajes de My Hero Academia',
    elements: [
      'Izuku Midoriya',
      'Katsuki Bakugo',
      'Shoto Todoroki',
      'Ochaco Uraraka',
      'Tenya Iida',
      'Tsuyu Asui',
      'Eijiro Kirishima',
    ],
    impostor: 'Levi Ackerman', // de Attack on Titan
  },
];

export function getImpostorSet(): ImpostorSet {
  const set = sets[Math.floor(Math.random() * sets.length)];
  // Mezclar elementos e impostor
  const all = [...set.elements, set.impostor];
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  const impostorIndex = all.indexOf(set.impostor);
  return {
    elements: all,
    impostorIndex,
    group: set.group,
  };
} 