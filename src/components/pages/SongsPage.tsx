"use client";

import { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Song {
  id: string;
  title: string;
  url: string;
}

export default function SongsPage() {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    fetch("/api/songs")
      .then((res) => res.json())
      .then(setSongs)
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Songs Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {songs.map((song) => (
          <div key={song.id} className="flex items-center justify-between bg-gray-100 p-4 rounded">
            <p className="font-medium truncate">{song.title}</p>
            <Button variant="ghost" size="icon" onClick={() => new Audio(song.url).play()}>
              <Play />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
