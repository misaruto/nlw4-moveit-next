import Head from "next/head";
import { GetServerSideProps } from "next";

import { ChallengesProvider } from "../contexts/ChallengesContext";

import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";

import { CountdownProvider } from "../contexts/CountDownContext";

import CompletedChallenges from "../components/CompletedChallenges";
import CountDown from "../components/CountDown";
import ChallengeBox from "../components/ChallengeBox";

import styles from "../styles/pages/Home.module.css";

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | move.it</title>
        </Head>
        <ExperienceBar />
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <CountDown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;
  level === undefined ? 0 : level;
  currentExperience === undefined ? 0 : currentExperience;
  challengesCompleted === undefined ? 0 : challengesCompleted;
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};

export default Home;
