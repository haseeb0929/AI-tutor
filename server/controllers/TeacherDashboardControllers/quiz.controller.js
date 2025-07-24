const Quiz = require("../../models/quiz.model");
const Pdf = require("../../models/pdf.model");
const QuizResult = require("../../models/result.model");
const fs = require("fs");
const pdfParse = require("pdf-parse");

const generateMCQsFromAI = async (text, numMcqs) => {
    const prompt = `Generate ${numMcqs} multiple-choice questions (MCQs) based on the following educational content.
Return each question as a JSON array of objects. Each object should have:
- "question": string,
- "options": array of 4 strings,
- "correctAnswer": string

ONLY return pure JSON, no markdown formatting, no explanations.
Content:\n\n${text}`;

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
                    content: "You are an expert educational advisor who creates high-quality multiple-choice questions from academic content.",
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

    const result = await response.json();
    let content = result.choices?.[0]?.message?.content || "";

    console.log("Raw AI Response:\n", content); // Debug output

    try {
        // Extract first JSON array from the response using regex
        const jsonMatch = content.match(/\[\s*{[\s\S]*?}\s*\]/);
        if (!jsonMatch) throw new Error("No valid JSON array found in response");

        const cleanJson = jsonMatch[0];
        return JSON.parse(cleanJson);
    } catch (err) {
        console.error("Failed to parse AI response:", err);
        return [];
    }
};


exports.generateQuizzes = async (req, res) => {
    try {
        const { fileId, numQuizzes, numMcqs } = req.body;
        const pdf = await Pdf.findById(fileId);
        if (!pdf) return res.status(404).json({ message: "PDF not found" });

        const dataBuffer = fs.readFileSync(pdf.filePath);
        const pdfData = await pdfParse(dataBuffer);

        const quizzes = [];
        for (let i = 0; i < numQuizzes; i++) {
            const mcqs = await generateMCQsFromAI(pdfData.text, numMcqs);
            const quiz = new Quiz({ pdf: fileId, mcqs, pdfName: pdf.fileName, isAssigned: false });
            await quiz.save();
            quizzes.push(quiz);
        }

        res.status(200).json({ message: "Quizzes generated", quizzes });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to generate quizzes" });
    }
};

exports.getQuizzesByPdf = async (req, res) => {
    try {
        const { pdfId } = req.params;
        const quizzes = await Quiz.find({ pdf: pdfId });
        res.status(200).json({ quizzes });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch quizzes" });
    }
};

exports.listAllPdfs = async (req, res) => {
    try {
        const files = await Pdf.find().sort({ createdAt: -1 });
        res.status(200).json({ files });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to list PDFs" });
    }
};


exports.getAllQuizzes = async (req, res) => {
    const quizzes = await Quiz.find(); // optionally populate pdfName if needed
    res.json(quizzes);
};
exports.updateQuizAssignment = async (req, res) => {
    const { isAssigned } = req.body;
    await Quiz.findByIdAndUpdate(req.params.quizId, { isAssigned });
    res.json({ message: "Assignment updated." });
};
exports.getAssignedQuizes = async (req, res) => {
    try {
        const quizzes = await Quiz.find({ isAssigned: true });
        res.status(200).json({ quizzes });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch assigned quizzes" });
    }
};

exports.submitQuizResult = async (req, res) => {
    try {
        const { quizId, studentId, answers, score, duration } = req.body;
        if (!quizId || !studentId || !answers || score === undefined || !duration) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        const existingResult = await QuizResult.findOne({ quizId, studentId });
        if (existingResult) {
            return res.status(400).json({ error: 'Quiz already attempted by this student' });
        }
        const quizResult = new QuizResult({
            studentId,
            quizId,
            answers,
            score,
            duration,
            attemptedAt: new Date(),
        });

        await quizResult.save();

        res.status(201).json({
            message: 'Quiz result submitted successfully',
            quizResult,
        });
    } catch (error) {
        console.error('Error submitting quiz result:', error);
        res.status(500).json({ error: 'Server error while submitting quiz result' });
    }
};
exports.getAllQuizResults = async (req, res) => {
    try {
        const quizResults = await QuizResult.find()
            .sort({ attemptedAt: -1 }); // Sort by most recent

        res.status(200).json({
            message: 'All quiz results retrieved successfully',
            quizResults,
        });
    } catch (error) {
        console.error('Error fetching all quiz results:', error);
        res.status(500).json({ error: 'Server error while fetching all quiz results' });
    }
};