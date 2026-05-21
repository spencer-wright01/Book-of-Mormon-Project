export const bossAttacks = [
  {
    id: "fear-strike",
    attackNumber: 1,
    bossMove: "Fear Strike",
    statement: "The mission is too hard. You should give up.",
    powerUp: "Gauntlets of Obedience",
    powerUpEffect:
      "The Gauntlets of Obedience steady your hands and help you keep moving.",
    unchargedEffect:
      "Without the Gauntlets of Obedience, this attack lands harder.",
    playerDamage: 22,
    reducedDamage: 8,
    bossDamage: 18,
    powerBonus: 7,
  },
  {
    id: "silence-cloud",
    attackNumber: 2,
    bossMove: "Silence Cloud",
    statement: "Prayer will not help you.",
    powerUp: "Shield of Faith",
    powerUpEffect:
      "The Shield of Faith catches the silence and turns your heart back toward prayer.",
    unchargedEffect:
      "Without the Shield of Faith, the silence presses in more strongly.",
    playerDamage: 22,
    reducedDamage: 8,
    bossDamage: 18,
    powerBonus: 7,
  },
  {
    id: "doubt-blast",
    attackNumber: 3,
    bossMove: "Doubt Blast",
    statement: "You made a mistake. You can never change.",
    powerUp: "Breastplate of Repentance",
    powerUpEffect:
      "The Breastplate of Repentance guards your heart with hope in Jesus Christ.",
    unchargedEffect:
      "Without the Breastplate of Repentance, doubt strikes closer to the heart.",
    playerDamage: 24,
    reducedDamage: 9,
    bossDamage: 18,
    powerBonus: 7,
  },
  {
    id: "shadow-storm",
    attackNumber: 4,
    bossMove: "Shadow Storm",
    statement: "You do not need Jesus Christ.",
    powerUp: "Lightsaber of Truth",
    powerUpEffect:
      "The Lightsaber of Truth burns bright because Christ is the center of the path.",
    unchargedEffect:
      "Without the Lightsaber of Truth, the storm is harder to cut through.",
    playerDamage: 26,
    reducedDamage: 10,
    bossDamage: 18,
    powerBonus: 7,
  },
];

export default bossAttacks;
