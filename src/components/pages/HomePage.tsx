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

// Sample videos for grid display
const sampleVideos: Video[] = [
  {
    id: 'v1',
    title: 'Wedding Cinematography Highlights Reel',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=225&fit=crop',
    duration: '3:45',
    views: '125K',
    likes: '8.2K'
  },
  {
    id: 'v2',
    title: 'Pre-Wedding Romantic Shoot Behind Scenes',
    thumbnail: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=225&fit=crop',
    duration: '5:12',
    views: '89K',
    likes: '6.1K'
  },
  {
    id: 'v3',
    title: 'Traditional Festival Color Grading Tutorial',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=225&fit=crop',
    duration: '8:30',
    views: '156K',
    likes: '12.3K'
  },
  {
    id: 'v4',
    title: 'DaVinci Resolve Advanced Workflow',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=225&fit=crop',
    duration: '15:22',
    views: '203K',
    likes: '15.7K'
  },
  {
    id: 'v5',
    title: 'Cinematic Drone Shots Compilation',
    thumbnail: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=225&fit=crop',
    duration: '4:18',
    views: '78K',
    likes: '5.4K'
  },
  {
    id: 'v6',
    title: 'Music Video Production Breakdown',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop',
    duration: '6:45',
    views: '134K',
    likes: '9.8K'
  },
  {
    id: 'v7',
    title: 'Portrait Photography Lighting Setup',
    thumbnail: 'https://images.unsplash.com/photo-1554048612-b6a482b55fe2?w=400&h=225&fit=crop',
    duration: '7:33',
    views: '92K',
    likes: '7.2K'
  },
  {
    id: 'v8',
    title: 'Film Festival Documentary Preview',
    thumbnail: 'https://images.unsplash.com/photo-1489599273715-0a93b14f0e1a?w=400&h=225&fit=crop',
    duration: '12:15',
    views: '167K',
    likes: '13.5K'
  },
  {
    id: 'v9',
    title: 'Adobe Premiere Pro Quick Tips',
    thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=225&fit=crop',
    duration: '3:28',
    views: '245K',
    likes: '18.9K'
  },
  {
    id: 'v10',
    title: 'Cultural Dance Performance Highlights',
    thumbnail: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400&h=225&fit=crop',
    duration: '5:50',
    views: '189K',
    likes: '14.2K'
  },
  {
    id: 'v11',
    title: 'Time-lapse Photography Techniques',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop',
    duration: '9:12',
    views: '98K',
    likes: '8.1K'
  },
  {
    id: 'v12',
    title: 'Sound Design for Short Films',
    thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=225&fit=crop',
    duration: '11:40',
    views: '156K',
    likes: '11.8K'
  },
  {
    id: 'v13',
    title: 'Event Photography Best Practices',
    thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=225&fit=crop',
    duration: '6:22',
    views: '87K',
    likes: '6.9K'
  },
  {
    id: 'v14',
    title: 'Smartphone Filmmaking Masterclass',
    thumbnail: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=400&h=225&fit=crop',
    duration: '14:18',
    views: '278K',
    likes: '22.1K'
  },
  {
    id: 'v15',
    title: 'Fashion Shoot Behind the Scenes',
    thumbnail: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=225&fit=crop',
    duration: '4:55',
    views: '123K',
    likes: '9.4K'
  },
  {
    id: 'v16',
    title: 'Visual Effects Breakdown Tutorial',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=225&fit=crop',
    duration: '16:45',
    views: '324K',
    likes: '28.7K'
  },
  {
    id: 'v17',
    title: 'Corporate Video Production Guide',
    thumbnail: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=225&fit=crop',
    duration: '8:15',
    views: '145K',
    likes: '10.3K'
  },
  {
    id: 'v18',
    title: 'Animation Principles for Beginners',
    thumbnail: 'https://images.unsplash.com/photo-1551617289-bc2b4c88e6a4?w=400&h=225&fit=crop',
    duration: '12:30',
    views: '198K',
    likes: '16.5K'
  },
  {
    id: 'v19',
    title: 'Live Streaming Setup Tutorial',
    thumbnail: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=400&h=225&fit=crop',
    duration: '7:08',
    views: '267K',
    likes: '19.8K'
  },
  {
    id: 'v20',
    title: 'Product Photography Tips & Tricks',
    thumbnail: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=225&fit=crop',
    duration: '5:35',
    views: '89K',
    likes: '7.6K'
  },
  {
    id: 'v21',
    title: 'Concert Videography Equipment Review',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop',
    duration: '10:22',
    views: '167K',
    likes: '12.9K'
  },
  {
    id: 'v22',
    title: 'Cinematic Color Grading Workshop',
    thumbnail: 'https://images.unsplash.com/photo-1478720568477-b2709d01a3b6?w=400&h=225&fit=crop',
    duration: '18:45',
    views: '234K',
    likes: '21.3K'
  },
  {
    id: 'v23',
    title: 'Documentary Storytelling Techniques',
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=225&fit=crop',
    duration: '13:20',
    views: '178K',
    likes: '14.7K'
  },
  {
    id: 'v24',
    title: 'Travel Vlog Editing Workflow',
    thumbnail: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=225&fit=crop',
    duration: '9:40',
    views: '298K',
    likes: '24.1K'
  },
  {
    id: 'v25',
    title: 'Green Screen Compositing Tutorial',
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=225&fit=crop',
    duration: '11:15',
    views: '145K',
    likes: '11.2K'
  },
  {
    id: 'v26',
    title: 'Podcast Video Recording Setup',
    thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=225&fit=crop',
    duration: '6:50',
    views: '187K',
    likes: '13.8K'
  },
  {
    id: 'v27',
    title: 'Aerial Photography Composition',
    thumbnail: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=225&fit=crop',
    duration: '8:25',
    views: '156K',
    likes: '12.4K'
  },
  {
    id: 'v28',
    title: 'Client Presentation Best Practices',
    thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=225&fit=crop',
    duration: '7:18',
    views: '134K',
    likes: '9.7K'
  },
  {
    id: 'v29',
    title: 'Mobile Video Editing Apps Review',
    thumbnail: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=400&h=225&fit=crop',
    duration: '12:55',
    views: '289K',
    likes: '23.5K'
  },
  {
    id: 'v30',
    title: 'YouTube Creator Economy 2024',
    thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=225&fit=crop',
    duration: '15:30',
    views: '356K',
    likes: '31.2K'
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
  "/lovable-uploads/bdce9e31-ab38-499c-90af-bf7066abb058.png",
  "/lovable-uploads/160eac40-47ff-44f8-9bfc-f37cafb2ea82.png",
  "/lovable-uploads/01e7262b-abe0-4a2f-a6e2-d9f8d226405a.png",
  "/lovable-uploads/8adfac0a-1627-471f-87c4-c2d45bc8c6db.png",
  "/lovable-uploads/c1e5393a-29d7-4c04-8d4b-52663a1d8391.png",
  "/lovable-uploads/f9ec857d-eb5e-4d79-8a4f-e0bf91190df5.png",
  "/lovable-uploads/89b04b2e-f9d0-47a6-952d-e3f14a5c9d56.png",
  "/lovable-uploads/c44f4ab6-d61c-4882-869a-82e749b1f67a.png",
  "/lovable-uploads/6fe78a3d-344d-469f-aff3-7d4585b600f7.png",
  "/lovable-uploads/37136bf8-20c0-497c-a958-110fe6313637.png"
];

const preweddingImages = [
  "/lovable-uploads/bc6ad7b1-9f52-4c5f-9690-3b99ca89bc9e.png",
  "/api/placeholder/320/192",
  "/api/placeholder/320/192",
  "/api/placeholder/320/192",
  "/api/placeholder/320/192",
  "/api/placeholder/320/192"
];

const festivalImages = [
  "/lovable-uploads/683f72c7-9633-4368-a06e-c93ef963b02f.png",
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
      <div className="space-y-0">
        <ScrollingImageSection 
          title="" 
          images={weddingImages} 
          speed={80} 
          direction="left" 
        />
        <ScrollingImageSection 
          title="" 
          images={preweddingImages} 
          speed={90} 
          direction="right" 
        />
        <ScrollingImageSection 
          title="" 
          images={festivalImages} 
          speed={100}
          direction="left" 
        />
      </div>

      {/* Featured Videos Grid */}
      <div className="animate-slide-in-up">
        <h2 className="text-2xl font-bold text-foreground mb-6">Featured Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {sampleVideos.map((video) => (
            <Card 
              key={video.id}
              className="overflow-hidden bg-card hover:bg-accent/5 transition-all duration-300 hover:scale-105 group cursor-pointer"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-accent/20 to-primary/20 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.style.display = 'flex';
                    target.parentElement!.style.alignItems = 'center';
                    target.parentElement!.style.justifyContent = 'center';
                  }}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Play className="h-8 w-8 text-white" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>
              
              {/* Video Info */}
              <div className="p-3">
                <h3 className="font-medium text-foreground group-hover:text-accent transition-colors duration-300 line-clamp-2 mb-2 text-sm">
                  {video.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
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
      </div>

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