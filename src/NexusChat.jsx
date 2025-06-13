import { useState, useRef, useEffect } from "react";

export default function NexusChat() {
  const [messages, setMessages] = useState([
    {
      sender: "nexus",
      text: "Hi! I'm Nexus 🧳 Ask me anything about the hostel or the city!",
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
    <div className="flex flex-col h-screen bg-[#d2ddbb] p-4">
      <div className="flex items-center gap-2 mb-4">
        <img src="/nexus-avatar.png" alt="Nexus" className="w-10 h-10" />
        <h1 className="text-xl font-bold text-[#262626]">Nexus Chat</h1>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "nexus" ? "items-start" : "justify-end"
            }`}
          >
            {msg.sender === "nexus" && (
              <img
                src="/nexus-avatar.png"
                alt="Nexus"
                className="w-8 h-8 mr-2 rounded-full"
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
          <div className="text-sm text-[#262626] italic">Nexus is typing...</div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4 flex gap-2">
        <input
          className="flex-1 px-4 py-2 rounded-xl bg-white text-[#262626] shadow-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask Nexus anything..."
        />
        <button
          className="px-4 py-2 rounded-xl bg-[#262626] text-white hover:bg-black"
          onClick={handleSend}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
