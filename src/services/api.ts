import challenges from "./challenges.json";

function getRandomNumber() {
  return Math.floor(Math.random() * challenges.length);
}

const api = {
  get: async () => {
    return challenges[await getRandomNumber()];
  },
};

export default api;
