import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Play, Clock, Eye, ThumbsUp } from 'lucide-react';
import { ScrollingImageSection } from '@/components/ScrollingImageSection';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  likes: string;
}

interface Playlist {
  id: string;
  title: string;
  videos: Video[];
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
}

const samplePlaylists: Playlist[] = [
  {
    id: '1',
    title: 'Color Grading Masterclass',
    videos: [
      {
        id: '1',
        title: 'Color Theory Basics for Video Editing',
        thumbnail: '/sample-thumbnails/color-theory.jpg',
        duration: '12:45',
        views: '45K',
        likes: '2.1K'
      },
      {
        id: '2',
        title: 'Advanced LUT Creation Techniques',
        thumbnail: '/sample-thumbnails/lut-creation.jpg',
        duration: '18:32',
        views: '32K',
        likes: '1.8K'
      },
      {
        id: '3',
        title: 'DaVinci Resolve Color Grading Workflow',
        thumbnail: '/sample-thumbnails/davinci-workflow.jpg',
        duration: '25:17',
        views: '67K',
        likes: '3.4K'
      }
    ]
  },
  {
    id: '2',
    title: 'Motion Graphics Essentials',
    videos: [
      {
        id: '4',
        title: 'After Effects Animation Principles',
        thumbnail: '/sample-thumbnails/ae-animation.jpg',
        duration: '15:23',
        views: '28K',
        likes: '1.5K'
      },
      {
        id: '5',
        title: 'Creating Dynamic Text Animations',
        thumbnail: '/sample-thumbnails/text-animation.jpg',
        duration: '20:11',
        views: '41K',
        likes: '2.3K'
      }
    ]
  },
  {
    id: '3',
    title: 'Audio Design & Mixing',
    videos: [
      {
        id: '6',
        title: 'Professional Audio Mixing in Premiere Pro',
        thumbnail: '/sample-thumbnails/audio-mixing.jpg',
        duration: '22:45',
        views: '35K',
        likes: '1.9K'
      },
      {
        id: '7',
        title: 'Sound Design for Cinematic Videos',
        thumbnail: '/sample-thumbnails/sound-design.jpg',
        duration: '17:38',
        views: '29K',
        likes: '1.6K'
      }
    ]
  }
];

const blogPosts: { [key: string]: BlogPost[] } = {
  filmyBeats: [
    {
      id: '1',
      title: 'Upcoming South Indian Movies to Watch in 2024',
      excerpt: 'From epic historical dramas to cutting-edge sci-fi, discover the most anticipated releases...',
      date: '2024-01-20',
      category: 'Film News',
      readTime: '5 min'
    },
    {
      id: '2', 
      title: 'Behind the Scenes: How RRR Changed Visual Effects Forever',
      excerpt: 'An in-depth look at the groundbreaking VFX techniques used in SS Rajamouli\'s masterpiece...',
      date: '2024-01-19',
      category: 'Technology',
      readTime: '8 min'
    }
  ],
  editing: [
    {
      id: '3',
      title: 'The Art of Invisible Cuts: Mastering Seamless Transitions',
      excerpt: 'Learn professional techniques to create smooth, unnoticeable cuts that keep viewers engaged...',
      date: '2024-01-18',
      category: 'Editing Tips',
      readTime: '6 min'
    },
    {
      id: '4',
      title: 'Color Psychology in Film: How to Evoke Emotions Through Grading',
      excerpt: 'Understand how different color palettes influence viewer emotions and storytelling...',
      date: '2024-01-17',
      category: 'Color Grading',
      readTime: '7 min'
    }
  ],
  aiInnovation: [
    {
      id: '5',
      title: 'AI-Powered Video Enhancement: The Future is Here',
      excerpt: 'Explore how artificial intelligence is revolutionizing video upscaling and restoration...',
      date: '2024-01-16',
      category: 'AI Technology',
      readTime: '9 min'
    },
    {
      id: '6',
      title: 'Machine Learning in Content Creation: Automated Editing Tools',
      excerpt: 'Discover the latest AI tools that are transforming the editing workflow for creators...',
      date: '2024-01-15',
      category: 'Innovation',
      readTime: '10 min'
    }
  ],
  cameraGraphics: [
    {
      id: '7',
      title: 'Camera Movement Techniques That Create Cinema Magic',
      excerpt: 'Master professional camera movements to elevate your video storytelling...',
      date: '2024-01-14',
      category: 'Cinematography',
      readTime: '8 min'
    },
    {
      id: '8',
      title: 'Latest Graphics Cards for Video Editing: 2024 Performance Guide',
      excerpt: 'Complete comparison of the best GPUs for professional video editing workflows...',
      date: '2024-01-13',
      category: 'Hardware',
      readTime: '12 min'
    }
  ]
};

// Sample image URLs for scrolling sections
const weddingImages = [
  "/api/placeholder/320/192",
  "/api/placeholder/320/192", 
  "/api/placeholder/320/192",
  "/api/placeholder/320/192",
  "/api/placeholder/320/192",
  "/api/placeholder/320/192"
];

const preweddingImages = [
  "/api/placeholder/320/192",
  "/api/placeholder/320/192",
  "/api/placeholder/320/192", 
  "/api/placeholder/320/192",
  "/api/placeholder/320/192",
  "/api/placeholder/320/192"
];

const festivalImages = [
  "/api/placeholder/320/192",
  "/api/placeholder/320/192",
  "/api/placeholder/320/192",
  "/api/placeholder/320/192", 
  "/api/placeholder/320/192",
  "/api/placeholder/320/192"
];

export const HomePage = () => {
  return (
    <div className="py-6 space-y-12">
      {/* Scrolling Image Sections */}
      <ScrollingImageSection 
        title="Wedding Photography" 
        images={weddingImages} 
        speed={30} 
        direction="left" 
      />
      <ScrollingImageSection 
        title="Pre-Wedding Shoots" 
        images={preweddingImages} 
        speed={25} 
        direction="right" 
      />
      <ScrollingImageSection 
        title="State Level Festivals" 
        images={festivalImages} 
        speed={35} 
        direction="left" 
      />

      {/* Playlists Section */}
      {samplePlaylists.map((playlist, playlistIndex) => (
        <div key={playlist.id} className="animate-slide-in-up" style={{ animationDelay: `${playlistIndex * 0.1}s` }}>
          <h2 className="text-2xl font-bold text-foreground mb-6">{playlist.title}</h2>
          <ScrollArea className="w-full">
            <div className="flex space-x-6 pb-4">
              {playlist.videos.map((video, videoIndex) => (
                <Card 
                  key={video.id}
                  className="flex-shrink-0 w-80 overflow-hidden bg-card hover:bg-accent/5 transition-all duration-300 hover:scale-105 group cursor-pointer"
                >
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                    <Play className="h-12 w-12 text-foreground/70 group-hover:text-accent transition-colors duration-300" />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  
                  {/* Video Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors duration-300 line-clamp-2 mb-2">
                      {video.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{video.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="h-3 w-3" />
                        <span>{video.likes}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      ))}

      {/* Blog Sections */}
      <BlogSection title="Filmy Beats News" posts={blogPosts.filmyBeats} />
      <BlogSection title="Editing Techniques" posts={blogPosts.editing} />
      <BlogSection title="AI Innovation" posts={blogPosts.aiInnovation} />
      <BlogSection title="Camera & Graphics" posts={blogPosts.cameraGraphics} />
    </div>
  );
};

const BlogSection = ({ title, posts }: { title: string; posts: BlogPost[] }) => (
  <div className="animate-slide-in-up">
    <h2 className="text-2xl font-bold text-foreground mb-6">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.map((post) => (
        <Card key={post.id} className="p-6 hover:bg-accent/5 transition-all duration-300 hover:scale-105 cursor-pointer group">
          <div className="flex items-start justify-between mb-3">
            <span className="text-xs text-accent font-medium bg-accent/10 px-2 py-1 rounded">
              {post.category}
            </span>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{post.readTime}</span>
            </div>
          </div>
          <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors duration-300 mb-2">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="text-xs text-muted-foreground">
            {new Date(post.date).toLocaleDateString()}
          </div>
        </Card>
      ))}
    </div>
  </div>
);