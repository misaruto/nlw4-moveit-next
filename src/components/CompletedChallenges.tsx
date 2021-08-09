import { useChallengeController } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompletedChallenges.module.css';
const CompletedChallenges = () => {
  const { challengesCompleted } = useChallengeController();
  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  );
};

export default CompletedChallenges;
