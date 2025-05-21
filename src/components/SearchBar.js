import React, { useState } from "react";

const CLIENT_ID = "93d2e50e"; // Replace with your Jamendo client ID

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);

  const searchSongs = async () => {
    if (!query) return;

    const res = await fetch(
      `https://api.jamendo.com/v3.0/tracks/?client_id=${CLIENT_ID}&format=json&limit=10&search=${query}`
    );
    const data = await res.json();
    setResults(data.results);
  };

  const playAudio = (previewUrl) => {
    if (currentAudio) {
      currentAudio.pause();
      if (currentAudio.src === previewUrl) {
        setCurrentAudio(null);
        return;
      }
    }
    const audio = new Audio(previewUrl);
    audio.play();
    setCurrentAudio(audio);
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
    }
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Search for music..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && <button className="clear-btn" onClick={clearSearch}>×</button>}
        </div>
        <button onClick={searchSongs}>Search</button>
      </div>

      {results.length > 0 && (
        <div className="results">
          {results.map((track) => (
            <div key={track.id} className="track-card">
              <img src={track.album_image} alt={track.name} className="track-img" />
              <div className="track-info">
                <strong>{track.name}</strong>
                <p>{track.artist_name}</p>
                <button onClick={() => playAudio(track.audio)}>▶ Play / ⏸ Pause</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
