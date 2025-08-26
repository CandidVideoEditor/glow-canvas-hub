import { useState, useRef, useEffect } from 'react';
import { Upload, Music, Play, Pause, Search, Trash2, Volume2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface Song {
  id: string;
  title: string;
  artist: string;
  language: string;
  duration: string;
  url: string;
  uploadDate: string;
}

const sampleSongs: Song[] = [
  { id: '1', title: 'Baarisu Kannada Dimpu Dimpu', artist: 'Sanjith Hegde', language: 'Kannada', duration: '3:45', url: '', uploadDate: '2024-01-15' },
  { id: '2', title: 'Tum Hi Aana', artist: 'Jubin Nautiyal', language: 'Hindi', duration: '4:12', url: '', uploadDate: '2024-01-14' },
  { id: '3', title: 'Samajavaragamana', artist: 'Sid Sriram', language: 'Telugu', duration: '4:23', url: '', uploadDate: '2024-01-13' },
  { id: '4', title: 'Kannum Kannum Kollaiyadithaal', artist: 'Masala Coffee', language: 'Tamil', duration: '3:56', url: '', uploadDate: '2024-01-12' },
  { id: '5', title: 'Gulabi Sadi', artist: 'Shreya Ghoshal', language: 'Marathi', duration: '4:01', url: '', uploadDate: '2024-01-11' },
  { id: '6', title: 'Pranayini Ninakkai', artist: 'Vineeth Sreenivasan', language: 'Malayalam', duration: '4:34', url: '', uploadDate: '2024-01-10' },
  { id: '7', title: 'Perfect', artist: 'Ed Sheeran', language: 'English', duration: '4:23', url: '', uploadDate: '2024-01-09' },
  { id: '8', title: 'Apna Bana Le', artist: 'Arijit Singh', language: 'Hindi', duration: '3:28', url: '', uploadDate: '2024-01-08' },
];

export const SongsPage = () => {
  const [songs, setSongs] = useState<Song[]>(sampleSongs);
  const [filteredSongs, setFilteredSongs] = useState<Song[]>(sampleSongs);
  const [searchQuery, setSearchQuery] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [pendingFiles, setPendingFiles] = useState<FileList | null>(null);
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter songs based on search query
  useEffect(() => {
    const filtered = songs.filter(song =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.language.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSongs(filtered);
  }, [searchQuery, songs]);

  const handleFileUpload = (uploadedFiles: FileList | null) => {
    if (uploadedFiles) {
      setPendingFiles(uploadedFiles);
      setShowVerification(true);
      // Simulate sending verification code to email
      console.log('Verification code sent to teamaestheticeditors@gmail.com');
    }
  };

  const handleVerification = () => {
    // Simple verification - in real app, this would verify against server
    if (verificationCode === '123456' && pendingFiles) {
      const newSongs: Song[] = Array.from(pendingFiles).map((file, index) => ({
        id: String(Date.now() + index),
        title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
        artist: 'Unknown Artist',
        language: 'Unknown',
        duration: '0:00',
        url: URL.createObjectURL(file),
        uploadDate: new Date().toISOString().split('T')[0],
      }));
      
      setSongs([...newSongs, ...songs]);
      setShowVerification(false);
      setVerificationCode('');
      setPendingFiles(null);
    } else {
      alert('Invalid verification code');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDelete = (songId: string) => {
    setSongs(songs.filter(song => song.id !== songId));
    if (currentPlaying === songId) {
      setCurrentPlaying(null);
    }
  };

  const handlePlay = (songId: string) => {
    if (currentPlaying === songId) {
      setCurrentPlaying(null);
    } else {
      setCurrentPlaying(songId);
      // Create a simple tone since we don't have actual audio files
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Different frequencies for different songs to simulate variety
      const frequencies = [440, 523, 659, 784, 880, 1047, 1175, 1319];
      const frequency = frequencies[parseInt(songId) % frequencies.length] || 440;
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1);
      
      // Auto stop after simulated duration
      setTimeout(() => {
        setCurrentPlaying(null);
      }, 2000);
    }
  };

  return (
    <div className="py-6">
      <div className="flex items-center space-x-3 mb-6">
        <Music className="h-6 w-6 text-accent" />
        <h2 className="text-2xl font-bold text-foreground animate-slide-in-up">Music Library</h2>
      </div>
      
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search songs, artists, or languages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary/50 border-border focus:ring-accent focus:border-accent"
          />
        </div>
      </div>

      {/* Upload Area */}
      <Card 
        className={cn(
          "mb-8 p-8 border-2 border-dashed transition-all duration-300 cursor-pointer animate-slide-in-up",
          dragOver 
            ? 'border-accent bg-accent/5 scale-105' 
            : 'border-border hover:border-accent/50 hover:bg-accent/5'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="text-center">
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-semibold text-foreground mb-2">
            Upload Music Files (Verification Required)
          </p>
          <p className="text-muted-foreground mb-4">
            Drag and drop your MP3, WAV, or other audio files here. A verification code will be sent to teamaestheticeditors@gmail.com
          </p>
          <Button variant="outline" className="hover:bg-accent hover:text-accent-foreground">
            Choose Audio Files
          </Button>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".mp3,.wav,.m4a,.flac,.ogg"
          onChange={(e) => handleFileUpload(e.target.files)}
          className="hidden"
        />
      </Card>

      {/* Songs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSongs.map((song, index) => (
          <Card 
            key={song.id}
            className="p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-slide-in-up group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Song Info */}
            <div className="flex items-start space-x-4 mb-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <Music className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate group-hover:text-accent transition-colors">
                  {song.title}
                </h3>
                <p className="text-sm text-muted-foreground">{song.artist}</p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                  <span className="px-2 py-1 bg-secondary rounded-full">{song.language}</span>
                  <span>{song.duration}</span>
                </div>
              </div>
            </div>

            {/* Song Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePlay(song.id)}
                  className="hover:bg-accent/20 hover:text-accent transition-all duration-300"
                >
                  {currentPlaying === song.id ? (
                    <Pause className="h-4 w-4 mr-2" />
                  ) : (
                    <Play className="h-4 w-4 mr-2" />
                  )}
                  {currentPlaying === song.id ? 'Pause' : 'Play'}
                </Button>
              </div>

              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(song.id)}
                  className="hover:bg-destructive/20 hover:text-destructive transition-all duration-300"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredSongs.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <Music className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">No songs found</p>
          <p className="text-sm text-muted-foreground">Try searching with different keywords</p>
        </div>
      )}

      {songs.length === 0 && (
        <div className="text-center py-12">
          <Music className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">No songs uploaded yet</p>
          <p className="text-sm text-muted-foreground">Upload your first song to get started</p>
        </div>
      )}

      {/* Verification Dialog */}
      <Dialog open={showVerification} onOpenChange={setShowVerification}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Music className="h-5 w-5 text-accent" />
              <span>Song Upload Verification</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              A verification code has been sent to <strong>teamaestheticeditors@gmail.com</strong>. 
              Please enter the code to complete the upload.
            </p>
            <Input
              type="text"
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="text-center tracking-widest"
            />
            <div className="flex space-x-2">
              <Button
                onClick={handleVerification}
                className="flex-1"
                disabled={!verificationCode}
              >
                Verify & Upload
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowVerification(false);
                  setVerificationCode('');
                  setPendingFiles(null);
                }}
              >
                Cancel
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Demo code: 123456
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};