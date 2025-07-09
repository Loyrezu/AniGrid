// Servicio para Anime Connections
// En el futuro, puedes obtener sets aleatorios desde una base de datos o API

const poolGrupos = [
  ['Goku', 'Vegeta', 'Gohan', 'Piccolo'], // Dragon Ball Z
  ['Eren', 'Mikasa', 'Armin', 'Levi'],    // Attack on Titan
  ['Naruto', 'Sasuke', 'Sakura', 'Kakashi'], // Naruto
  ['Luffy', 'Zoro', 'Nami', 'Sanji'],     // One Piece
  ['Light', 'L', 'Misa', 'Ryuk'],         // Death Note
  ['Tanjiro', 'Nezuko', 'Zenitsu', 'Inosuke'], // Kimetsu no Yaiba
  ['Edward', 'Alphonse', 'Winry', 'Roy'], // Fullmetal Alchemist
  ['Ash', 'Misty', 'Brock', 'Pikachu'],   // Pokémon
];

function getRandomGroups(n = 4) {
  const shuffled = poolGrupos.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

export function getRandomConnections() {
  const groups = getRandomGroups();
  const elements = groups.flat().sort(() => Math.random() - 0.5);
  return { elements, groups };
} 