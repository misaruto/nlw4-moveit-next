import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../services/api";

import Cookies from "js-cookie";
import LevelUpModal from "../components/LevelUpModal";

interface ChallengeProps {
  type: "body" | "eye";
  description: string;
  amount: number;
}

export type ChallengeContextData = {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: ChallengeProps;

  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
};

export type ChallengeProviderProps = {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
};

const ChallengeContext = createContext<ChallengeContextData>(
  {} as ChallengeContextData
);

export const useChallengeController = () => {
  const {
    startNewChallenge,
    resetChallenge,
    activeChallenge,
    completeChallenge,
    challengesCompleted,
  } = useContext(ChallengeContext);
  return {
    startNewChallenge,
    resetChallenge,
    activeChallenge,
    completeChallenge,
    challengesCompleted,
  };
};

export const useExperienceAndLevelsController = () => {
  const {
    currentExperience,
    experienceToNextLevel,
    level,
    levelUp,
    closeLevelUpModal,
  } = useContext(ChallengeContext);
  return {
    currentExperience,
    experienceToNextLevel,
    level,
    levelUp,
    closeLevelUpModal,
  };
};

export const useActiveChallenge = () => {
  const { activeChallenge } = useContext(ChallengeContext);
  return activeChallenge;
};

export const ChallengesProvider: React.FC<ChallengeProviderProps> = ({
  children,
  ...rest
}) => {
  const [level, setLevel] = useState(rest.level ?? 0);
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0
  );
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0
  );
  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }
  async function startNewChallenge() {
    const challenge = await api.get();
    setActiveChallenge(challenge);
    if (Notification.permission === "granted") {
      new Audio("/notification.mp3").play();
      new Notification("Novo desafio", {
        body: `Valendo ${challenge.amount}`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }
  async function completeChallenge() {
    if (!activeChallenge) {
      return;
    }
    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      setCurrentExperience(experienceToNextLevel - currentExperience);
      levelUp();
    }
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  useEffect(() => {
    if (currentExperience >= experienceToNextLevel) {
      levelUp();
    }
  }, [currentExperience, experienceToNextLevel]);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set("level", String(level));
    Cookies.set("currentExperience", String(currentExperience));
    Cookies.set("challengesCompleted", String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  return (
    <ChallengeContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        activeChallenge,
        experienceToNextLevel,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengeContext.Provider>
  );
};

export default ChallengeContext;
