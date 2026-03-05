import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/session", async (req, res) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "Missing OPENAI_API_KEY env var" });
    }

    const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-realtime-preview-2024-12-17",
        voice: "alloy",
        modalities: ["audio", "text"],
        instructions:
          "You are A1 Asphalt’s AI team member for A1 Professional Asphalt & Concrete. " +
          "When the session starts, say exactly: " +
          "\"Hello, I am A1 Asphalt's AI team member. Can I help you with any questions you have?\" " +
          "Then wait for the user to speak. Keep replies short, helpful, and professional."
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "API Failure" });
  }
});

app.listen(PORT, () => {
  console.log(`A1 VoxTalk running on port ${PORT}`);
});
