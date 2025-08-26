import { useState } from 'react';
import { Play, Heart, MessageCircle, Share2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Short {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  likes: string;
  comments: string;
}

const sampleShorts: Short[] = [
  {
    id: '1',
    title: '30-Second Color Correction Magic ✨',
    thumbnail: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=300&h=533&fit=crop',
    views: '1.2M',
    likes: '89K',
    comments: '2.1K'
  },
  {
    id: '2',
    title: 'Quick Transition Tutorial 🎬',
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=533&fit=crop',
    views: '856K',
    likes: '67K',
    comments: '1.8K'
  },
  {
    id: '3',
    title: 'Text Animation in 60 Seconds 📝',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=533&fit=crop',
    views: '743K',
    likes: '52K',
    comments: '980'
  },
  {
    id: '4',
    title: 'Phone Editing vs Pro Software 📱💻',
    thumbnail: 'https://images.unsplash.com/photo-1551651088-d8fa90c71c33?w=300&h=533&fit=crop',
    views: '2.1M',
    likes: '156K',
    comments: '4.2K'
  },
  {
    id: '5',
    title: 'Speed Ramping Effect Tutorial ⚡',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=300&h=533&fit=crop',
    views: '1.8M',
    likes: '134K',
    comments: '3.5K'
  },
  {
    id: '6',
    title: 'Audio Sync Tricks for Editors 🎵',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=533&fit=crop',
    views: '612K',
    likes: '41K',
    comments: '756'
  }
];

export const ShortsPage = () => {
  const [hoveredShort, setHoveredShort] = useState<string | null>(null);

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold text-foreground mb-6 animate-slide-in-up">Quick Editing Tips</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {sampleShorts.map((short, index) => (
          <div
            key={short.id}
            className="bg-card rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg animate-slide-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
            onMouseEnter={() => setHoveredShort(short.id)}
            onMouseLeave={() => setHoveredShort(null)}
          >
            {/* Thumbnail */}
            <div className="relative group aspect-[9/16]">
              <img
                src={short.thumbnail}
                alt={short.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Play Button Overlay */}
              <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${
                hoveredShort === short.id ? 'opacity-100' : 'opacity-0'
              }`}>
                <Button
                  variant="ghost"
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3"
                >
                  <Play className="h-6 w-6 text-white" fill="white" />
                </Button>
              </div>

              {/* Views Badge */}
              <div className="absolute bottom-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center">
                <Eye className="h-3 w-3 mr-1" />
                {short.views}
              </div>
            </div>

            {/* Short Info */}
            <div className="p-3">
              <h3 className="font-medium text-foreground text-sm mb-2 line-clamp-2 hover:text-accent transition-colors cursor-pointer">
                {short.title}
              </h3>

              {/* Engagement Stats */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <span className="flex items-center">
                    <Heart className="h-3 w-3 mr-1" />
                    {short.likes}
                  </span>
                  <span className="flex items-center">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    {short.comments}
                  </span>
                </div>
                
                <button className="p-1 hover:text-accent transition-colors">
                  <Share2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};