import { useEffect, useMemo, useState } from "react";
import AboutProject from "./components/AboutProject";
import FinalBoss from "./components/FinalBoss";
import Home from "./components/Home";
import Inventory from "./components/Inventory";
import Layout from "./components/Layout";
import MissionJourney from "./components/MissionJourney";
import MissionMap from "./components/MissionMap";
import PlayerSetup from "./components/PlayerSetup";
import PowerUpChallenge from "./components/PowerUpChallenge";
import VictoryScreen from "./components/VictoryScreen";
import missions from "./data/missions";
import { canFightBoss, createPlayer, getMissionStatus, hydratePlayer, mergeUnique } from "./utils/gameProgress";
import { clearPlayer, loadPlayer, savePlayer } from "./utils/storage";

const SCREENS = {
  HOME: "home",
  SETUP: "setup",
  MAP: "map",
  JOURNEY: "journey",
  CHALLENGE: "challenge",
  INVENTORY: "inventory",
  BOSS: "boss",
  VICTORY: "victory",
  ABOUT: "about",
};

export default function App() {
  const [player, setPlayer] = useState(() => hydratePlayer(loadPlayer()));
  const [screen, setScreen] = useState(SCREENS.HOME);
  const [activeMissionId, setActiveMissionId] = useState(missions[0].id);
  const [showVictory, setShowVictory] = useState(false);

  useEffect(() => {
    if (player) {
      savePlayer(player);
    }
  }, [player]);

  const missionStatuses = useMemo(() => {
    return missions.reduce((statusMap, mission) => {
      statusMap[mission.id] = getMissionStatus(player, mission, missions);
      return statusMap;
    }, {});
  }, [player]);

  const activeMission = missions.find((mission) => mission.id === activeMissionId) || missions[0];
  const bossUnlocked = canFightBoss(player, missions);

  useEffect(() => {
    if (!player && ![SCREENS.HOME, SCREENS.SETUP, SCREENS.ABOUT].includes(screen)) {
      setScreen(SCREENS.HOME);
    }
  }, [player, screen]);

  function handleCreatePlayer(name, lightsaberColor) {
    const nextPlayer = createPlayer(name, lightsaberColor);
    setPlayer(nextPlayer);
    setShowVictory(false);
    setActiveMissionId(missions[0].id);
    setScreen(SCREENS.MAP);
  }

  function handleContinueJourney() {
    if (!player) {
      setScreen(SCREENS.SETUP);
      return;
    }

    setScreen(showVictory ? SCREENS.VICTORY : SCREENS.MAP);
  }

  function handleResetGame() {
    const confirmed = window.confirm("Reset all saved progress for The Path Back?");

    if (!confirmed) {
      return;
    }

    clearPlayer();
    setPlayer(null);
    setShowVictory(false);
    setActiveMissionId(missions[0].id);
    setScreen(SCREENS.HOME);
  }

  function handleSelectMission(mission) {
    setActiveMissionId(mission.id);
    setScreen(SCREENS.JOURNEY);
  }

  function handleCompleteChallenge(mission) {
    setPlayer((currentPlayer) => ({
      ...currentPlayer,
      completedMissions: mergeUnique(currentPlayer.completedMissions, mission.id),
      earnedPowerUps: mergeUnique(currentPlayer.earnedPowerUps, mission.reward),
      chargedPowerUps: mergeUnique(currentPlayer.chargedPowerUps, mission.reward),
    }));
    setScreen(SCREENS.MAP);
  }

  function handleVictory() {
    setShowVictory(true);
    window.setTimeout(() => {
      setScreen(SCREENS.VICTORY);
    }, 900);
  }

  function renderScreen() {
    if (!player && ![SCREENS.HOME, SCREENS.SETUP, SCREENS.ABOUT].includes(screen)) {
      return (
        <Home
          canContinue={false}
          onAbout={() => setScreen(SCREENS.ABOUT)}
          onBeginJourney={() => setScreen(SCREENS.SETUP)}
          onContinue={handleContinueJourney}
          player={null}
        />
      );
    }

    switch (screen) {
      case SCREENS.SETUP:
        return <PlayerSetup initialPlayer={player} onBack={() => setScreen(SCREENS.HOME)} onSave={handleCreatePlayer} />;
      case SCREENS.MAP:
        return (
          <MissionMap
            bossUnlocked={bossUnlocked}
            missionStatuses={missionStatuses}
            missions={missions}
            onGoHome={() => setScreen(SCREENS.HOME)}
            onOpenAbout={() => setScreen(SCREENS.ABOUT)}
            onOpenBoss={() => setScreen(SCREENS.BOSS)}
            onOpenInventory={() => setScreen(SCREENS.INVENTORY)}
            onReset={handleResetGame}
            onSelectMission={handleSelectMission}
            player={player}
          />
        );
      case SCREENS.JOURNEY:
        return (
          <MissionJourney
            mission={activeMission}
            player={player}
            onBack={() => setScreen(SCREENS.MAP)}
            onStartChallenge={() => setScreen(SCREENS.CHALLENGE)}
          />
        );
      case SCREENS.CHALLENGE:
        return (
          <PowerUpChallenge
            mission={activeMission}
            player={player}
            onBack={() => setScreen(SCREENS.MAP)}
            onComplete={handleCompleteChallenge}
          />
        );
      case SCREENS.INVENTORY:
        return <Inventory missions={missions} onBack={() => setScreen(SCREENS.MAP)} onReset={handleResetGame} player={player} />;
      case SCREENS.BOSS:
        return <FinalBoss onBack={() => setScreen(SCREENS.MAP)} onVictory={handleVictory} player={player} />;
      case SCREENS.VICTORY:
        return (
          <VictoryScreen
            onOpenInventory={() => setScreen(SCREENS.INVENTORY)}
            onReplayBattle={() => setScreen(SCREENS.BOSS)}
            onReset={handleResetGame}
            onReturnToMap={() => setScreen(SCREENS.MAP)}
            player={player}
          />
        );
      case SCREENS.ABOUT:
        return <AboutProject onBack={() => setScreen(player ? SCREENS.MAP : SCREENS.HOME)} />;
      case SCREENS.HOME:
      default:
        return (
          <Home
            canContinue={Boolean(player)}
            onAbout={() => setScreen(SCREENS.ABOUT)}
            onBeginJourney={() => setScreen(SCREENS.SETUP)}
            onContinue={handleContinueJourney}
            player={player}
          />
        );
    }
  }

  return (
    <Layout player={player}>
      {renderScreen()}
    </Layout>
  );
}
