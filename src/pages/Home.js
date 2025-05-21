import React, { useEffect, useState } from "react";
import "../../src/style.css";
import SearchBar from "../components/SearchBar";

const CLIENT_ID = "93d2e50e";

export default function Home() {
    const [songs, setSongs] = useState([]);
    const [currentAudio, setCurrentAudio] = useState(null);
    const [currentlyPlayingId, setCurrentlyPlayingId] = useState(null);
    
    useEffect(() => {
        fetch(`https://api.jamendo.com/v3.0/tracks/?client_id=${CLIENT_ID}&format=json&limit=10`)
          .then((res) => res.json())
          .then((data) => {
            setSongs(data.results);
          })
          .catch((err) => console.error("Error fetching songs:", err));
      }, []);
    
      const togglePlay = (song) => {
        if (currentlyPlayingId === song.id) {
          currentAudio.pause();
          setCurrentlyPlayingId(null);
        } else {
          if (currentAudio) currentAudio.pause();
    
          const newAudio = new Audio(song.audio);
          newAudio.play();
          setCurrentAudio(newAudio);
          setCurrentlyPlayingId(song.id);
        }
      };
    
      return (
        <div className="home">
          <aside className="sidebar">
            <h3>Your Library</h3>
            <button className="create-btn">Create playlist</button>
            <p>Let’s find some music to enjoy</p>
          </aside>
    
          <main className="content">
            <header className="top-bar">
                <SearchBar />
            </header>
    
            <section className="section">
              <h2>Trending Songs</h2>
              <div className="songs">
                {songs.map((song) => (
                  <div className="song-card" key={song.id}>
                    <div className="song-img-container">
                      <img src={song.album_image} alt={song.name} />
                      <button
                        className="play-btn"
                        onClick={() => togglePlay(song)}
                      >
                        {currentlyPlayingId === song.id ? "⏸" : "▶"}
                      </button>
                    </div>
                    <p>{song.name}</p>
                    <small>{song.artist_name}</small>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      );
    }
    