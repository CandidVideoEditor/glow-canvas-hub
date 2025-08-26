import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Song {
  id: string;
  title: string;
  language: string;
  url: string;
}

const sampleSongs: Song[] = [
  { id: '1', title: 'Baarisu Kannada Dimpu Dimpu', language: 'Kannada', url: '' },
  { id: '2', title: 'Tum Hi Aana', language: 'Hindi', url: '' },
  { id: '3', title: 'Samajavaragamana', language: 'Telugu', url: '' },
  { id: '4', title: 'Kannum Kannum Kollaiyadithaal', language: 'Tamil', url: '' },
  { id: '5', title: 'Gulabi Sadi', language: 'Marathi', url: '' },
  { id: '6', title: 'Pranayini Ninakkai', language: 'Malayalam', url: '' },
  { id: '7', title: 'Perfect', language: 'English', url: '' },
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

  const handlePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      // Create audio context to generate actual sound
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Different frequencies for different songs to simulate variety
      const frequencies: Record<string, number> = {
        '1': 523, // C5 - Kannada
        '2': 587, // D5 - Hindi  
        '3': 659, // E5 - Telugu
        '4': 698, // F5 - Tamil
        '5': 784, // G5 - Marathi
        '6': 880, // A5 - Malayalam
        '7': 988, // B5 - English
      };
      
      const frequency = frequencies[currentSong.id] || 440;
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 2);
      
      setIsPlaying(true);
      
      // Auto stop after 2 seconds
      setTimeout(() => {
        setIsPlaying(false);
      }, 2000);
      
      console.log('Playing:', currentSong.title);
    }
  };

  const handleNext = () => {
    const currentIndex = sampleSongs.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % sampleSongs.length;
    setCurrentSong(sampleSongs[nextIndex]);
  };

  const handlePrevious = () => {
    const currentIndex = sampleSongs.findIndex(song => song.id === currentSong.id);
    const prevIndex = currentIndex === 0 ? sampleSongs.length - 1 : currentIndex - 1;
    setCurrentSong(sampleSongs[prevIndex]);
  };

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

  // Generate animated bars for visual effect
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
        <audio ref={audioRef} src={currentSong.url} />
        
        {/* Main Player */}
        <div className="flex items-center space-x-3">
          {/* Song Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {currentSong.title}
            </p>
            <p className="text-xs text-muted-foreground">{currentSong.language}</p>
          </div>

          {/* Music Bars Visualization */}
          <div className="flex items-end space-x-1 h-4">
            {musicBars}
          </div>

          {/* Controls */}
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

        {/* Playlist Dropdown */}
        {showPlaylist && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="max-h-40 overflow-y-auto space-y-1">
              {sampleSongs.map((song) => (
                <button
                  key={song.id}
                  className={cn(
                    "w-full text-left p-2 rounded text-sm transition-colors",
                    "hover:bg-secondary/20",
                    currentSong.id === song.id ? "bg-secondary/30" : ""
                  )}
                  onClick={() => {
                    setCurrentSong(song);
                    setShowPlaylist(false);
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