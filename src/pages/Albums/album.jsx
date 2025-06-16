import React, { useEffect, useState } from 'react';

const Albums = () => {
  const [sortedSongs, setSortedSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 state pencarian

  useEffect(() => {
    fetch('https://webfmsi.singapoly.com/api/playlist/53')
      .then(res => res.json())
      .then(data => {
        const songs = data.datas || [];

        const filtered = songs.filter(song =>
          song.play_name &&
          song.play_description &&
          song.play_name !== 'play_name' &&
          song.play_description !== 'play_description'
        );

        const sorted = filtered.sort((a, b) =>
          a.play_description.localeCompare(b.play_description)
        );

        setSortedSongs(sorted);
      });
  }, []);

  const filteredSongs = sortedSongs.filter(song =>
    song.play_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.play_genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Daftar Album</h1>

      {/* Input search */}
      <input
        type="text"
        placeholder="Cari berdasarkan nama album atau genre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '0.5rem',
          width: '100%',
          maxWidth: '400px',
          marginBottom: '1.5rem',
          borderRadius: '6px',
          border: '1px solid #ccc'
        }}
      />

      {filteredSongs.length === 0 ? (
        <p>Tidak ada album yang cocok.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {filteredSongs.map((song, i) => (
            <div key={i} style={{
              border: '1px solid #ccc',
              padding: '1rem',
              borderRadius: '8px',
              width: '250px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}>
              <img
                src={song.play_thumbnail || 'https://via.placeholder.com/250x140?text=No+Thumbnail'}
                alt={song.play_name}
                style={{ width: '100%', borderRadius: '6px', marginBottom: '0.5rem' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/250x140?text=Thumbnail+Not+Found';
                }}
              />
              <p><strong>🎵 Album:</strong> {song.play_name}</p>
              <p><strong>📀 Deskripsi:</strong> {song.play_description}</p>
              <p><strong>🎧 Genre:</strong> {song.play_genre}</p>
              <a href={song.play_url} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'underline' }}>
                🔗 Dengarkan Lagu
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Albums;
