import React, { useState } from "react";
import './App.css'

function App() {
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [error, setError] = useState("");

  const fetchLyrics = async () => {
    try {
      const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
      if (!response.ok) {
        throw new Error("Şarkı sözleri bulunamadı.");
      }
      const data = await response.json();
      setLyrics(data.lyrics);
      setError("");
    } catch (err) {
      setError(err.message);
      setLyrics("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchLyrics();
  };

  return (
    <div className="App">
      <h1>Şarkı Sözü Bulucu</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="artist">Sanatçı: </label>
          <input
            type="text"
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="title">Şarkı Adı: </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button type="submit">Şarkı Sözlerini Getir</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {lyrics && (
        <div>
          <h3>Şarkı Sözleri:</h3>
          <pre>{lyrics}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
