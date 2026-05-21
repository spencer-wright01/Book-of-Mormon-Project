const missionBosses = {
  "brass-plates-mission": {
    name: "The Turnback Sentinel",
    title: "Guardian of the Hard Road",
    hp: 52,
    color: "bg-red-300",
    opening:
      "The road darkens before Jerusalem. A sentinel rises and whispers that obedience is too costly.",
    weakness: "Faith and obedience",
    focusMove: "Go and Do",
    focusMessage:
      "Nephi's courage steadies your strike. The sentinel's doubt cracks.",
    rewardMessage:
      "The sentinel falls back, and the Gauntlets of Obedience lock onto your armor.",
    moves: [
      "Turn back. This commandment is too hard.",
      "Wait for someone else to be faithful first.",
      "The road is too dark to keep going.",
    ],
  },
  "prayer-in-the-wilderness": {
    name: "The Silence Shade",
    title: "Keeper of the Empty Forest",
    hp: 50,
    color: "bg-cyan-300",
    opening:
      "The forest grows still. A shadow tries to make prayer feel distant and useless.",
    weakness: "Sincere prayer",
    focusMove: "Cry Unto God",
    focusMessage:
      "Enos's example fills the clearing with light. The silence loses its hold.",
    rewardMessage:
      "The shade dissolves, and the Shield of Faith forms on your arm.",
    moves: [
      "No one is listening.",
      "A quick prayer is all the effort you need.",
      "Keep your worries locked inside.",
    ],
  },
  "change-of-alma": {
    name: "The Regret Chain",
    title: "Binder of Old Mistakes",
    hp: 56,
    color: "bg-rose-300",
    opening:
      "Chains of old choices rise around the path. The boss insists that change is impossible.",
    weakness: "Repentance through Jesus Christ",
    focusMove: "Remember Christ",
    focusMessage:
      "Alma's witness breaks through the chains. Hope becomes stronger than regret.",
    rewardMessage:
      "The chains shatter, and the Breastplate of Repentance seals over your heart.",
    moves: [
      "Your mistakes are who you are now.",
      "Do not ask for mercy.",
      "Change is for other people.",
    ],
  },
  "light-at-bountiful": {
    name: "The Veil of Forgetting",
    title: "Shadow Before the Temple",
    hp: 60,
    color: "bg-amber-300",
    opening:
      "At the last mission gate, a veil tries to pull attention away from the Savior.",
    weakness: "Coming unto Christ",
    focusMove: "Come Unto Christ",
    focusMessage:
      "The Savior's invitation shines through the veil. Your blade burns with truth.",
    rewardMessage:
      "The veil parts, and the Lightsaber of Truth blazes to full power.",
    moves: [
      "You do not need to listen to Him.",
      "Stay far away from the light.",
      "The path is about your strength alone.",
    ],
  },
};

export default missionBosses;
