"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Song {
  id: string;
  title: string;
  url: string;
}

export function MusicPlayer() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    import("../lib/songs").then(({ getSongs }) => {
      getSongs().then((data: Song[]) => {
        setSongs(data);
        if (data.length > 0) setCurrentSongIndex(0);
      }).catch(console.error);
    });
  }, []);

  useEffect(() => {
    if (!audioRef.current || songs.length === 0) return;
    audioRef.current.pause();
    audioRef.current.src = songs[currentSongIndex].url;
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentSongIndex, songs]);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current || songs.length === 0) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
  };

  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  if (songs.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-card border rounded-lg p-4 shadow-lg z-50 min-w-64">
      <div className="text-sm font-medium text-foreground mb-2 truncate">
        {songs[currentSongIndex]?.title}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={prevSong}>
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={togglePlay}>
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={nextSong}>
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
