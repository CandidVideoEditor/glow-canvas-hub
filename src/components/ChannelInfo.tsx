import { useState, useEffect } from 'react';
import { Mail, Instagram, Facebook, MessageCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import profilePhoto from '@/assets/profile-photo.jpg';

export const ChannelInfo = () => {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 p-6 bg-card rounded-lg">
      {/* Left Side - Profile & Channel Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 flex-1">
        {/* Profile Photo */}
        <div className="relative">
          <img
            src={profilePhoto}
            alt="Aesthetic Editors Profile"
            className="w-24 h-24 rounded-full object-cover ring-2 ring-border"
          />
        </div>

        {/* Channel Details */}
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-foreground mb-1">AESTHETIC EDITORS</h2>
          <p className="text-muted-foreground mb-2">@aesthetic.editors • 1.2M subscribers</p>
          <p className="text-sm text-foreground/80 mb-3 max-w-md">
            Professional video editing tutorials, effects, and creative content. 
            Transform your videos into cinematic masterpieces.
          </p>

          {/* Social Media Links */}
          <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
            <a
              href="mailto:teamaestheticeditors@gmail.com"
              className="p-2 rounded-full bg-secondary/20 hover:bg-secondary/40 transition-all duration-300 hover:scale-110"
              title="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/aesthetic.editors"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-secondary/20 hover:bg-secondary/40 transition-all duration-300 hover:scale-110"
              title="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61579943097663"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-secondary/20 hover:bg-secondary/40 transition-all duration-300 hover:scale-110"
              title="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://whatsapp.com/channel/0029VakvwsnKQuJQmsvADE3G"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-secondary/20 hover:bg-secondary/40 transition-all duration-300 hover:scale-110"
              title="WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>

          {/* Subscribe Button */}
          <a
            href="https://www.youtube.com/@aesthetic.editors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/25">
              Subscribe
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>

      {/* Right Side - Clock & Tagline */}
      <div className="text-center lg:text-right">
        <DigitalClock />
        <div className="mt-2">
          <TypewriterText text="your good time starts now" />
        </div>
      </div>
    </div>
  );
};

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="text-3xl md:text-4xl font-bold text-glow font-mono">
      {formatTime(time)}
    </div>
  );
};

const TypewriterText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const typeTimer = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeTimer);
        // Hide cursor after typing is complete
        setTimeout(() => setShowCursor(false), 2000);
      }
    }, 100);

    return () => clearInterval(typeTimer);
  }, [text]);

  return (
    <div className="text-sm text-muted-foreground font-medium">
      {displayText}
      {showCursor && <span className="animate-pulse">|</span>}
    </div>
  );
};