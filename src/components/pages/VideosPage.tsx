import { useState } from 'react';
import { Play, Heart, Share2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  likes: string;
  uploadTime: string;
  duration: string;
}

const sampleVideos: Video[] = [
  {
    id: '1',
    title: 'Advanced Color Grading Techniques in DaVinci Resolve',
    thumbnail: 'https://images.unsplash.com/photo-1516841273335-e39b37888115?w=400&h=225&fit=crop',
    views: '248K',
    likes: '12K',
    uploadTime: '2 days ago',
    duration: '15:42'
  },
  {
    id: '2', 
    title: 'Creating Cinematic Transitions in After Effects',
    thumbnail: 'https://images.unsplash.com/photo-1551651088-d8fa90c71c33?w=400&h=225&fit=crop',
    views: '156K',
    likes: '8.2K',
    uploadTime: '5 days ago',
    duration: '12:18'
  },
  {
    id: '3',
    title: 'Professional Audio Mixing for Video Editors',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop',
    views: '89K',
    likes: '4.1K',
    uploadTime: '1 week ago',
    duration: '20:35'
  },
  {
    id: '4',
    title: 'Motion Graphics Masterclass - Typography Animation',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop',
    views: '203K',
    likes: '15K',
    uploadTime: '2 weeks ago',
    duration: '18:27'
  },
  {
    id: '5',
    title: 'Speed Ramping and Time Remapping Secrets',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=225&fit=crop',
    views: '331K',
    likes: '22K',
    uploadTime: '3 weeks ago',
    duration: '14:52'
  },
  {
    id: '6',
    title: 'Green Screen Compositing Like a Pro',
    thumbnail: 'https://images.unsplash.com/photo-1489844097929-c8d5b91c456e?w=400&h=225&fit=crop',
    views: '127K',
    likes: '7.8K',
    uploadTime: '1 month ago',
    duration: '16:43'
  }
];

export const VideosPage = () => {
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold text-foreground mb-6 animate-slide-in-up">Latest Videos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleVideos.map((video, index) => (
          <div
            key={video.id}
            className="bg-card rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 animate-slide-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
            onMouseEnter={() => setHoveredVideo(video.id)}
            onMouseLeave={() => setHoveredVideo(null)}
          >
            {/* Thumbnail */}
            <div className="relative group">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Duration Badge */}
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
              
              {/* Play Button Overlay */}
              <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${
                hoveredVideo === video.id ? 'opacity-100' : 'opacity-0'
              }`}>
                <Button
                  variant="ghost"
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4"
                >
                  <Play className="h-8 w-8 text-white" fill="white" />
                </Button>
              </div>
            </div>

            {/* Video Info */}
            <div className="p-4">
              <h3 className="font-semibold text-foreground mb-2 line-clamp-2 hover:text-accent transition-colors cursor-pointer">
                {video.title}
              </h3>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                <span className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {video.views} views
                </span>
                <span>{video.uploadTime}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-muted-foreground hover:text-accent transition-colors group">
                  <Heart className="h-4 w-4 transition-transform group-hover:scale-110" />
                  <span className="text-sm">{video.likes}</span>
                </button>
                
                <button className="flex items-center space-x-1 text-muted-foreground hover:text-accent transition-colors group">
                  <Share2 className="h-4 w-4 transition-transform group-hover:scale-110" />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};