interface Song {
  id: string;
  title: string;
  url: string;
}

// Complete songs data based on the actual files in the public/Songs directory
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
    title: "ANIMAL - SATRANGA (Lyrical)",
    url: "/Songs/ANIMAL_ SATRANGA (Lyrical Video) Ranbir K_Rashmika_Sandeep_Arijit_Shreyas_Siddharth-Garima_Bhushan K(MP3_160K).mp3"
  },
  {
    id: "5",
    title: "ANIMAL - SATRANGA (Song)",
    url: "/Songs/ANIMAL_ SATRANGA(Song) Ranbir Kapoor_Rashmika_Sandeep V_Arijit_Shreyas P_Siddharth-Garima _Bhushan K(MP3_160K).mp3"
  },
  {
    id: "6",
    title: "ANIMAL - Saari Duniya Jalaa Denge",
    url: "/Songs/ANIMAL_ Saari Duniya Jalaa Denge (Film Version) Ranbir K_ Bobby D_ Sandeep_ B Praak_Jaani_ Bhushan K(MP3_160K).mp3"
  },
  {
    id: "7",
    title: "ANIMAL - PEHLE BHI MAIN",
    url: "/Songs/ANIMAL_PEHLE BHI MAIN(Lyrical) _ Ranbir Kapoor_Tripti Dimri _ Sandeep V _ Vishal M_Raj S _ Bhushan K(MP3_160K).mp3"
  },
  {
    id: "8",
    title: "Aadi Baa Magane Bheema",
    url: "/Songs/Aadi Baa Magane Bheema _ Vijaya Kumar _ Charan Raj _ Krishna Sarthak _ Jagadeesh Gowda(MP3_160K).mp3"
  },
  {
    id: "9",
    title: "Aaj Ki Raat - Stree 2",
    url: "/Songs/Aaj Ki Raat _ Stree 2 _ Tamannaah Bhatia _ Sachin-Jigar _ Madhubanti _ Divya _ Amitabh(MP3_160K).mp3"
  },
  {
    id: "10",
    title: "Aap Ki Nazron Ne Samjha - Jhankar",
    url: "/Songs/Aap Ki Nazron Ne Samjha Jhankar Beats _ Namita Choudhary _ Jhankar Beats Song(MP3_160K).mp3"
  },
  {
    id: "11",
    title: "Agar Ho Tum - Mr. Mrs. Mahi",
    url: "/Songs/Agar Ho Tum _ Mr. _ Mrs. Mahi _ Rajkummar Rao_ Janhvi Kapoor _ Tanishk B._ Jubin N._ Kausar M(MP3_160K).mp3"
  },
  {
    id: "12",
    title: "Ajib Dastan Hai Yeh - Jhankar",
    url: "/Songs/Ajib Dastan Hai Yeh Jhankar Beats _ Rahul Jain _ DJ Harshit Shah _ DJ MHD IND _ Bollywood Retro Song(MP3_160K).mp3"
  },
  {
    id: "13",
    title: "Akhiyaan Gulaab",
    url: "/Songs/Akhiyaan Gulaab (Song)_ Shahid Kapoor_ Kriti Sanon _ Mitraz _ Teri Baaton Mein Aisa Uljha Jiya(MP3_160K).mp3"
  },
  {
    id: "14",
    title: "Alcoholia - Vikram Vedha",
    url: "/Songs/Alcoholia_Vikram Vedha _ Hrithik Roshan_ Saif Ali Khan _ Vishal-Sheykhar_ Manoj M _Snigdhajit_Ananya(MP3_160K).mp3"
  },
  {
    id: "15",
    title: "Alok, James Carter, BARBZ – Forget You",
    url: "/Songs/Alok_ James Carter_ BARBZ – Forget You (Official Lyric Video)(MP3_160K).mp3"
  },
  {
    id: "16",
    title: "Arabic Kuthu - Beast",
    url: "/Songs/Arabic Kuthu - Video Song _ Beast _ Thalapathy Vijay _ Pooja Hegde _ Sun Pictures _ Nelson _ Anirudh(MP3_160K).mp3"
  },
  {
    id: "17",
    title: "Aur Is Dil Mein - Jhankar",
    url: "/Songs/Aur Is Dil Mein Jhankar Beats _ Digbijoy Acharjee _ DJ Harshit Shah _DJ MHD IND _Jhankar Beats Songs(MP3_160K).mp3"
  },
  {
    id: "18",
    title: "Awaara Hoon - Jhankar",
    url: "/Songs/Awaara Hoon Jhankar Beats _Mukesh _Parry G _Vivek Hariharan_ Marc D Muse_ DJ Harshit Shah_DJ MHD IND(MP3_160K).mp3"
  },
  {
    id: "19",
    title: "BANARAS – BELAKINA KAVITHE",
    url: "/Songs/BANARAS – BELAKINA KAVITHE _ ZAID KHAN _ SONAL MONTEIRO _ JAYATHIRTHA _ B. AJANEESH LOKNATH(MP3_160K).mp3"
  },
  {
    id: "20",
    title: "BESOS - Jacqueline Fernandez",
    url: "/Songs/BESOS - Jacqueline Fernandez _ Shikhar Dhawan _ Shreya Ghoshal _ Karl Wine _ Freebot _ Rajat _Anshul(MP3_160K).mp3"
  },
  {
    id: "21",
    title: "Baaghi 3 - Do You Love Me",
    url: "/Songs/Baaghi 3_ Do You Love Me _ Disha Patani _ Tiger S_ Shraddha K _ René Bendali _ Tanishk B _ Nikhita(MP3_160K).mp3"
  },
  {
    id: "22",
    title: "Baby Tujhe Paap Lagega",
    url: "/Songs/Baby Tujhe Paap Lagega - Lyrical _ Zara Hatke Zara Bachke _ Vicky K_Sara_Himesh_Sachin-Jigar_Amitabh(MP3_160K).mp3"
  },
  {
    id: "23",
    title: "Badan Pe Sitare - Jhankar",
    url: "/Songs/Badan Pe Sitare Jhankar Beats _ Anil Kapoor _ Sonu Nigam _ Amit Trivedi _DJ Harshit Shah _DJ MHD IND(MP3_160K).mp3"
  },
  {
    id: "24",
    title: "Bagheera - Parichayavade",
    url: "/Songs/Bagheera _ Parichayavade❤️ _ Sriimurali _ Rukmini _ Ajaneesh _ Dr.Suri _ PrasanthNeel _ HombaleFilms(MP3_160K).mp3"
  },
  {
    id: "25",
    title: "Bangle Bangari - EKKA",
    url: "/Songs/Bangle Bangari Lyrical Video Song _ EKKA _ Yuva Rajkumar _ Rohit Padaki _ Charan raj _ Sanjana Anand(MP3_160K).mp3"
  },
  {
    id: "26",
    title: "Bas Ek Dhadak - Dhadak 2",
    url: "/Songs/Bas Ek Dhadak _ Dhadak 2 _Siddhant C_Triptii D_Shreya Ghoshal_ Jubin Nautiyal Javed-Mohsin_ Rashmi V(MP3_160K).mp3"
  },
  {
    id: "27",
    title: "Besharam Rang - Pathaan",
    url: "/Songs/Besharam Rang Song _ Pathaan _ Shah Rukh Khan_ Deepika Padukone _ Vishal _ Sheykhar _ Shilpa_ Kumaar(MP3_160K).mp3"
  },
  {
    id: "28",
    title: "Bhool Bhulaiyaa 2",
    url: "/Songs/Bhool Bhulaiyaa 2 (Title Track) Kartik A_ Kiara A_ Tabu _Pritam_ Tanishk_ Neeraj_ Anees B_ Bhushan K(MP3_160K).mp3"
  },
  {
    id: "29",
    title: "Bhula Dunga - Darshan Raval",
    url: "/Songs/Bhula Dunga - Darshan Raval _ Official Video _ Sidharth Shukla _ Shehnaaz Gill _ Naushad Khan(MP3_160K).mp3"
  },
  {
    id: "30",
    title: "Boom Boom Bengaluru - Bheema",
    url: "/Songs/Boom Boom Bengaluru _ Bheema _ Vijaya Kuma_ Charan Raj _ Krishna Sarthak _ Jagadeesh Gowda(MP3_160K).mp3"
  },
  {
    id: "31",
    title: "Butterfly Titliyan",
    url: "/Songs/Butterfly Titliyan_ Badass Ravikumar _Himesh Reshammiya _The Xposé Universe(MP3_160K).mp3"
  },
  {
    id: "32",
    title: "Carpetman – Feel so cold",
    url: "/Songs/Carpetman – Feel so cold(MP3_160K).mp3"
  },
  {
    id: "33",
    title: "Carpetman – What Does It Mean To You",
    url: "/Songs/Carpetman – What Does It Mean To You(MP3_160K).mp3"
  },
  {
    id: "34",
    title: "Carpetman – You Will Never Know it",
    url: "/Songs/Carpetman – You Will Never Know it(MP3_160K).mp3"
  },
  {
    id: "35",
    title: "Chaand Baaliyan - Aditya A",
    url: "/Songs/Chaand Baaliyan – Aditya A. _ Trending Song _ Official Video(MP3_160K).mp3"
  },
  {
    id: "36",
    title: "Chalo Ek Baar Phir Se - Jhankar",
    url: "/Songs/Chalo Ek Baar Phir Se Reprise Jhankar Beats _ JalRaj _ DJ Harshit Shah _ DJ MHD IND _ Reprise Song(MP3_160K).mp3"
  },
  {
    id: "37",
    title: "Cheap Song - UI The Movie",
    url: "/Songs/Cheap Song - Lyrical [Kannada] _ _UITheMovie _ Upendra _Ajaneesh B_Lahari Films_Venus Enterrtainers(MP3_160K).mp3"
  },
  {
    id: "38",
    title: "CHUMMA - Vicky Vidya",
    url: "/Songs/CHUMMA _ Vicky Vidya Ka Woh Wala Video _ Rajkummar R_ Triptii D_ Pawan Singh _ Sachin-Jigar_ Vayu(MP3_160K).mp3"
  },
  {
    id: "39",
    title: "Choli Ke Peeche - Crew",
    url: "/Songs/Choli Ke Peeche _ Crew - Kareena Kapoor K_ _diljitdosanjh_ Ila Arun_ Alka Yagnik_ Akshay _ IP(MP3_160K).mp3"
  },
  {
    id: "40",
    title: "Chura Liya Hai Tumne - Jhankar",
    url: "/Songs/Chura Liya Hai Tumne - Jhankar Beats _ Sattar Baloch _ Aishwarya Satish Pandit _ R.D. Burman(MP3_160K).mp3"
  },
  {
    id: "41",
    title: "Coke Studio - Pasoori",
    url: "/Songs/Coke Studio _ Season 14 _ Pasoori _ Ali Sethi x Shae Gill(MP3_160K).mp3"
  },
  {
    id: "42",
    title: "Daavudi - Devara",
    url: "/Songs/Daavudi - दावूदी Video Song _ Devara _ NTR _ Janhvi Kapoor _ Koratala Siva _ Anirudh _ 27th Sep(MP3_160K).mp3"
  },
  {
    id: "43",
    title: "Dash Song - Suthradaari",
    url: "/Songs/Dash Song _ Suthradaari Movie _ Chandan Shetty _ Navarasan _ Sanjana Anand _ Apurva _ Kiran Kumar(MP3_160K).mp3"
  },
  {
    id: "44",
    title: "Dax - Man I Used To Be",
    url: "/Songs/Dax - _Man I Used To Be_ (Official Music Video)(MP3_160K).mp3"
  },
  {
    id: "45",
    title: "Dekhha Tenu - Mr. Mrs. Mahi",
    url: "/Songs/Dekhha Tenu _ Mr. _ Mrs. Mahi _ Rajkummar Rao_ Janhvi Kapoor _ Mohd. Faiz _ Jaani _ Aadesh S_ Sameer(MP3_160K).mp3"
  },
  {
    id: "46",
    title: "Yeh Kahani Hai Un Doston Ki",
    url: "/Songs/Yeh kahani hai un doston ki,.mp3"
  },
  {
    id: "47",
    title: "AGAR TUM SAATH HO - Tamasha",
    url: "/Songs/_AGAR TUM SAATH HO_ Full VIDEO song _ Tamasha _ Ranbir Kapoor_ Deepika Padukone _ T-Series(MP3_160K).mp3"
  },
  {
    id: "48",
    title: "AMBER - Arabic Oriental Beat",
    url: "/Songs/_AMBER_ _ Arabic Oriental Dancehall Type Beat _ Turkish Reggaeton Oriental Balkan Instrumental(MP3_160K).mp3"
  },
  {
    id: "49",
    title: "Energetic Remix Jukebox",
    url: "/Songs/_Energetic Remix_ _ Video Jukebox _ _Latest Remix Songs_ _ T-Series(MP3_160K) (1).mp3"
  }
];

export const getSongs = (): Promise<Song[]> => {
  return Promise.resolve(mockSongs);
};

export type { Song };