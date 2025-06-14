import { useState } from "react";
import NexusChat from "./NexusChat";
import GroupChat from "./GroupChat";
import Activities from "./Activities";

function App() {
  const [view, setView] = useState("nexus"); // "nexus" | "groupChat" | "activities"

  return (
    <>
      {view === "nexus" && <NexusChat onSelectView={setView} />}

      {view === "groupChat" && (
        <GroupChat onBack={() => setView("nexus")} />
      )}

      {view === "activities" && (
        <Activities onBack={() => setView("nexus")} />
      )}
    </>
  );
}

export default App;