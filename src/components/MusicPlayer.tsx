import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Song {
  id: string;
  title: string;
  language: string;
  url: string;
}

// ✅ Add real MP3 URLs (place songs inside /public/songs folder)
const sampleSongs: Song[] = [
  { id: '1', title: 'Baarisu Kannada Dimpu Dimpu', language: 'Kannada', url: '/songs/baarisu.mp3' },
  { id: '2', title: 'Tum Hi Aana', language: 'Hindi', url: '/songs/tum-hi-aana.mp3' },
  { id: '3', title: 'Samajavaragamana', language: 'Telugu', url: '/songs/samajavaragamana.mp3' },
  { id: '4', title: 'Kannum Kannum Kollaiyadithaal', language: 'Tamil', url: '/songs/kannum.mp3' },
  { id: '5', title: 'Gulabi Sadi', language: 'Marathi', url: '/songs/gulabi-sadi.mp3' },
  { id: '6', title: 'Pranayini Ninakkai', language: 'Malayalam', url: '/songs/pranayini.mp3' },
  { id: '7', title: 'Perfect', language: 'English', url: '/songs/perfect.mp3' },
];

interface MusicPlayerProps {
  className?: string;
}

export const MusicPlayer = ({ className }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(sampleSongs[0]);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  // ✅ Play / Pause handler
  const handlePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("Playback failed:", err));
    }
  };

  // ✅ Go to next song
  const handleNext = () => {
    const currentIndex = sampleSongs.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % sampleSongs.length;
    setCurrentSong(sampleSongs[nextIndex]);
  };

  // ✅ Go to previous song
  const handlePrevious = () => {
    const currentIndex = sampleSongs.findIndex(song => song.id === currentSong.id);
    const prevIndex = currentIndex === 0 ? sampleSongs.length - 1 : currentIndex - 1;
    setCurrentSong(sampleSongs[prevIndex]);
  };

  // ✅ Dragging support
  const handleMouseDown = (e: React.MouseEvent) => {
    if (playerRef.current) {
      const rect = playerRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // ✅ Reset play state when song ends
  useEffect(() => {
    if (!audioRef.current) return;
    const handleEnded = () => {
      setIsPlaying(false);
      handleNext(); // auto-play next song
    };

    audioRef.current.addEventListener("ended", handleEnded);
    return () => {
      audioRef.current?.removeEventListener("ended", handleEnded);
    };
  }, [currentSong]);

  // ✅ Music bars visual effect
  const
