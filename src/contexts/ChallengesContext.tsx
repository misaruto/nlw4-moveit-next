import { createContext, useContext, useState } from "react";
import api from "../services/api";

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
};

export type ChallengeProviderProps = {
  children: React.ReactNode;
};

const ChallengeContext = createContext<ChallengeContextData>(
  {} as ChallengeContextData
);

export const useChallengeController = () => {
  const { startNewChallenge, resetChallenge, activeChallenge } = useContext(
    ChallengeContext
  );
  return { startNewChallenge, resetChallenge, activeChallenge };
};

export const useExperienceAndLevelsController = () => {
  const {
    currentExperience,
    experienceToNextLevel,
    level,
    levelUp,
  } = useContext(ChallengeContext);
  return { currentExperience, experienceToNextLevel, level, levelUp };
};

export const useActiveChallenge = () => {
  const { activeChallenge } = useContext(ChallengeContext);
  return activeChallenge;
};

export const ChallengesProvider: React.FC<ChallengeProviderProps> = ({
  children,
}) => {
  const [level, setLevel] = useState(0);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function levelUp() {
    setLevel(level + 1);
  }

  async function startNewChallenge() {
    const challenge = await api.get();
    setActiveChallenge(challenge);
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

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
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};

export default ChallengeContext;
