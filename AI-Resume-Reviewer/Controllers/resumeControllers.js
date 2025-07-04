const Resume = require("../models/Resume");
const fs = require("fs");
const { Configuration, OpenAIApi } = require("openai");

// Configure OpenAI
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

exports.uploadResume = async (req, res) => {
    try {
        const filePath = req.file.path;
        const text = fs.readFileSync(filePath, "utf-8");

        // Ask OpenAI to review the resume
        const response = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are a professional resume reviewer. Provide clear, actionable feedback to improve this resume." },
                { role: "user", content: text }
            ]
        });

        const feedback = response.data.choices[0].message.content;

        // Save to MongoDB
        const resume = new Resume({
            filename: req.file.filename,
            feedback
        });
        await resume.save();

        res.json({
            message: " Resume reviewed successfully",
            feedback
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong while reviewing the resume." });
    }
};

