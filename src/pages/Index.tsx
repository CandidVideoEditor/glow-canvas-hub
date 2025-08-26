import { useState } from 'react';
import { Banner } from '@/components/Banner';
import { ChannelInfo } from '@/components/ChannelInfo';
import { Navigation } from '@/components/Navigation';
import { MusicPlayer } from '@/components/MusicPlayer';
import { HomePage } from '@/components/pages/HomePage';
import { VideosPage } from '@/components/pages/VideosPage';
import { ShortsPage } from '@/components/pages/ShortsPage';
import { PlaylistsPage } from '@/components/pages/PlaylistsPage';
import { PostsPage } from '@/components/pages/PostsPage';
import { SongsPage } from '@/components/pages/SongsPage';
import { ProjectsPage } from '@/components/pages/ProjectsPage';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'videos':
        return <VideosPage />;
      case 'shorts':
        return <ShortsPage />;
      case 'playlists':
        return <PlaylistsPage />;
      case 'posts':
        return <PostsPage />;
      case 'songs':
        return <SongsPage />;
      case 'projects':
        return <ProjectsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Floating Music Player */}
      <MusicPlayer />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Banner Section */}
        <Banner />
        
        {/* Channel Info */}
        <ChannelInfo />
        
        {/* Navigation */}
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Page Content */}
        <main className="mt-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
