const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("❌ ERROR: GEMINI_API_KEY is missing in .env file!");
}
const genAI = new GoogleGenerativeAI(apiKey);


const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ai_navigator";
mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected!"))
    .catch(err => console.log("⚠️ DB Connection Note: Continuing without Database."));

app.get("/", (req, res) => res.send("Server is Running! 🚀"));

app.post("/api/analyze-gap", async (req, res) => {
    console.log("📥 Request Received for:", req.body.targetRole);

    try {
        const { currentSkills, targetRole } = req.body;

        if (!currentSkills || !targetRole) {
            return res.status(400).json({ success: false, error: "Missing fields!" });
        }

    
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `I am good at: ${currentSkills}. I want to be: ${targetRole}. 
                        Provide a structured 4-week learning roadmap with resource links. 
                        Use Markdown formatting (headings, bold, bullets).`;

        console.log("🤖 AI is thinking...");
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log("✅ Real AI Response Sent!");
        res.json({ success: true, data: text });

    } catch (error) {
    
        console.error("❌ AI Error (Bypassing to Demo):", error.message);

        const demoRoadmap = `
# 🚀 Career Roadmap: ${req.body.targetRole}

Since you are skilled in **${req.body.currentSkills}**, here is your personalized path:

### 📅 Week 1: Core Fundamentals
* Bridge the gap between your current skills and **${req.body.targetRole}**.
* Study advanced architecture and documentation.

### 📅 Week 2: Intermediate Projects
* Build 2 real-world projects to strengthen your portfolio.
* Focus on API integrations and data handling.

### 📅 Week 3: Advanced Optimization
* Learn performance tuning and clean code practices.
* Deploy your projects to a live server.

### 📅 Week 4: Career Readiness
* Prepare for mock interviews specific to **${req.body.targetRole}**.
* Optimize your LinkedIn profile and Resume.

---
*Note: This is a structured demo roadmap. Use a VPN to enable live AI responses.*
        `;

        res.json({
            success: true,
            data: demoRoadmap
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is active on http://localhost:${PORT}`);
});