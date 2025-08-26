import { useState, useEffect, useRef } from "react";

// List your songs here
const songs = [
  { title: "Song 1", file: "/Songs/song1.mp3" },
  { title: "Song 2", file: "/Songs/song2.mp3" },
  // Add all your songs
];

export default function MusicPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(songs[0].file));

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(songs[currentIndex].file);
    if (isPlaying) audioRef.current.play();
  }, [currentIndex]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const nextSong = () => {
    setCurrentIndex((currentIndex + 1) % songs.length);
  };

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      background: "#111",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "10px",
      zIndex: 9999
    }}>
      <p>{songs[currentIndex].title}</p>
      <button onClick={togglePlay}>
        {isPlaying ? "Pause" : "Play"}
      </button>
      <button onClick={nextSong}>Next</button>
    </div>
  );
}
