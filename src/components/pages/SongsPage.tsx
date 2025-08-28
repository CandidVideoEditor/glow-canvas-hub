"use client";

import { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Song {
  id: string;
  title: string;
  url: string;
}

export function SongsPage() {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    import("../../lib/songs").then(({ getSongs }) => {
      getSongs().then(setSongs).catch(console.error);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-foreground mb-6">Songs Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {songs.map((song) => (
          <div key={song.id} className="flex items-center justify-between border border-border/50 p-4 rounded-lg bg-card/20 backdrop-blur-sm hover:bg-card/30 transition-colors">
            <p className="font-medium truncate text-foreground">{song.title}</p>
            <Button variant="ghost" size="icon" onClick={() => new Audio(song.url).play()} className="text-primary hover:text-primary/80">
              <Play className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
