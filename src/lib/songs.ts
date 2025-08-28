interface Song {
  id: string;
  title: string;
  url: string;
}

// Mock songs data based on the actual files in the public/Songs directory
const mockSongs: Song[] = [
  {
    id: "1",
    title: "8 Parche - Baani Sandhu",
    url: "/Songs/8 Parche _ Baani Sandhu _ Gur Sidhu _ Gurneet Dosanjh _ Punjabi Song _ Ishtar Punjabi _punjabisong(MP3_160K).mp3"
  },
  {
    id: "2", 
    title: "ANIMAL - ARJAN VAILLY",
    url: "/Songs/ANIMAL_ ARJAN VAILLY _ Ranbir Kapoor _ Sandeep Vanga _ Bhupinder B_ Manan B _ Bhushan K(MP3_160K).mp3"
  },
  {
    id: "3",
    title: "ANIMAL - HUA MAIN",
    url: "/Songs/ANIMAL_ HUA MAIN (Lyrical Video) _ Ranbir Kapoor_Rashmika M _ Sandeep V _ Raghav_Manoj M _ Bhushan K(MP3_160K).mp3"
  },
  {
    id: "4",
    title: "ANIMAL - SATRANGA",
    url: "/Songs/ANIMAL_ SATRANGA (Lyrical Video) Ranbir K_Rashmika_Sandeep_Arijit_Shreyas_Siddharth-Garima_Bhushan K(MP3_160K).mp3"
  },
  {
    id: "5",
    title: "Aaj Ki Raat - Stree 2",
    url: "/Songs/Aaj Ki Raat _ Stree 2 _ Tamannaah Bhatia _ Sachin-Jigar _ Madhubanti _ Divya _ Amitabh(MP3_160K).mp3"
  },
  {
    id: "6",
    title: "Agar Ho Tum - Mr. Mrs. Mahi",
    url: "/Songs/Agar Ho Tum _ Mr. _ Mrs. Mahi _ Rajkummar Rao_ Janhvi Kapoor _ Tanishk B._ Jubin N._ Kausar M(MP3_160K).mp3"
  },
  {
    id: "7",
    title: "Akhiyaan Gulaab",
    url: "/Songs/Akhiyaan Gulaab (Song)_ Shahid Kapoor_ Kriti Sanon _ Mitraz _ Teri Baaton Mein Aisa Uljha Jiya(MP3_160K).mp3"
  },
  {
    id: "8",
    title: "Arabic Kuthu - Beast",
    url: "/Songs/Arabic Kuthu - Video Song _ Beast _ Thalapathy Vijay _ Pooja Hegde _ Sun Pictures _ Nelson _ Anirudh(MP3_160K).mp3"
  },
  {
    id: "9",
    title: "Besharam Rang - Pathaan",
    url: "/Songs/Besharam Rang Song _ Pathaan _ Shah Rukh Khan_ Deepika Padukone _ Vishal _ Sheykhar _ Shilpa_ Kumaar(MP3_160K).mp3"
  },
  {
    id: "10",
    title: "Chaand Baaliyan - Aditya A",
    url: "/Songs/Chaand Baaliyan – Aditya A. _ Trending Song _ Official Video(MP3_160K).mp3"
  }
];

export const getSongs = (): Promise<Song[]> => {
  return Promise.resolve(mockSongs);
};

export type { Song };