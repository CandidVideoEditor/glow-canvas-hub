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

interface MusicPlayerProps {
  className?: string;
}

export const MusicPlayer = ({ className }: MusicPlayerProps) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  // Fetch songs dynamically
  useEffect(() => {
    fetch("/api/songs")
      .then(res => res.json())
      .then((data: Song[]) => {
        setSongs(data);
        if (data.length > 0) setCurrentSong(data[0]);
      });
  }, []);

  const handlePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (!currentSong || songs.length === 0) return;
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
  };

  const handlePrevious = () => {
    if (!currentSong || songs.length === 0) return;
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    setCurrentSong(songs[prevIndex]);
  };

  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    audioRef.current.pause();
    audioRef.current.load();
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentSong]);

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    const onEnded = () => handleNext();
    audio.addEventListener("ended", onEnded);

    return () => audio.removeEventListener("ended", onEnded);
  }, [currentSong]);

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

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const musicBars = Array.from({ length: 5 }, (_, i) => (
    <div
      key={i}
      className={cn(
        "w-1 bg-accent rounded-full transition-all duration-200",
        isPlaying ? "animate-music-bars" : "h-1"
      )}
      style={{
        animationDelay: `${i * 0.1}s`,
        height: isPlaying ? '8px' : '2px'
      }}
    />
  ));

  return (
    <>
      <div
        ref={playerRef}
        className={cn(
          "fixed z-50 glass-effect rounded-lg p-3 select-none cursor-move",
          "min-w-[280px] transition-all duration-300",
          isDragging ? "scale-105" : "scale-100",
          className
        )}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        onMouseDown={handleMouseDown}
      >
        <audio ref={audioRef} src={currentSong?.url || ""} />

        {/* Main Player */}
        {currentSong && (
          <div className="flex items-center space-x-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {currentSong.title}
              </p>
              <p className="text-xs text-muted-foreground">{currentSong.language}</p>
            </div>

            <div className="flex items-end space-x-1 h-4">
              {musicBars}
            </div>

            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-secondary/20"
                onClick={handlePrevious}
              >
                <SkipBack className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-secondary/20"
                onClick={handlePlay}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-secondary/20"
                onClick={handleNext}
              >
                <SkipForward className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-secondary/20"
                onClick={() => setShowPlaylist(!showPlaylist)}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {showPlaylist && songs.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="max-h-40 overflow-y-auto space-y-1">
              {songs.map((song) => (
                <button
                  key={song.id}
                  className={cn(
                    "w-full text-left p-2 rounded text-sm transition-colors",
                    "hover:bg-secondary/20",
                    currentSong?.id === song.id ? "bg-secondary/30" : ""
                  )}
                  onClick={() => {
                    setCurrentSong(song);
                    setShowPlaylist(false);
                    setIsPlaying(true);
                  }}
                >
                  <div className="font-medium truncate">{song.title}</div>
                  <div className="text-xs text-muted-foreground">{song.language}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
