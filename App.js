import React, { useState, useEffect } from "react";

const API_BASE_URL = "http://127.0.0.1:5001"; // Ensure correct port

function App() {
  const [moods, setMoods] = useState([]);
  const [emotion, setEmotion] = useState("");
  const [userId, setUserId] = useState("");

  // Fetch moods from Flask API
  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/get_moods`);
        if (!response.ok) throw new Error("Failed to fetch moods");

        const data = await response.json();
        console.log("Fetched Moods:", data);
        setMoods(data.moods || []);
      } catch (error) {
        console.error("Error fetching moods:", error);
      }
    };

    fetchMoods();
  }, []);

  // Function to log mood
  const logMood = async () => {
    if (!userId || !emotion) {
      alert("Please enter User ID and Emotion!");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/log_mood`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, emotion }),
      });

      const data = await response.json();
      console.log("Server Response:", data);

      if (!response.ok) throw new Error(data.message || "Failed to log mood");

      alert(data.message);

      // Refresh moods after logging a new one
      setMoods((prevMoods) => [...prevMoods, { user_id: userId, emotion }]);
      setEmotion("");
    } catch (error) {
      console.error("Error logging mood:", error);
      alert(`Failed to log mood: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Mood Tracker</h1>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter your mood"
        value={emotion}
        onChange={(e) => setEmotion(e.target.value)}
      />
      <button onClick={logMood}>Log Mood</button>

      <h2>Previous Moods</h2>
      <ul>
        {moods.map((mood, index) => (
          <li key={index}>
            <strong>{mood.user_id}</strong> - {mood.emotion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;