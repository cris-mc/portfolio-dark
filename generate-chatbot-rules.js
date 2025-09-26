// Script para generar reglas de ejemplo para chatbot-rules.json
const fs = require('fs');

const baseRules = [
  {
    keywords: ["hola", "hello"],
    reply: "¡Hola! Soy Cristian Martínez, ¿en qué puedo ayudarte?"
  },
  {
    keywords: ["precio", "precios", "costo", "tarifa"],
    reply: "Los precios varían según el tipo de servicio. ¡Envíame detalles y te hago una cotización personalizada!"
  },
  // ...puedes agregar tus reglas personalizadas aquí
];

// Generar reglas de ejemplo
const generatedRules = [];
for (let i = 1; i <= 1000; i++) {
  generatedRules.push({
    keywords: ["pregunta" + i, "tema" + i],
    reply: `Esta es una respuesta automática para el tema ${i}. Puedes personalizar este texto.`
  });
}

const allRules = [...baseRules, ...generatedRules];

fs.writeFileSync('chatbot-rules.json', JSON.stringify(allRules, null, 2));
console.log('chatbot-rules.json actualizado con 1000 reglas de ejemplo.');
