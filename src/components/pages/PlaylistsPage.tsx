import { useState } from 'react';
import { Play, Clock, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Playlist {
  id: string;
  title: string;
  thumbnail: string;
  videoCount: number;
  totalDuration: string;
  description: string;
}

const samplePlaylists: Playlist[] = [
  {
    id: '1',
    title: 'Complete DaVinci Resolve Masterclass',
    thumbnail: 'https://images.unsplash.com/photo-1516841273335-e39b37888115?w=400&h=225&fit=crop',
    videoCount: 24,
    totalDuration: '8h 45m',
    description: 'Learn professional video editing from basics to advanced techniques in DaVinci Resolve.'
  },
  {
    id: '2',
    title: 'After Effects Motion Graphics Series',
    thumbnail: 'https://images.unsplash.com/photo-1551651088-d8fa90c71c33?w=400&h=225&fit=crop',
    videoCount: 18,
    totalDuration: '6h 32m',
    description: 'Master motion graphics and visual effects with comprehensive After Effects tutorials.'
  },
  {
    id: '3',
    title: 'Premiere Pro Quick Tips',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=225&fit=crop',
    videoCount: 35,
    totalDuration: '4h 18m',
    description: 'Short and efficient tutorials to improve your Premiere Pro workflow.'
  },
  {
    id: '4',
    title: 'Color Grading Fundamentals',
    thumbnail: 'https://images.unsplash.com/photo-1489844097929-c8d5b91c456e?w=400&h=225&fit=crop',
    videoCount: 12,
    totalDuration: '3h 56m',
    description: 'Professional color grading techniques for cinematic video production.'
  },
  {
    id: '5',
    title: 'Audio Production for Video',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop',
    videoCount: 15,
    totalDuration: '5h 12m',
    description: 'Complete guide to audio editing, mixing, and sound design for video content.'
  },
  {
    id: '6',
    title: 'Mobile Video Editing',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop',
    videoCount: 22,
    totalDuration: '3h 28m',
    description: 'Professional editing techniques using mobile apps and smartphones.'
  }
];

export const PlaylistsPage = () => {
  const [hoveredPlaylist, setHoveredPlaylist] = useState<string | null>(null);

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold text-foreground mb-6 animate-slide-in-up">Learning Playlists</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {samplePlaylists.map((playlist, index) => (
          <div
            key={playlist.id}
            className="bg-card rounded-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 animate-slide-in-up group"
            style={{ 
              animationDelay: `${index * 0.1}s`,
              transform: hoveredPlaylist === playlist.id ? 'rotateY(2deg)' : 'rotateY(0deg)',
              transformStyle: 'preserve-3d'
            }}
            onMouseEnter={() => setHoveredPlaylist(playlist.id)}
            onMouseLeave={() => setHoveredPlaylist(null)}
          >
            {/* Thumbnail */}
            <div className="relative overflow-hidden">
              <img
                src={playlist.thumbnail}
                alt={playlist.title}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Video Count Badge */}
              <div className="absolute top-2 right-2 bg-black/80 text-white text-sm px-3 py-1 rounded-full flex items-center">
                <Video className="h-4 w-4 mr-1" />
                {playlist.videoCount}
              </div>
              
              {/* Duration Badge */}
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-sm px-3 py-1 rounded-full flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {playlist.totalDuration}
              </div>
              
              {/* Play Button Overlay */}
              <div className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-all duration-300 ${
                hoveredPlaylist === playlist.id ? 'opacity-100' : 'opacity-0'
              }`}>
                <Button
                  variant="ghost"
                  className="bg-accent/90 hover:bg-accent backdrop-blur-sm rounded-full p-4 transition-all duration-300 hover:scale-110"
                >
                  <Play className="h-8 w-8 text-white" fill="white" />
                </Button>
              </div>
            </div>

            {/* Playlist Info */}
            <div className="p-5">
              <h3 className="font-bold text-foreground mb-2 text-lg hover:text-accent transition-colors cursor-pointer line-clamp-1">
                {playlist.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                {playlist.description}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Video className="h-4 w-4 mr-1" />
                  {playlist.videoCount} videos
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {playlist.totalDuration}
                </span>
              </div>

              {/* Play Button */}
              <Button 
                className="w-full mt-4 bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all duration-300 hover:shadow-lg"
                variant="secondary"
              >
                <Play className="h-4 w-4 mr-2" />
                Start Playlist
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};