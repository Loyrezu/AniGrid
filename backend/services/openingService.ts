// Servicio para obtener openings
// En el futuro, aquí puedes consumir AniList, Jikan o cualquier API pública

const mockOpenings = [
  {
    id: 1,
    anime: 'Attack on Titan',
    song: 'Guren no Yumiya',
    artist: 'Linked Horizon',
    year: 2013,
    audio: 'https://cdn.pixabay.com/audio/2022/10/16/audio_12b5b7b7e2.mp3',
    hint: 'Estudio: Wit Studio',
  },
  {
    id: 2,
    anime: 'Fullmetal Alchemist: Brotherhood',
    song: 'Again',
    artist: 'YUI',
    year: 2009,
    audio: 'https://cdn.pixabay.com/audio/2022/07/26/audio_124b7b7e2.mp3',
    hint: 'Estudio: Bones',
  },
  {
    id: 3,
    anime: 'Naruto',
    song: 'Haruka Kanata',
    artist: 'Asian Kung-Fu Generation',
    year: 2002,
    audio: 'https://cdn.pixabay.com/audio/2022/03/15/audio_115b7b7e2.mp3',
    hint: 'Estudio: Pierrot',
  },
];

export async function getRandomOpening() {
  // Aquí puedes hacer fetch a una API real en el futuro
  // Ejemplo: const response = await fetch('https://api.jikan.moe/v4/anime?q=opening');
  // return response.data;
  const random = mockOpenings[Math.floor(Math.random() * mockOpenings.length)];
  return random;
} 