import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

interface Song {
  id: string;
  title: string;
  url: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const songsDir = path.join(process.cwd(), "public", "Songs");

  try {
    const files = fs.readdirSync(songsDir);
    const songs: Song[] = files
      .filter((file) => /\.(mp3|wav|ogg)$/i.test(file))
      .map((file, index) => ({
        id: `${index + 1}`,
        title: file.replace(/\.(mp3|wav|ogg)$/i, ""),
        url: `/Songs/${file}`,
      }));

    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: "Failed to load songs" });
  }
}
