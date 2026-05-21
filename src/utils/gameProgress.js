export const LIGHTSABER_OPTIONS = ["Red", "Green", "Blue", "Purple", "Yellow"];

export const LIGHTSABER_STYLES = {
  Red: {
    blade: "from-rose-300 via-red-400 to-red-600",
    glow: "shadow-[0_0_24px_rgba(248,113,113,0.8)]",
    accent: "bg-red-400",
    ring: "ring-red-300/60",
  },
  Green: {
    blade: "from-emerald-200 via-lime-300 to-green-500",
    glow: "shadow-[0_0_24px_rgba(74,222,128,0.8)]",
    accent: "bg-green-400",
    ring: "ring-green-300/60",
  },
  Blue: {
    blade: "from-sky-200 via-cyan-300 to-blue-500",
    glow: "shadow-[0_0_24px_rgba(96,165,250,0.85)]",
    accent: "bg-blue-400",
    ring: "ring-blue-300/60",
  },
  Purple: {
    blade: "from-fuchsia-200 via-violet-300 to-purple-500",
    glow: "shadow-[0_0_24px_rgba(192,132,252,0.85)]",
    accent: "bg-purple-400",
    ring: "ring-purple-300/60",
  },
  Yellow: {
    blade: "from-yellow-100 via-amber-200 to-yellow-400",
    glow: "shadow-[0_0_24px_rgba(250,204,21,0.85)]",
    accent: "bg-yellow-300",
    ring: "ring-yellow-200/70",
  },
};

export const POWER_UP_DETAILS = {
  "Gauntlets of Obedience": {
    principle: "Faith and obedience",
    sourceMission: "The Brass Plates Mission",
    shortDescription: "Steady hands for hard missions and faithful choices.",
  },
  "Shield of Faith": {
    principle: "Sincere prayer",
    sourceMission: "The Prayer in the Wilderness",
    shortDescription: "A prayer-forged shield that reminds you to turn to God.",
  },
  "Breastplate of Repentance": {
    principle: "Repentance through Jesus Christ",
    sourceMission: "The Change of Alma",
    shortDescription: "Armor that protects your heart with hope in Jesus Christ.",
  },
  "Helmet of Revelation": {
    principle: "Faith and revelation",
    sourceMission: "The Shining Stones",
    shortDescription: "A bright helm for seeking heaven's light and direction.",
  },
  "Belt of Covenant": {
    principle: "Courage and covenant loyalty",
    sourceMission: "The Title of Liberty",
    shortDescription: "A reminder to stand bravely for righteous promises.",
  },
  "Lightsaber of Truth": {
    principle: "Coming unto Christ",
    sourceMission: "The Light at Bountiful",
    shortDescription: "A glowing symbol that points your whole journey to Christ.",
  },
};

const ACTIVE_POWER_UPS = [
  "Gauntlets of Obedience",
  "Shield of Faith",
  "Breastplate of Repentance",
  "Lightsaber of Truth",
];

export function createPlayer(name, lightsaberColor) {
  const cleanName = name.trim();

  return {
    name: cleanName,
    title: `Master ${cleanName}`,
    lightsaberColor,
    completedMissions: [],
    earnedPowerUps: [],
    chargedPowerUps: [],
  };
}

export function hydratePlayer(player) {
  if (!player?.name) {
    return null;
  }

  return {
    name: player.name,
    title: player.title || `Master ${player.name}`,
    lightsaberColor: player.lightsaberColor || "Blue",
    completedMissions: Array.isArray(player.completedMissions) ? [...new Set(player.completedMissions)] : [],
    earnedPowerUps: Array.isArray(player.earnedPowerUps) ? [...new Set(player.earnedPowerUps)] : [],
    chargedPowerUps: Array.isArray(player.chargedPowerUps) ? [...new Set(player.chargedPowerUps)] : [],
  };
}

export function getPowerUpCatalog() {
  return ACTIVE_POWER_UPS.map((name) => ({
    name,
    ...POWER_UP_DETAILS[name],
  }));
}

export function isMissionCompleted(player, missionId) {
  return player?.completedMissions?.includes(missionId) ?? false;
}

export function isMissionUnlocked(player, mission, missions) {
  const missionIndex = missions.findIndex((item) => item.id === mission.id);

  if (missionIndex <= 0) {
    return true;
  }

  const previousMission = missions[missionIndex - 1];
  return isMissionCompleted(player, previousMission.id);
}

export function getMissionStatus(player, mission, missions) {
  if (player?.chargedPowerUps?.includes(mission.reward)) {
    return "charged";
  }

  if (isMissionCompleted(player, mission.id)) {
    return "completed";
  }

  if (isMissionUnlocked(player, mission, missions)) {
    return "available";
  }

  return "locked";
}

export function canFightBoss(player, missions) {
  if (!player) {
    return false;
  }

  const allMissionsComplete = missions.every((mission) => isMissionCompleted(player, mission.id));
  const allRewardsCharged = missions.every((mission) => player.chargedPowerUps.includes(mission.reward));
  return allMissionsComplete && allRewardsCharged;
}

export function mergeUnique(values = [], nextValue) {
  return Array.from(new Set([...values, nextValue]));
}
