import { useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import axios from "axios";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "¡Hola! Soy Cristian Martínez, ¿en qué puedo ayudarte?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
    // Llamada a OpenAI API
    try {
  const response = await axios.post("http://localhost:3001/api/chat", { message: input });
  const aiText = response.data.reply || "No tengo respuesta en este momento.";
  setMessages(msgs => [...msgs, { sender: "bot", text: aiText }]);
    } catch (err) {
      setMessages(msgs => [...msgs, { sender: "bot", text: "Error al conectar con la IA." }]);
    }
  };

  return (
    <div>
    <button
  className="fixed left-4 z-50 bg-white/10 backdrop-blur-lg text-blue-400 rounded-full p-3 shadow-lg hover:scale-110 transition-transform duration-300 top-4 md:top-7"
        onClick={() => setOpen(o => !o)}
        aria-label="Abrir chat"
      >
        <FiMessageSquare size={24} />
      </button>
      {open && (
        <div className="fixed top-16 left-4 z-50 w-80 max-w-full bg-gray-900 text-white rounded-xl shadow-2xl flex flex-col">
          <div className="p-4 border-b border-gray-700 font-bold">Chat con Cristian</div>
          <div className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: 320 }}>
            {messages.map((msg, i) => (
              <div key={i} className={`mb-2 text-sm ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                <span className={`inline-block px-3 py-2 rounded-lg ${msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-800 text-blue-300"}`}>{msg.text}</span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} className="p-4 border-t border-gray-700 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Escribe tu mensaje..."
              autoFocus
            />
            <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 font-bold">Enviar</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
