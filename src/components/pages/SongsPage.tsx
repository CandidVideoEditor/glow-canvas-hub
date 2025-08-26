"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

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
      .then((data: Song[]) => setSongs(data))
      .catch((err) => console.error("Error fetching songs:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Songs Library</h1>
      {songs.length === 0 && <p>No songs available</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {songs.map((song) => (
          <Card key={song.id}>
            <CardContent className="flex items-center justify-between p-4">
              <p className="font-medium">{song.title}</p>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const audio = new Audio(song.url);
                  audio.play();
                }}
              >
                <Play />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
