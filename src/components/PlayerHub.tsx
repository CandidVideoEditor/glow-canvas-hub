
// src/components/PlayerHub.tsx

import React, { useState, useRef } from 'react';

interface Song {
  id: string;
  title: string;
  language: string;
  url: string;
}

const sampleSongs: Song[] = [
  { id: '1', title: 'Baarisu Kannada Dimpu Dimpu', language: 'Kannada', url: '/songs/baarisu.mp3' },
  { id: '2', title: 'Tum Hi Aana', language: 'Hindi', url: '/songs/tum-hi-aana.mp3' },
  { id: '3', title: 'Samajavaragamana', language: 'Telugu', url: '/songs/samajavaragamana.mp3' },
];

// Radio URL (replace with your satellite/online FM stream)
const RADIO_URL = 'https://stream-ssl.example-fm.com/live'; 

const PlayerHub: React.FC = () => {
  const [mode, setMode] = useState<'music' | 'radio'>('radio'); // 🔹 default is Radio
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSong = (song: Song) => {
    if (audioRef.current) {
      audioRef.current.src = song.url;
      audioRef.current.play();
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const switchMode = (newMode: 'music' | 'radio') => {
    setMode(newMode);
    setIsPlaying(false);
    setCurrentSong(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-xl shadow-lg text-white max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">🎶 Player Hub</h2>

      {/* Mode Switch */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${mode === 'music' ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'}`}
          onClick={() => switchMode('music')}
        >
          Music
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${mode === 'radio' ? 'bg-green-600' : 'bg-gray-700 hover:bg-gray-600'}`}
          onClick={() => switchMode('radio')}
        >
          FM Radio
        </button>
      </div>

      {/* Music Mode */}
      {mode === 'music' && (
        <>
          <ul className="space-y-2 mb-6">
            {sampleSongs.map((song) => (
              <li
                key={song.id}
                className="p-3 rounded-lg bg-gray-800 hover:bg-gray-700 cursor-pointer flex justify-between items-center"
                onClick={() => playSong(song)}
              >
                <span>{song.title} <span className="text-gray-400">({song.language})</span></span>
                {currentSong?.id === song.id && isPlaying && <span>▶️</span>}
              </li>
            ))}
          </ul>

          {currentSong && (
            <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{currentSong.title}</h3>
                <p className="text-gray-400">{currentSong.language}</p>
              </div>
              <button
                onClick={togglePlayPause}
                className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition"
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>
            </div>
          )}
        </>
      )}

      {/* Radio Mode */}
      {mode === 'radio' && (
        <div className="bg-gray-800 p-6 rounded-lg flex flex-col items-center">
          <h3 className="font-semibold mb-3">Live FM Radio 📻</h3>
          <button
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.src = RADIO_URL;
                audioRef.current.play();
                setIsPlaying(true);
              }
            }}
            className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-500 transition"
          >
            Play Radio
          </button>
          {isPlaying && (
            <button
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.pause();
                  setIsPlaying(false);
                }
              }}
              className="mt-3 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-500 transition"
            >
              Stop Radio
            </button>
          )}
        </div>
      )}

      {/* Hidden Audio */}
      <audio ref={audioRef} />
    </div>
  );
};

export default PlayerHub;
