
export const generateDiagnosticQuiz = async (courseName, currentWeek, weekData) => {
  const prompt = `Create a diagnostic quiz for the course "${courseName}" focusing on Week ${currentWeek} topics: ${weekData.topics.join(", ")}.

Generate exactly 5 multiple choice questions that assess student understanding of these topics. Each question should be mapped to one of the specific topics from this week.

Topics for this week:
${weekData.topics.map((topic, index) => `${index + 1}. ${topic}`).join("\n")}

Return the response in this exact JSON format:
{
  "name": "${courseName}",
  "week": ${currentWeek},
  "topics": ${JSON.stringify(weekData.topics)},
  "quiz": [
    {
      "question": "Question text here",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": 0,
      "topic": "Introduction to Computer Networks"
    }
  ]
}`;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: "Bearer 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",
      "Content-Type": "application/json",
      "HTTP-Referer": "https://yourdomain.com",
      "X-Title": "OpenRouter Quiz Generator",
    },
    body: JSON.stringify({
      model: "google/gemma-3-12b-it:free",
      messages: [
        {
          role: "system",
          content: "You are an expert educational advisor who ...",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 2000,
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  const aiContent = data.choices[0].message.content;
  const cleaned = aiContent.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(cleaned.match(/\{[\s\S]*\}/)[0]);
  return parsed;
};
              