import { useState, useRef, useEffect } from "react";

export default function NexusChat({ onSelectView }) {
  const [messages, setMessages] = useState([
    {
      sender: "nexus",
      text: "Hi! I'm Nexus 🐶, the friendly mascot of Next House Copenhagen. Ask me anything about the hostel or the city!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        "http://127.0.0.1:5001/nexus-hostel-app/us-central1/chatWithNexus",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input }),
        }
      );

      const data = await res.json();
      const reply = { sender: "nexus", text: data.reply };
      setMessages((prev) => [...prev, reply]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "nexus", text: "Oops! Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-[#1a1a1a] p-4">
      {/* ENCABEZADO CON VIDEO */}
      <div className="flex flex-col items-center mb-2">
        <video
          src="/nexusvideo.mp4"
          autoPlay
          loop
          muted
          className="w-[100px] h-[100px] rounded-full shadow-md"
        />
        <h1 className="text-2xl font-blackops text-white mt-2 uppercase">
          NEXT HOUSE COPENHAGEN
        </h1>

        {/* BOTONES DE ACCESO */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => onSelectView("groupChat")}
            className="bg-[#04f9c2] text-black px-4 py-2 rounded-xl font-blackops text-sm hover:bg-[#02e1af]"
          >
            🧑‍🤝‍🧑 Group Chat
          </button>
          <button
            onClick={() => onSelectView("activities")}
            className="bg-[#04f9c2] text-black px-4 py-2 rounded-xl font-blackops text-sm hover:bg-[#02e1af]"
          >
            📅 Today's Activities
          </button>
        </div>
      </div>

      {/* MENSAJES */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 mt-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "nexus" ? "items-start" : "justify-end"
            }`}
          >
            {msg.sender === "nexus" && (
              <img
                src="/nexuspic.png"
                alt="Nexus"
                className="w-6 h-6 mr-2 rounded-full object-cover"
              />
            )}
            <div
              className={`px-4 py-2 rounded-2xl text-sm max-w-[75%] shadow-md whitespace-pre-line ${
                msg.sender === "nexus"
                  ? "bg-white text-[#262626]"
                  : "bg-[#04f9c2] text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-sm text-white italic">Nexus is typing...</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div className="mt-4 flex gap-2">
        <input
          className="flex-1 px-4 py-2 rounded-xl bg-white text-[#262626] shadow-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask Nexus anything..."
        />
        <button
          className="px-4 py-2 rounded-xl bg-[#04f9c2] text-black hover:bg-[#02e1af] font-blackops uppercase"
          onClick={handleSend}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}