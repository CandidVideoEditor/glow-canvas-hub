"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
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
        if (data.length > 0) setCurrentSongIndex(0);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!audioRef.current || songs.length === 0) return;
    audioRe
