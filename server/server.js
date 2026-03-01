const express = require('express');
const fetch = require('node-fetch');
const app = express();
const path = require('path');

app.use(express.static('public'));

// The secret handshake route
app.get('/session', async (req, res) => {
  try {
    const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-realtime-preview-2024-12-17",
        voice: "alloy",
        instructions: "You are a professional team member for A1 Professional Asphalt & Sealing LLC. You are talking to Joe. Be concise and professional. Focus only on asphalt paving, sealing, and striping. If Joe asks for an estimate, tell him you can help gather project details.",
        input_audio_transcription: { model: "whisper-1" }
      }),
    });
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error("Session Error:", error);
    res.status(500).send({ error: "Could not create session" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`A1 Asphalt Server running on port ${PORT}`));
