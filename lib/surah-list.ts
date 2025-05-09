export type Reciter = {
  id: string
  name: string
  arabicName?: string
  description?: string
  baseUrl: string
  filePattern: string // Added to handle different file naming patterns
}

export const reciters: Reciter[] = [
  {
    id: "mishari-alafasy",
    name: "Mishari Rashid Al-Afasy",
    arabicName: "مشاري راشد العفاسي",
    description: "Renowned Kuwaiti reciter with a melodious voice",
    baseUrl: "https://server8.mp3quran.net/afs/",
    filePattern: "{surahNumber}.mp3", // 001.mp3, 002.mp3, etc.
  },
  {
    id: "abdul-basit",
    name: "Abdul Basit Abdul Samad",
    arabicName: "عبد الباسط عبد الصمد",
    description: "Classic Egyptian recitation with deep, resonant voice",
    baseUrl: "https://server7.mp3quran.net/basit/",
    filePattern: "{surahNumber}.mp3", // 001.mp3, 002.mp3, etc.
  },
  {
    id: "mahmoud-khalil-al-husary",
    name: "Mahmoud Khalil Al-Husary",
    arabicName: "محمود خليل الحصري",
    description: "Traditional Egyptian recitation with precise tajweed",
    baseUrl: "https://server13.mp3quran.net/husr/",
    filePattern: "{surahNumber}.mp3", // 001.mp3, 002.mp3, etc.
  },
]

// Rest of the surahList remains the same
export const surahList = [
  {
    number: 1,
    name: "الفاتحة",
    englishName: "Al-Fatiha",
    englishNameTranslation: "The Opening",
    numberOfAyahs: 7,
  },
  {
    number: 2,
    name: "البقرة",
    englishName: "Al-Baqarah",
    englishNameTranslation: "The Cow",
    numberOfAyahs: 286,
  },
  {
    number: 3,
    name: "آل عمران",
    englishName: "Aal-Imran",
    englishNameTranslation: "The Family of Imran",
    numberOfAyahs: 200,
  },
  {
    number: 4,
    name: "النساء",
    englishName: "An-Nisa",
    englishNameTranslation: "The Women",
    numberOfAyahs: 176,
  },
  {
    number: 5,
    name: "المائدة",
    englishName: "Al-Ma'idah",
    englishNameTranslation: "The Table Spread",
    numberOfAyahs: 120,
  },
  {
    number: 6,
    name: "الأنعام",
    englishName: "Al-An'am",
    englishNameTranslation: "The Cattle",
    numberOfAyahs: 165,
  },
  {
    number: 7,
    name: "الأعراف",
    englishName: "Al-A'raf",
    englishNameTranslation: "The Heights",
    numberOfAyahs: 206,
  },
  {
    number: 8,
    name: "الأنفال",
    englishName: "Al-Anfal",
    englishNameTranslation: "The Spoils of War",
    numberOfAyahs: 75,
  },
  {
    number: 9,
    name: "التوبة",
    englishName: "At-Tawbah",
    englishNameTranslation: "The Repentance",
    numberOfAyahs: 129,
  },
  {
    number: 10,
    name: "يونس",
    englishName: "Yunus",
    englishNameTranslation: "Jonah",
    numberOfAyahs: 109,
  },
  {
    number: 11,
    name: "هود",
    englishName: "Hud",
    englishNameTranslation: "Hud",
    numberOfAyahs: 123,
  },
  {
    number: 12,
    name: "يوسف",
    englishName: "Yusuf",
    englishNameTranslation: "Joseph",
    numberOfAyahs: 111,
  },
  {
    number: 13,
    name: "الرعد",
    englishName: "Ar-Ra'd",
    englishNameTranslation: "The Thunder",
    numberOfAyahs: 43,
  },
  {
    number: 14,
    name: "إبراهيم",
    englishName: "Ibrahim",
    englishNameTranslation: "Abraham",
    numberOfAyahs: 52,
  },
  {
    number: 15,
    name: "الحجر",
    englishName: "Al-Hijr",
    englishNameTranslation: "The Rocky Tract",
    numberOfAyahs: 99,
  },
  {
    number: 16,
    name: "النحل",
    englishName: "An-Nahl",
    englishNameTranslation: "The Bee",
    numberOfAyahs: 128,
  },
  {
    number: 17,
    name: "الإسراء",
    englishName: "Al-Isra",
    englishNameTranslation: "The Night Journey",
    numberOfAyahs: 111,
  },
  {
    number: 18,
    name: "الكهف",
    englishName: "Al-Kahf",
    englishNameTranslation: "The Cave",
    numberOfAyahs: 110,
  },
  {
    number: 19,
    name: "مريم",
    englishName: "Maryam",
    englishNameTranslation: "Mary",
    numberOfAyahs: 98,
  },
  {
    number: 20,
    name: "طه",
    englishName: "Ta-Ha",
    englishNameTranslation: "Ta-Ha",
    numberOfAyahs: 135,
  },
  {
    number: 21,
    name: "الأنبياء",
    englishName: "Al-Anbiya",
    englishNameTranslation: "The Prophets",
    numberOfAyahs: 112,
  },
  {
    number: 22,
    name: "الحج",
    englishName: "Al-Hajj",
    englishNameTranslation: "The Pilgrimage",
    numberOfAyahs: 78,
  },
  {
    number: 23,
    name: "المؤمنون",
    englishName: "Al-Mu'minun",
    englishNameTranslation: "The Believers",
    numberOfAyahs: 118,
  },
  {
    number: 24,
    name: "النور",
    englishName: "An-Nur",
    englishNameTranslation: "The Light",
    numberOfAyahs: 64,
  },
  {
    number: 25,
    name: "الفرقان",
    englishName: "Al-Furqan",
    englishNameTranslation: "The Criterion",
    numberOfAyahs: 77,
  },
  {
    number: 26,
    name: "الشعراء",
    englishName: "Ash-Shu'ara",
    englishNameTranslation: "The Poets",
    numberOfAyahs: 227,
  },
  {
    number: 27,
    name: "النمل",
    englishName: "An-Naml",
    englishNameTranslation: "The Ant",
    numberOfAyahs: 93,
  },
  {
    number: 28,
    name: "القصص",
    englishName: "Al-Qasas",
    englishNameTranslation: "The Stories",
    numberOfAyahs: 88,
  },
  {
    number: 29,
    name: "العنكبوت",
    englishName: "Al-Ankabut",
    englishNameTranslation: "The Spider",
    numberOfAyahs: 69,
  },
  {
    number: 30,
    name: "الروم",
    englishName: "Ar-Rum",
    englishNameTranslation: "The Romans",
    numberOfAyahs: 60,
  },
  {
    number: 31,
    name: "لقمان",
    englishName: "Luqman",
    englishNameTranslation: "Luqman",
    numberOfAyahs: 34,
  },
  {
    number: 32,
    name: "السجدة",
    englishName: "As-Sajdah",
    englishNameTranslation: "The Prostration",
    numberOfAyahs: 30,
  },
  {
    number: 33,
    name: "الأحزاب",
    englishName: "Al-Ahzab",
    englishNameTranslation: "The Combined Forces",
    numberOfAyahs: 73,
  },
  {
    number: 34,
    name: "سبإ",
    englishName: "Saba",
    englishNameTranslation: "Sheba",
    numberOfAyahs: 54,
  },
  {
    number: 35,
    name: "فاطر",
    englishName: "Fatir",
    englishNameTranslation: "Originator",
    numberOfAyahs: 45,
  },
  {
    number: 36,
    name: "يس",
    englishName: "Ya-Sin",
    englishNameTranslation: "Ya Sin",
    numberOfAyahs: 83,
  },
  {
    number: 37,
    name: "الصافات",
    englishName: "As-Saffat",
    englishNameTranslation: "Those Who Set The Ranks",
    numberOfAyahs: 182,
  },
  {
    number: 38,
    name: "ص",
    englishName: "Sad",
    englishNameTranslation: "The Letter Sad",
    numberOfAyahs: 88,
  },
  {
    number: 39,
    name: "الزمر",
    englishName: "Az-Zumar",
    englishNameTranslation: "The Troops",
    numberOfAyahs: 75,
  },
  {
    number: 40,
    name: "غافر",
    englishName: "Ghafir",
    englishNameTranslation: "The Forgiver",
    numberOfAyahs: 85,
  },
  {
    number: 41,
    name: "فصلت",
    englishName: "Fussilat",
    englishNameTranslation: "Explained in Detail",
    numberOfAyahs: 54,
  },
  {
    number: 42,
    name: "الشورى",
    englishName: "Ash-Shura",
    englishNameTranslation: "The Consultation",
    numberOfAyahs: 53,
  },
  {
    number: 43,
    name: "الزخرف",
    englishName: "Az-Zukhruf",
    englishNameTranslation: "The Ornaments of Gold",
    numberOfAyahs: 89,
  },
  {
    number: 44,
    name: "الدخان",
    englishName: "Ad-Dukhan",
    englishNameTranslation: "The Smoke",
    numberOfAyahs: 59,
  },
  {
    number: 45,
    name: "الجاثية",
    englishName: "Al-Jathiyah",
    englishNameTranslation: "The Crouching",
    numberOfAyahs: 37,
  },
  {
    number: 46,
    name: "الأحقاف",
    englishName: "Al-Ahqaf",
    englishNameTranslation: "The Wind-Curved Sandhills",
    numberOfAyahs: 35,
  },
  {
    number: 47,
    name: "محمد",
    englishName: "Muhammad",
    englishNameTranslation: "Muhammad",
    numberOfAyahs: 38,
  },
  {
    number: 48,
    name: "الفتح",
    englishName: "Al-Fath",
    englishNameTranslation: "The Victory",
    numberOfAyahs: 29,
  },
  {
    number: 49,
    name: "الحجرات",
    englishName: "Al-Hujurat",
    englishNameTranslation: "The Rooms",
    numberOfAyahs: 18,
  },
  {
    number: 50,
    name: "ق",
    englishName: "Qaf",
    englishNameTranslation: "The Letter Qaf",
    numberOfAyahs: 45,
  },
  {
    number: 51,
    name: "الذاريات",
    englishName: "Adh-Dhariyat",
    englishNameTranslation: "The Winnowing Winds",
    numberOfAyahs: 60,
  },
  {
    number: 52,
    name: "الطور",
    englishName: "At-Tur",
    englishNameTranslation: "The Mount",
    numberOfAyahs: 49,
  },
  {
    number: 53,
    name: "النجم",
    englishName: "An-Najm",
    englishNameTranslation: "The Star",
    numberOfAyahs: 62,
  },
  {
    number: 54,
    name: "القمر",
    englishName: "Al-Qamar",
    englishNameTranslation: "The Moon",
    numberOfAyahs: 55,
  },
  {
    number: 55,
    name: "الرحمن",
    englishName: "Ar-Rahman",
    englishNameTranslation: "The Beneficent",
    numberOfAyahs: 78,
  },
  {
    number: 56,
    name: "الواقعة",
    englishName: "Al-Waqi'ah",
    englishNameTranslation: "The Inevitable",
    numberOfAyahs: 96,
  },
  {
    number: 57,
    name: "الحديد",
    englishName: "Al-Hadid",
    englishNameTranslation: "The Iron",
    numberOfAyahs: 29,
  },
  {
    number: 58,
    name: "المجادلة",
    englishName: "Al-Mujadilah",
    englishNameTranslation: "The Pleading Woman",
    numberOfAyahs: 22,
  },
  {
    number: 59,
    name: "الحشر",
    englishName: "Al-Hashr",
    englishNameTranslation: "The Exile",
    numberOfAyahs: 24,
  },
  {
    number: 60,
    name: "الممتحنة",
    englishName: "Al-Mumtahanah",
    englishNameTranslation: "She That Is To Be Examined",
    numberOfAyahs: 13,
  },
  {
    number: 61,
    name: "الصف",
    englishName: "As-Saff",
    englishNameTranslation: "The Ranks",
    numberOfAyahs: 14,
  },
  {
    number: 62,
    name: "الجمعة",
    englishName: "Al-Jumu'ah",
    englishNameTranslation: "The Congregation, Friday",
    numberOfAyahs: 11,
  },
  {
    number: 63,
    name: "المنافقون",
    englishName: "Al-Munafiqun",
    englishNameTranslation: "The Hypocrites",
    numberOfAyahs: 11,
  },
  {
    number: 64,
    name: "التغابن",
    englishName: "At-Taghabun",
    englishNameTranslation: "The Mutual Disillusion",
    numberOfAyahs: 18,
  },
  {
    number: 65,
    name: "الطلاق",
    englishName: "At-Talaq",
    englishNameTranslation: "The Divorce",
    numberOfAyahs: 12,
  },
  {
    number: 66,
    name: "التحريم",
    englishName: "At-Tahrim",
    englishNameTranslation: "The Prohibition",
    numberOfAyahs: 12,
  },
  {
    number: 67,
    name: "الملك",
    englishName: "Al-Mulk",
    englishNameTranslation: "The Sovereignty",
    numberOfAyahs: 30,
  },
  {
    number: 68,
    name: "القلم",
    englishName: "Al-Qalam",
    englishNameTranslation: "The Pen",
    numberOfAyahs: 52,
  },
  {
    number: 69,
    name: "الحاقة",
    englishName: "Al-Haqqah",
    englishNameTranslation: "The Reality",
    numberOfAyahs: 52,
  },
  {
    number: 70,
    name: "المعارج",
    englishName: "Al-Ma'arij",
    englishNameTranslation: "The Ascending Stairways",
    numberOfAyahs: 44,
  },
  {
    number: 71,
    name: "نوح",
    englishName: "Nuh",
    englishNameTranslation: "Noah",
    numberOfAyahs: 28,
  },
  {
    number: 72,
    name: "الجن",
    englishName: "Al-Jinn",
    englishNameTranslation: "The Jinn",
    numberOfAyahs: 28,
  },
  {
    number: 73,
    name: "المزمل",
    englishName: "Al-Muzzammil",
    englishNameTranslation: "The Enshrouded One",
    numberOfAyahs: 20,
  },
  {
    number: 74,
    name: "المدثر",
    englishName: "Al-Muddaththir",
    englishNameTranslation: "The Cloaked One",
    numberOfAyahs: 56,
  },
  {
    number: 75,
    name: "القيامة",
    englishName: "Al-Qiyamah",
    englishNameTranslation: "The Resurrection",
    numberOfAyahs: 40,
  },
  {
    number: 76,
    name: "الانسان",
    englishName: "Al-Insan",
    englishNameTranslation: "The Man",
    numberOfAyahs: 31,
  },
  {
    number: 77,
    name: "المرسلات",
    englishName: "Al-Mursalat",
    englishNameTranslation: "The Emissaries",
    numberOfAyahs: 50,
  },
  {
    number: 78,
    name: "النبإ",
    englishName: "An-Naba",
    englishNameTranslation: "The Tidings",
    numberOfAyahs: 40,
  },
  {
    number: 79,
    name: "النازعات",
    englishName: "An-Nazi'at",
    englishNameTranslation: "Those Who Drag Forth",
    numberOfAyahs: 46,
  },
  {
    number: 80,
    name: "عبس",
    englishName: "Abasa",
    englishNameTranslation: "He Frowned",
    numberOfAyahs: 42,
  },
  {
    number: 81,
    name: "التكوير",
    englishName: "At-Takwir",
    englishNameTranslation: "The Overthrowing",
    numberOfAyahs: 29,
  },
  {
    number: 82,
    name: "الإنفطار",
    englishName: "Al-Infitar",
    englishNameTranslation: "The Cleaving",
    numberOfAyahs: 19,
  },
  {
    number: 83,
    name: "المطففين",
    englishName: "Al-Mutaffifin",
    englishNameTranslation: "The Defrauding",
    numberOfAyahs: 36,
  },
  {
    number: 84,
    name: "الإنشقاق",
    englishName: "Al-Inshiqaq",
    englishNameTranslation: "The Sundering",
    numberOfAyahs: 25,
  },
  {
    number: 85,
    name: "البروج",
    englishName: "Al-Buruj",
    englishNameTranslation: "The Mansions of the Stars",
    numberOfAyahs: 22,
  },
  {
    number: 86,
    name: "الطارق",
    englishName: "At-Tariq",
    englishNameTranslation: "The Nightcomer",
    numberOfAyahs: 17,
  },
  {
    number: 87,
    name: "الأعلى",
    englishName: "Al-A'la",
    englishNameTranslation: "The Most High",
    numberOfAyahs: 19,
  },
  {
    number: 88,
    name: "الغاشية",
    englishName: "Al-Ghashiyah",
    englishNameTranslation: "The Overwhelming",
    numberOfAyahs: 26,
  },
  {
    number: 89,
    name: "الفجر",
    englishName: "Al-Fajr",
    englishNameTranslation: "The Dawn",
    numberOfAyahs: 30,
  },
  {
    number: 90,
    name: "البلد",
    englishName: "Al-Balad",
    englishNameTranslation: "The City",
    numberOfAyahs: 20,
  },
  {
    number: 91,
    name: "الشمس",
    englishName: "Ash-Shams",
    englishNameTranslation: "The Sun",
    numberOfAyahs: 15,
  },
  {
    number: 92,
    name: "الليل",
    englishName: "Al-Layl",
    englishNameTranslation: "The Night",
    numberOfAyahs: 21,
  },
  {
    number: 93,
    name: "الضحى",
    englishName: "Ad-Duhaa",
    englishNameTranslation: "The Morning Hours",
    numberOfAyahs: 11,
  },
  {
    number: 94,
    name: "الشرح",
    englishName: "Ash-Sharh",
    englishNameTranslation: "The Relief",
    numberOfAyahs: 8,
  },
  {
    number: 95,
    name: "التين",
    englishName: "At-Tin",
    englishNameTranslation: "The Fig",
    numberOfAyahs: 8,
  },
  {
    number: 96,
    name: "العلق",
    englishName: "Al-Alaq",
    englishNameTranslation: "The Clot",
    numberOfAyahs: 19,
  },
  {
    number: 97,
    name: "القدر",
    englishName: "Al-Qadr",
    englishNameTranslation: "The Power",
    numberOfAyahs: 5,
  },
  {
    number: 98,
    name: "البينة",
    englishName: "Al-Bayyinah",
    englishNameTranslation: "The Clear Proof",
    numberOfAyahs: 8,
  },
  {
    number: 99,
    name: "الزلزلة",
    englishName: "Az-Zalzalah",
    englishNameTranslation: "The Earthquake",
    numberOfAyahs: 8,
  },
  {
    number: 100,
    name: "العاديات",
    englishName: "Al-Adiyat",
    englishNameTranslation: "The Courser",
    numberOfAyahs: 11,
  },
  {
    number: 101,
    name: "القارعة",
    englishName: "Al-Qariah",
    englishNameTranslation: "The Calamity",
    numberOfAyahs: 11,
  },
  {
    number: 102,
    name: "التكاثر",
    englishName: "At-Takathur",
    englishNameTranslation: "The Rivalry in World Increase",
    numberOfAyahs: 8,
  },
  {
    number: 103,
    name: "العصر",
    englishName: "Al-Asr",
    englishNameTranslation: "The Declining Day",
    numberOfAyahs: 3,
  },
  {
    number: 104,
    name: "الهمزة",
    englishName: "Al-Humazah",
    englishNameTranslation: "The Traducer",
    numberOfAyahs: 9,
  },
  {
    number: 105,
    name: "الفيل",
    englishName: "Al-Fil",
    englishNameTranslation: "The Elephant",
    numberOfAyahs: 5,
  },
  {
    number: 106,
    name: "قريش",
    englishName: "Quraysh",
    englishNameTranslation: "Quraysh",
    numberOfAyahs: 4,
  },
  {
    number: 107,
    name: "الماعون",
    englishName: "Al-Ma'un",
    englishNameTranslation: "The Small Kindnesses",
    numberOfAyahs: 7,
  },
  {
    number: 108,
    name: "الكوثر",
    englishName: "Al-Kawthar",
    englishNameTranslation: "The Abundance",
    numberOfAyahs: 3,
  },
  {
    number: 109,
    name: "الكافرون",
    englishName: "Al-Kafirun",
    englishNameTranslation: "The Disbelievers",
    numberOfAyahs: 6,
  },
  {
    number: 110,
    name: "النصر",
    englishName: "An-Nasr",
    englishNameTranslation: "The Divine Support",
    numberOfAyahs: 3,
  },
  {
    number: 111,
    name: "المسد",
    englishName: "Al-Masad",
    englishNameTranslation: "The Palm Fiber",
    numberOfAyahs: 5,
  },
  {
    number: 112,
    name: "الإخلاص",
    englishName: "Al-Ikhlas",
    englishNameTranslation: "The Sincerity",
    numberOfAyahs: 4,
  },
  {
    number: 113,
    name: "الفلق",
    englishName: "Al-Falaq",
    englishNameTranslation: "The Daybreak",
    numberOfAyahs: 5,
  },
  {
    number: 114,
    name: "الناس",
    englishName: "An-Nas",
    englishNameTranslation: "The Mankind",
    numberOfAyahs: 6,
  },
]
