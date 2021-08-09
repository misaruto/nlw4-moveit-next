import { useEffect } from 'react';
import { useExperienceAndLevelsController } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';
const ExperienceBar = () => {
  const { currentExperience, experienceToNextLevel, level } =
    useExperienceAndLevelsController();

  const percentToNextLevel =
    Math.round(currentExperience * 100) / experienceToNextLevel;

  const experienceOfPreviouslyLevel = level !== 0 ? Math.pow(level * 4, 2) : 0;

  return (
    <header className={styles.experienceBar}>
      <span>{experienceOfPreviouslyLevel} xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }}>
          <span
            className={styles.currentExperience}
            style={{ left: `${percentToNextLevel}%` }}
          >
            {currentExperience} xp
          </span>
        </div>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
};

export default ExperienceBar;
