export default function GroupChat({ onBack }) {
  return (
    <div className="flex flex-col h-screen bg-[#1a1a1a] text-white p-4">
      <h2 className="text-xl font-blackops mb-4">🧑‍🤝‍🧑 Group Chat</h2>
      <p className="mb-4">This is a placeholder for the group chat component.</p>
      <button
        onClick={onBack}
        className="px-4 py-2 rounded-xl bg-[#04f9c2] text-black font-blackops hover:bg-[#02e1af]"
      >
        Back to Nexus
      </button>
    </div>
  );
}