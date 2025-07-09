exports.getGoals = async (req, res) => {
  try {
    const { courseName, topicResults } = req.body;
    console.log("Received data:", req.body);

    if (!courseName || !Array.isArray(topicResults)) {
      return res.status(400).json({
        message: "Invalid data format. courseName and topicResults array are required.",
        data: [],
      });
    }

    const weakTopics = topicResults.filter((topic) => topic.level === "weak");
    const strongTopics = topicResults.filter((topic) => topic.level === "strong");

    let prompt = `I am a student who just completed a diagnostic quiz for the course "${courseName}". Here are my results:\n\n`;

    if (weakTopics.length > 0) {
      prompt += "Areas I need to improve (weak performance):\n";
      weakTopics.forEach((t) => {
        prompt += `- ${t.topic}: Score: ${t.score}% (${t.correct}/${t.total} correct)\n`;
      });
      prompt += "\n";
    }

    prompt += `Based on this data, generate a **valid, raw JSON array** (not wrapped in any markdown formatting, and without backticks or extra text).

Each item in the array should contain the following fields:f

- "topic": the topic name
- "learningGoals": array of specific, measurable learning objectives
- "resources": array of learning resources. Each resource must include:
  - "type": one of "YouTube", "tutorial", "documentation", or "exercise"
  - "title": resource title
  - "url": a valid link
  - "source": the channel, author, or organization (optional for tutorials)
- "studyTimeline": suggested timeframe (e.g., "1 week", "5 days")
- "assessmentMethod": how the student can verify understanding

⚠️ Do NOT include any explanation, headers, markdown syntax, triple backticks, or commentary. Only return a **raw JSON array** like this:

[
  {
    "topic": "Network Models",
    "learningGoals": ["Understand OSI layers", "Compare OSI and TCP/IP"],
    "resources": [
      { "type": "YouTube", "title": "OSI Model Explained", "url": "https://youtube.com/...", "source": "Net Ninja" },
      { "type": "Tutorial", "title": "FreeCodeCamp TCP/IP vs OSI", "url": "https://freecodecamp.org/..." }
    ],
    "studyTimeline": "5 days",
    "assessmentMethod": "Explain each OSI layer and complete practice exercises"
  }
]

Return only the JSON array, nothing else.`;

    // API Call to OpenRouter
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer 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",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://yourdomain.com",
        "X-Title": "OpenRouter Text Test",
      },
      body: JSON.stringify({
        model: "google/gemma-3-12b-it:free",
        messages: [
          {
            role: "system",
            content:
              "You are an expert educational advisor who creates personalized learning plans based on student performance data. Provide practical, actionable learning resources and goals.",
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
    console.log("Raw API response:", JSON.stringify(data, null, 2));

    let result = data.choices?.[0]?.message?.content ?? "[]";

    // 🧼 Clean up result in case AI still added backticks
    if (result.startsWith("```")) {
      result = result.replace(/^```json\n?/, "").replace(/```$/, "");
    }

    let parsedGoals = [];

    try {
      parsedGoals = JSON.parse(result);
    } catch (err) {
      console.error("Failed to parse JSON response from AI:", err);
    }

    res.json({
      message: "Learning goals generated successfully",
      data: {
        courseName,
        studentPerformance: {
          totalTopics: topicResults.length,
          weakAreas: weakTopics.length,
          strongAreas: strongTopics.length,
          overallScore: Math.round(
            topicResults.reduce((sum, t) => sum + parseInt(t.score), 0) / topicResults.length
          ),
        },
        learningPlan: parsedGoals,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error in getGoals:", error);
    res.status(500).json({
      message: "Failed to generate learning goals",
      error: error.message,
      data: [],
    });
  }
};
