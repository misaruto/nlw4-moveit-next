import { useEffect } from "react";
import { useExperienceAndLevelsController } from "../contexts/ChallengesContext";
import styles from "../styles/components/ExperienceBar.module.css";
const ExperienceBar = () => {
  const {
    currentExperience,
    experienceToNextLevel,
    level,
  } = useExperienceAndLevelsController();

  const percentToNextLevel =
    Math.round(currentExperience * 100) / experienceToNextLevel;

  const experienceOfPreviouslyLevel = Math.pow((level - 1) * 4, 2);

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
