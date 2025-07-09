// Servicio para Anime Top 10
// En el futuro, puedes obtener listas aleatorias desde una base de datos o API

const poolListas = [
  [
    'Saitama', 'Goku', 'Vegeta', 'Naruto', 'Luffy',
    'Ichigo', 'Edward', 'Eren', 'Tanjiro', 'Deku',
  ],
  [
    'Light', 'L', 'Misa', 'Ryuk', 'Near',
    'Mello', 'Rem', 'Watari', 'Soichiro', 'Teru',
  ],
  [
    'Ash', 'Misty', 'Brock', 'Pikachu', 'James',
    'Jessie', 'Meowth', 'Tracey', 'May', 'Dawn',
  ],
  [
    'Tanjiro', 'Nezuko', 'Zenitsu', 'Inosuke', 'Giyu',
    'Shinobu', 'Kanao', 'Rengoku', 'Muzan', 'Akaza',
  ],
];

function getRandomList() {
  const lista = poolListas[Math.floor(Math.random() * poolListas.length)];
  return lista;
}

export function getRandomTop10() {
  const correctOrder = getRandomList();
  const elements = correctOrder.slice().sort(() => Math.random() - 0.5);
  return { elements, correctOrder };
} 