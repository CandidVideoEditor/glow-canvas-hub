export const HomePage = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center relative overflow-hidden">
      {/* Floating Background Dots */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-primary/20 animate-float-dots" />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-accent/20 animate-float-dots" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/3 left-1/2 w-4 h-4 rounded-full bg-primary/15 animate-float-dots" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/2 left-1/5 w-2 h-2 rounded-full bg-accent/15 animate-float-dots" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 rounded-full bg-primary/10 animate-float-dots" style={{ animationDelay: '3s' }} />
      </div>

      {/* Welcome Content */}
      <div className="text-center z-10 relative">
        <h1 className="text-5xl md:text-7xl font-bold text-glow mb-6 animate-slide-in-up">
          Welcome
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground animate-slide-in-up mb-8" style={{ animationDelay: '0.2s' }}>
          to the world of
        </p>
        <div className="text-3xl md:text-5xl font-bold gradient-animated bg-clip-text text-transparent animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
          AESTHETIC EDITING
        </div>
        <p className="text-lg text-muted-foreground mt-6 animate-slide-in-up max-w-2xl mx-auto leading-relaxed" style={{ animationDelay: '0.6s' }}>
          Discover the art of professional video editing with our comprehensive tutorials, 
          cutting-edge techniques, and creative inspiration. Transform your vision into reality.
        </p>
      </div>
    </div>
  );
};