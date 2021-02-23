import styles from "../styles/components/Profile.module.css";
const Profile = () => {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/misaruto.png" />
      <div>
        <strong>Misael Guilhardes de Freitas</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level 1
        </p>
      </div>
    </div>
  );
};

export default Profile;
