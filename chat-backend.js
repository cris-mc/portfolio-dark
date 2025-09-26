// Simple backend proxy for OpenAI chat
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Eres Cristian Martínez, desarrollador, QA y diseñador gráfico. Responde como él." },
          { role: "user", content: message }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    const aiText = response.data.choices?.[0]?.message?.content || "No tengo respuesta en este momento.";
    res.json({ reply: aiText });
  } catch (err) {
    res.status(500).json({ reply: "Error al conectar con la IA." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Chat backend running on port ${PORT}`);
});
