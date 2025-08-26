import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const songsDir = path.join(process.cwd(), "public/songs");

  try {
    const files = fs.readdirSync(songsDir);

    // Filter only .mp3 files (you can extend this to wav, etc.)
    const songs = files
      .filter(file => file.endsWith(".mp3"))
      .map((file, index) => ({
        id: `${index + 1}`,
        title: file.replace(/\.mp3$/, ""), // filename without extension
        language: "Unknown", // you can add logic to detect language
        url: `/songs/${file}`,
      }));

    res.status(200).json(songs);
  } catch (err) {
    res.status(500).json({ error: "Could not load songs" });
  }
}
