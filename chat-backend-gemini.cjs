// Backend proxy para Gemini (Google AI)
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// No se requiere API Key para el chatbot por reglas

const fs = require('fs');

function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9áéíóúüñ\s]/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getRules() {
  try {
    const data = fs.readFileSync('chatbot-rules.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error leyendo chatbot-rules.json:', err);
    return [];
  }
}

app.post('/api/chat', (req, res) => {
  const { message = "" } = req.body;
  const msg = normalize(message);
  let reply = null;

  const rules = getRules();
  for (const rule of rules) {
    if (rule.keywords.some(k => msg.includes(normalize(k)))) {
      if (Array.isArray(rule.reply)) {
        reply = rule.reply[Math.floor(Math.random() * rule.reply.length)];
      } else {
        reply = rule.reply;
      }
      break;
    }
  }

  if (!reply) {
    reply = "No tengo respuesta en este momento. Si tienes una consulta específica, puedes contactarme por WhatsApp: https://wa.me/5493517660000";
  }
  res.json({ reply });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Gemini chat backend running on port ${PORT}`);
});
