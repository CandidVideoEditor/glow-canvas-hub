"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Song {
  id: string;
  title: string;
  url: string;
}

export default function MusicPlayer() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch("/api/songs")
      .then((res) => res.json())
      .then((data: Song[]) => {
        setSongs(data);
        if (data.length > 0) {
          setCurrentSongIndex(0);
        }
      })
      .catch((err) => console.error("Error fetching songs:", err));
  }, []);

  useEffect(() => {
    if (audioRef.current && songs.length > 0) {
      audioRef.current.src = songs[currentSongIndex].url;
      if (isPlaying) audioRef.current.play();
    }
  }, [currentSongIndex, songs]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
  };

  const playPrevious = () => {
    setCurrentSongIndex((prev) =>
      prev === 0 ? songs.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-2xl p-4 w-80">
      <div className="flex items-center gap-3">
        <Music className="w-6 h-6 text-blue-600" />
        <div className="flex-1">
          <p className="font-semibold">
            {songs.length > 0 ? songs[currentSongIndex].title : "No Songs"}
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 mt-3">
        <Button variant="ghost" onClick={playPrevious}>
          <SkipBack />
        </Button>
        <Button variant="ghost" onClick={togglePlayPause}>
          {isPlaying ? <Pause /> : <Play />}
        </Button>
        <Button variant="ghost" onClick={playNext}>
          <SkipForward />
        </Button>
      </div>

      <audio
        ref={audioRef}
        onEnded={playNext}
        className="hidden"
        controls
      />
    </div>
  );
}
