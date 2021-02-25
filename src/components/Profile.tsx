import { useExperienceAndLevelsController } from "../contexts/ChallengesContext";
import styles from "../styles/components/Profile.module.css";
const Profile = () => {
  const { level } = useExperienceAndLevelsController();
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/misaruto.png" />
      <div>
        <strong>Misael Guilhardes de Freitas</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
};

export default Profile;
