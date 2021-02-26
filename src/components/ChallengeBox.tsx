import { useChallengeController } from "../contexts/ChallengesContext";
import { useCountdown } from "../contexts/CountDownContext";
import styles from "../styles/components/ChallengeBox.module.css";
const ChallengeBox = () => {
  const {
    activeChallenge,
    resetChallenge,
    completeChallenge,
  } = useChallengeController();

  const { resetCountDown } = useCountdown();

  function handleChallengeSucceed() {
    completeChallenge();
    resetCountDown();
  }

  function handleChallengeFailed() {
    resetChallenge();
    resetCountDown();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>{`Ganhe ${activeChallenge.amount}xp`}</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} />
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button
              type="button"
              className={styles.challengeFailedButton}
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.challengeSucceededButton}
              onClick={handleChallengeSucceed}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up" />
            Avance de level completando desafios
          </p>
        </div>
      )}
    </div>
  );
};

export default ChallengeBox;
