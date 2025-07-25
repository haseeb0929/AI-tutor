import api from "../api";

export const submitQuizResults = async ({ courseName, week, topicResults }) => {
  try {
    const res = await api.post("/getGoals", {
      courseName,
      week,
      topicResults,
    });
    return res.data;
  } catch (err) {
    throw new Error("Failed to submit results");
  }
};
