import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useChallengeController } from "../contexts/ChallengesContext";

export type CountdownContextData = {
  minutes: number;
  seconds: number;
  isActive: boolean;
  hasFinished: boolean;

  startCountDown: () => void;
  resetCountDown: () => void;
};

export type CountdownProviderProps = {
  children: ReactNode;
};

const CountdownContext = createContext({} as CountdownContextData);

export const useCountdown = () => {
  const countdown = useContext(CountdownContext);
  return countdown;
};

export const useCountDownTime = () => {
  const { minutes, seconds } = useContext(CountdownContext);
  return { minutes, seconds };
};

let countDownTimeout: NodeJS.Timeout;
export const CountdownProvider: React.FC<CountdownProviderProps> = ({
  children,
}) => {
  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const { startNewChallenge } = useChallengeController();

  function startCountDown() {
    setIsActive(true);
  }

  function resetCountDown() {
    clearTimeout(countDownTimeout);
    setTime(0.1 * 60);
    setIsActive(false);
  }
  useEffect(() => {
    if (isActive && time > 0) {
      countDownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        isActive,
        hasFinished,
        startCountDown,
        resetCountDown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
};

export default CountdownContext;
