// src/pages/SavedSongs.js
import React, { useEffect, useState } from "react";

const SavedSongs = () => {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedSongs")) || [];
    setSaved(stored);
  }, []);

  return (
    <div style={{ padding: "2rem" ,backgroundColor:"#000"}}>
      <h2>🎶 Saved Songs</h2>
      {saved.length === 0 ? (
        <p>No songs saved yet.</p>
      ) : (
        <ul>
          {saved.map((track) => (
            <li key={track.id} style={{ marginTop: "1rem" }}>
              <strong>{track.name}</strong> by {track.artist_name}
              <br />
              <audio controls src={track.audio}></audio>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedSongs;
