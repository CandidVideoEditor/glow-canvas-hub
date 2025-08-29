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
  const [isLoading, setIsLoading] = useState(false);
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
    if (!audioRef.current) {
      audioRef.current = new Audio();
      
      // Add event listeners for smooth playback
      audioRef.current.addEventListener('loadstart', () => setIsLoading(true));
      audioRef.current.addEventListener('canplay', () => setIsLoading(false));
      audioRef.current.addEventListener('ended', () => {
        nextSong();
        setIsPlaying(true); // Auto-play next song
      });
      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        setIsLoading(false);
        setIsPlaying(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadstart', () => setIsLoading(true));
        audioRef.current.removeEventListener('canplay', () => setIsLoading(false));
        audioRef.current.removeEventListener('ended', nextSong);
        audioRef.current.removeEventListener('error', () => {});
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current || songs.length === 0) return;
    
    setIsLoading(true);
    audioRef.current.pause();
    audioRef.current.src = songs[currentSongIndex].url;
    audioRef.current.load();
    
    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error('Play error:', error);
        setIsPlaying(false);
        setIsLoading(false);
      });
    }
  }, [currentSongIndex, songs]);

  const togglePlay = () => {
    if (!audioRef.current || songs.length === 0 || isLoading) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.error('Play error:', error);
        setIsPlaying(false);
      });
    }
  };

  const nextSong = () => {
    if (songs.length === 0) return;
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    
    // Auto-play next song after a brief delay
    setTimeout(() => {
      if (audioRef.current && songs[nextIndex]) {
        audioRef.current.play().catch(console.error);
      }
    }, 100);
  };

  const prevSong = () => {
    if (songs.length === 0) return;
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  if (songs.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-card/95 backdrop-blur-sm border rounded-lg p-4 shadow-lg z-50 min-w-64">
      <div className="text-sm font-medium text-foreground mb-2 truncate">
        {songs[currentSongIndex]?.title || "No song selected"}
        {isLoading && <span className="text-xs text-muted-foreground ml-2">(Loading...)</span>}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={prevSong} disabled={songs.length === 0}>
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={togglePlay} disabled={songs.length === 0 || isLoading}>
          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          ) : isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        <Button variant="ghost" size="icon" onClick={nextSong} disabled={songs.length === 0}>
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
