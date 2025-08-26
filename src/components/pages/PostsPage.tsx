import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
  category: string;
}

// AI-generated daily posts about editing and film industry
const generateDailyPosts = (): Post[] => {
  const topics = [
    {
      title: "The Rise of AI in Video Editing: What Editors Need to Know",
      content: "Artificial Intelligence is revolutionizing video editing workflows. From automatic color correction to intelligent scene detection, AI tools are becoming essential for modern editors. Today we explore how tools like Adobe's Sensei and DaVinci's neural engine are changing the game.",
      category: "Technology"
    },
    {
      title: "Breaking: Christopher Nolan's Latest Film Uses Revolutionary Editing Technique",
      content: "Christopher Nolan's upcoming project has introduced a groundbreaking editing technique that seamlessly blends practical and digital effects in post-production. Sources close to the production reveal innovative timeline management that could influence future filmmaking.",
      category: "Film Industry"
    },
    {
      title: "Color Grading Secrets: How Marvel Creates Their Signature Look",
      content: "Marvel's distinctive visual style isn't just about VFX - it's in the grade. We break down the color science behind the MCU's iconic look, from the warm oranges of Iron Man to the cosmic purples of the Guardians of the Galaxy.",
      category: "Techniques"
    },
    {
      title: "Cannes 2024: Independent Films Showcase Innovative Editing Styles",
      content: "This year's Cannes Film Festival highlighted several independent films with revolutionary editing approaches. From non-linear storytelling to rhythm-based cutting, emerging filmmakers are pushing creative boundaries.",
      category: "Film Festival"
    },
    {
      title: "The Psychology of Jump Cuts: Why They Work So Well",
      content: "Jump cuts aren't just about saving time - they're about psychology. Discover how this fundamental editing technique manipulates viewer perception and creates emotional impact in everything from YouTube videos to Hollywood blockbusters.",
      category: "Education"
    },
    {
      title: "Behind the Scenes: How 'Dune 2' Achieved Its Epic Sound Design",
      content: "Denis Villeneuve's Dune sequel pushed the boundaries of audio post-production. The film's editor reveals how they layered thousands of sound elements to create the immersive Arrakis experience that captivated audiences worldwide.",
      category: "Sound Design"
    }
  ];

  return topics.map((topic, index) => ({
    id: String(index + 1),
    title: topic.title,
    content: topic.content,
    author: "Aesthetic Editors Team",
    date: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toLocaleDateString(),
    likes: Math.floor(Math.random() * 500) + 100,
    comments: Math.floor(Math.random() * 50) + 10,
    category: topic.category
  }));
};

export const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  useEffect(() => {
    setPosts(generateDailyPosts());
  }, []);

  const handleLike = (postId: string) => {
    const newLikedPosts = new Set(likedPosts);
    if (likedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);

    // Update the like count
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + (likedPosts.has(postId) ? -1 : 1) }
        : post
    ));
  };

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold text-foreground mb-6 animate-slide-in-up">Latest Posts & Updates</h2>
      
      <div className="space-y-6">
        {posts.map((post, index) => (
          <article
            key={post.id}
            className="bg-card rounded-lg p-6 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 animate-slide-in-up border border-border"
            style={{ 
              animationDelay: `${index * 0.1}s`,
              transform: `translateX(${index % 2 === 0 ? '-10px' : '10px'})`,
              animation: `slide-in-up 0.6s ease-out ${index * 0.1}s both`
            }}
          >
            {/* Post Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{post.author}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    {post.date}
                  </div>
                </div>
              </div>
              
              {/* Category Badge */}
              <span className="px-3 py-1 bg-accent/20 text-accent text-sm rounded-full font-medium">
                {post.category}
              </span>
            </div>

            {/* Post Content */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-foreground mb-3 hover:text-accent transition-colors cursor-pointer">
                {post.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {post.content}
              </p>
            </div>

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center space-x-2 transition-all duration-300 group ${
                    likedPosts.has(post.id) 
                      ? 'text-accent' 
                      : 'text-muted-foreground hover:text-accent'
                  }`}
                >
                  <Heart 
                    className={`h-5 w-5 transition-all duration-300 group-hover:scale-110 ${
                      likedPosts.has(post.id) ? 'fill-current' : ''
                    }`} 
                  />
                  <span className="font-medium">{post.likes}</span>
                </button>

                <button className="flex items-center space-x-2 text-muted-foreground hover:text-accent transition-all duration-300 group">
                  <MessageCircle className="h-5 w-5 transition-transform group-hover:scale-110" />
                  <span className="font-medium">{post.comments}</span>
                </button>

                <button className="flex items-center space-x-2 text-muted-foreground hover:text-accent transition-all duration-300 group">
                  <Share2 className="h-5 w-5 transition-transform group-hover:scale-110" />
                  <span className="font-medium">Share</span>
                </button>
              </div>

              <Button 
                variant="ghost" 
                className="text-accent hover:text-accent hover:bg-accent/10 transition-all duration-300"
              >
                Read More
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};