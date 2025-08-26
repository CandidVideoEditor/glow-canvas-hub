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
  { id: '1', title: 'Kannada Hit Song', language: 'Kannada', url: '/sample-music/kannada.mp3' },
  { id: '2', title: 'Hindi Melody', language: 'Hindi', url: '/sample-music/hindi.mp3' },
  { id: '3', title: 'Telugu Beat', language: 'Telugu', url: '/sample-music/telugu.mp3' },
  { id: '4', title: 'Tamil Classic', language: 'Tamil', url: '/sample-music/tamil.mp3' },
  { id: '5', title: 'Marathi Folk', language: 'Marathi', url: '/sample-music/marathi.mp3' },
  { id: '6', title: 'Malayalam Devotional', language: 'Malayalam', url: '/sample-music/malayalam.mp3' },
  { id: '7', title: 'English Pop', language: 'English', url: '/sample-music/english.mp3' },
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
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Create audio context for better browser support
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            console.log('Playing:', currentSong.title);
          }).catch(() => {
            // If no actual audio file, create a simple beep sound
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A note
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
            
            console.log('Playing simulation for:', currentSong.title);
          });
        }
      }
      setIsPlaying(!isPlaying);
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