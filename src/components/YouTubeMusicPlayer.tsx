"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, SkipBack, SkipForward, Search, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  duration?: string;
}

interface YouTubePlayerProps {
  apiKey?: string;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function YouTubeMusicPlayer({ apiKey }: YouTubePlayerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<YouTubeVideo[]>([]);
  const [currentVideo, setCurrentVideo] = useState<YouTubeVideo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [userApiKey, setUserApiKey] = useState(apiKey || "");
  const [playlist, setPlaylist] = useState<YouTubeVideo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const playerRef = useRef<any>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  // Load YouTube Player API
  useEffect(() => {
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(script);
    }

    window.onYouTubeIframeAPIReady = () => {
      if (playerContainerRef.current && !playerRef.current) {
        playerRef.current = new window.YT.Player(playerContainerRef.current, {
          height: '0',
          width: '0',
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            enablejsapi: 1,
            modestbranding: 1,
            rel: 0
          },
          events: {
            onReady: () => console.log('YouTube player ready'),
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
                setIsLoading(false);
              } else if (event.data === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false);
              } else if (event.data === window.YT.PlayerState.ENDED) {
                nextSong();
              } else if (event.data === window.YT.PlayerState.BUFFERING) {
                setIsLoading(true);
              }
            }
          }
        });
      }
    };
  }, []);

  const searchYouTube = async (query: string) => {
    if (!userApiKey || !query.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=10&maxResults=10&q=${encodeURIComponent(query)}&key=${userApiKey}`
      );
      
      if (!response.ok) throw new Error('Search failed');
      
      const data = await response.json();
      const videos: YouTubeVideo[] = data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url
      }));
      
      setSearchResults(videos);
    } catch (error) {
      console.error('YouTube search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const playVideo = (video: YouTubeVideo) => {
    if (!playerRef.current) return;
    
    setCurrentVideo(video);
    setIsLoading(true);
    playerRef.current.loadVideoById(video.id);
    playerRef.current.playVideo();
    
    // Add to playlist if not already there
    if (!playlist.find(v => v.id === video.id)) {
      setPlaylist(prev => [...prev, video]);
      setCurrentIndex(playlist.length);
    } else {
      setCurrentIndex(playlist.findIndex(v => v.id === video.id));
    }
    
    setShowSearch(false);
  };

  const togglePlay = () => {
    if (!playerRef.current || !currentVideo) return;
    
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const nextSong = useCallback(() => {
    if (playlist.length === 0) return;
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentIndex(nextIndex);
    playVideo(playlist[nextIndex]);
  }, [playlist, currentIndex]);

  const prevSong = () => {
    if (playlist.length === 0) return;
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentIndex(prevIndex);
    playVideo(playlist[prevIndex]);
  };

  // Default songs to search for on load
  useEffect(() => {
    if (userApiKey && searchResults.length === 0) {
      searchYouTube("trending music 2024");
    }
  }, [userApiKey]);

  return (
    <div className="fixed bottom-4 right-4 bg-card/95 backdrop-blur-sm border rounded-lg shadow-lg z-50">
      {/* Hidden YouTube Player */}
      <div ref={playerContainerRef} style={{ display: 'none' }} />
      
      {!userApiKey ? (
        // API Key Input
        <div className="p-4 min-w-80">
          <div className="text-sm font-medium text-foreground mb-2">
            Enter YouTube API Key to play music
          </div>
          <div className="flex gap-2">
            <Input
              type="password"
              placeholder="YouTube Data API v3 Key"
              value={userApiKey}
              onChange={(e) => setUserApiKey(e.target.value)}
              className="text-xs"
            />
            <Button
              size="sm"
              onClick={() => userApiKey && searchYouTube("trending music 2024")}
            >
              Connect
            </Button>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            Get your free API key from Google Cloud Console
          </div>
        </div>
      ) : (
        <div className="min-w-80">
          {/* Current Playing */}
          <div className="p-4 border-b">
            <div className="text-sm font-medium text-foreground mb-2 truncate">
              {currentVideo?.title || "No song selected"}
              {isLoading && <span className="text-xs text-muted-foreground ml-2">(Loading...)</span>}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={prevSong} disabled={playlist.length === 0}>
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={togglePlay} disabled={!currentVideo || isLoading}>
                {isLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                ) : isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              <Button variant="ghost" size="icon" onClick={nextSong} disabled={playlist.length === 0}>
                <SkipForward className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowSearch(!showSearch)}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Search Section */}
          {showSearch && (
            <div className="p-4 border-b">
              <div className="flex gap-2 mb-3">
                <Input
                  placeholder="Search YouTube music..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchYouTube(searchQuery)}
                  className="text-xs"
                />
                <Button 
                  size="sm" 
                  onClick={() => searchYouTube(searchQuery)}
                  disabled={!searchQuery.trim()}
                >
                  <Search className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="max-h-60 overflow-y-auto space-y-2">
                {searchResults.map((video) => (
                  <Card
                    key={video.id}
                    className="p-2 hover:bg-accent/10 cursor-pointer transition-colors"
                    onClick={() => playVideo(video)}
                  >
                    <div className="flex gap-2">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-foreground truncate">
                          {video.title}
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Play className="h-3 w-3" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Current Playlist */}
          {playlist.length > 0 && (
            <div className="p-4">
              <div className="text-xs font-medium text-muted-foreground mb-2">
                Playlist ({playlist.length} songs)
              </div>
              <div className="max-h-40 overflow-y-auto space-y-1">
                {playlist.map((video, index) => (
                  <div
                    key={video.id}
                    className={`text-xs p-2 rounded cursor-pointer transition-colors ${
                      index === currentIndex 
                        ? 'bg-primary/20 text-primary' 
                        : 'hover:bg-accent/10'
                    }`}
                    onClick={() => playVideo(video)}
                  >
                    <div className="truncate">{video.title}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}