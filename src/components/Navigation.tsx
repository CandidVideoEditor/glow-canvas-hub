import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'home', label: 'Home' },
  { id: 'videos', label: 'Videos' },
  { id: 'shorts', label: 'Shorts' },
  { id: 'playlists', label: 'Playlists' },
  { id: 'posts', label: 'Posts' },
  { id: 'songs', label: 'Songs' },
  { id: 'projects', label: 'Projects' },
];

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Implement search functionality here
    }
  };

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-40 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-300 relative",
                activeTab === tab.id
                  ? "text-foreground bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Search Section */}
        <div className="flex items-center">
          {showSearch ? (
            <form onSubmit={handleSearch} className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 h-9 bg-secondary/50 border-border focus:ring-accent focus:border-accent"
                autoFocus
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery('');
                }}
                className="h-9 w-9 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </form>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSearch(true)}
              className="h-9 w-9 p-0 hover:bg-secondary/50 transition-all duration-300 hover:scale-110"
            >
              <Search className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};