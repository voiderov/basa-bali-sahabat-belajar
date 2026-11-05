// Materi kursus Mabasa. Konten statis, dapat ditinjau guru Basa Bali.

export type VocabRow = {
  bali: string;
  indonesia: string;
  english?: string;
  level?: string;
  aksara?: string;
};

export type LessonSection =
  | { type: "text"; heading?: string; body: string }
  | { type: "vocab"; heading?: string; rows: VocabRow[] }
  | { type: "tip"; body: string }
  | { type: "aksara"; heading?: string; letters: { char: string; latin: string }[] };

export type QuizQuestion = {
  question: string;
  options: string[];
  answer: number; // index of correct option
  explanation: string;
};

export type Practice = {
  prompt: string; // kalimat Indonesia yang harus diterjemahkan
  reference: string; // contoh jawaban Basa Bali
  hint?: string;
};

export type Lesson = {
  id: string;
  title: string;
  balineseTitle: string;
  summary: string;
  minutes: number;
  sections: LessonSection[];
  quiz: QuizQuestion[];
  practice: Practice[];
};

export type Course = {
  id: string;
  title: string;
  balineseTitle: string;
  level: string;
  description: string;
  outcomes: string[];
  lessons: Lesson[];
};

export const QUIZ_PASS_RATIO = 0.7;

export const courses: Course[] = [
  {
    id: "pengenalan",
    title: "Pengenalan Basa Bali",
    balineseTitle: "Pangenalan Basa Bali",
    level: "Pemula",
    description:
      "Kenali sejarah, salam sehari-hari, tingkatan bahasa (sor singgih basa), dan dasar Aksara Bali.",
    outcomes: [
      "Memahami peran Basa Bali dalam budaya Bali",
      "Menyapa dan berterima kasih dengan sopan",
      "Membedakan basa alus dan basa andap",
      "Mengenal 18 aksara wreastra",
    ],
    lessons: [
      {
        id: "sejarah",
        title: "Mengenal Basa Bali",
        balineseTitle: "Indik Basa Bali",
        summary: "Asal-usul, penutur, dan upaya pelestarian Basa Bali saat ini.",
        minutes: 6,
        sections: [
          {
            type: "text",
            heading: "Bahasa ibu masyarakat Bali",
            body: "Basa Bali adalah bahasa daerah rumpun Austronesia yang dituturkan oleh masyarakat di Pulau Bali, sebagian Lombok, dan komunitas Bali di berbagai daerah. Bahasa ini hidup dalam percakapan sehari-hari, upacara adat, sastra lontar, hingga seni pertunjukan seperti wayang dan drama gong.",
          },
          {
            type: "text",
            heading: "Dilindungi dan dilestarikan",
            body: "Pemerintah Provinsi Bali menerbitkan Peraturan Gubernur Bali Nomor 80 Tahun 2018 tentang Pelindungan dan Penggunaan Bahasa, Aksara, dan Sastra Bali. Setiap bulan Februari juga diselenggarakan Bulan Bahasa Bali untuk merayakan dan menghidupkan kembali penggunaan Basa Bali, terutama di kalangan generasi muda.",
          },
          {
            type: "tip",
            body: "Basa Bali memiliki tingkatan bahasa (sor singgih basa). Pilihan kata berubah sesuai dengan siapa kita berbicara — mirip dengan unggah-ungguh dalam Bahasa Jawa.",
          },
          {
            type: "vocab",
            heading: "Kata kunci",
            rows: [
              { bali: "basa", indonesia: "bahasa", english: "language" },
              { bali: "aksara", indonesia: "huruf / aksara", english: "script, letter" },
              { bali: "sastra", indonesia: "sastra", english: "literature" },
              { bali: "lontar", indonesia: "naskah daun lontar", english: "palm-leaf manuscript" },
            ],
          },
        ],
        quiz: [
          {
            question: "Peraturan Gubernur Bali tentang pelindungan Bahasa, Aksara, dan Sastra Bali adalah…",
            options: ["Pergub No. 80 Tahun 2018", "Pergub No. 1 Tahun 2010", "Perda No. 5 Tahun 2020", "Pergub No. 18 Tahun 2008"],
            answer: 0,
            explanation: "Pergub Bali Nomor 80 Tahun 2018 mengatur pelindungan dan penggunaan Bahasa, Aksara, dan Sastra Bali.",
          },
          {
            question: "Bulan Bahasa Bali diselenggarakan setiap bulan…",
            options: ["Agustus", "Februari", "Oktober", "Desember"],
            answer: 1,
            explanation: "Bulan Bahasa Bali dirayakan setiap bulan Februari.",
          },
          {
            question: "Naskah kuno Bali yang ditulis di atas daun disebut…",
            options: ["Prasasti", "Kakawin", "Lontar", "Babad"],
            answer: 2,
            explanation: "Lontar adalah naskah yang ditulis pada daun pohon lontar (siwalan).",
          },
        ],
        practice: [
          { prompt: "Bahasa Bali", reference: "Basa Bali", hint: "Kata 'bahasa' dalam Basa Bali lebih pendek." },
        ],
      },
      {
        id: "salam",
        title: "Salam & Ucapan Sehari-hari",
        balineseTitle: "Pangastawa lan Raos Sadina-dina",
        summary: "Om Swastyastu, rahajeng semeng, suksma — salam yang wajib kamu kuasai.",
        minutes: 8,
        sections: [
          {
            type: "text",
            heading: "Salam pembuka dan penutup",
            body: "Dalam suasana resmi, masyarakat Bali membuka pembicaraan dengan “Om Swastyastu” (semoga dalam keadaan baik atas karunia Tuhan) dan menutupnya dengan “Om Santih, Santih, Santih, Om” (semoga damai di hati, damai di dunia, damai selalu).",
          },
          {
            type: "vocab",
            heading: "Salam menurut waktu",
            rows: [
              { bali: "Rahajeng semeng", indonesia: "Selamat pagi", english: "Good morning" },
              { bali: "Rahajeng tengai", indonesia: "Selamat siang", english: "Good afternoon (midday)" },
              { bali: "Rahajeng sanja", indonesia: "Selamat sore", english: "Good evening (dusk)" },
              { bali: "Rahajeng wengi", indonesia: "Selamat malam", english: "Good night" },
              { bali: "Rahajeng rauh", indonesia: "Selamat datang", english: "Welcome" },
            ],
          },
          {
            type: "vocab",
            heading: "Ungkapan penting",
            rows: [
              { bali: "Suksma", indonesia: "Terima kasih", english: "Thank you", level: "alus" },
              { bali: "Suksma pisan", indonesia: "Terima kasih banyak", english: "Thank you very much", level: "alus" },
              { bali: "Nggih", indonesia: "Ya", english: "Yes", level: "alus" },
              { bali: "Nunas ampura", indonesia: "Mohon maaf", english: "I'm sorry / excuse me", level: "alus" },
              { bali: "Napi gatra?", indonesia: "Apa kabar?", english: "How are you?", level: "alus" },
              { bali: "Kenken kabare?", indonesia: "Apa kabar?", english: "How are you?", level: "andap" },
              { bali: "Becik-becik kemanten", indonesia: "Baik-baik saja", english: "I'm fine", level: "alus" },
            ],
          },
          {
            type: "tip",
            body: "Gunakan bentuk alus (Napi gatra?, Nggih, Suksma) kepada orang yang lebih tua, guru, atau orang yang baru dikenal.",
          },
        ],
        quiz: [
          {
            question: "Salam pembuka resmi dalam Basa Bali adalah…",
            options: ["Rahajeng wengi", "Om Swastyastu", "Suksma", "Nunas ampura"],
            answer: 1,
            explanation: "“Om Swastyastu” adalah salam pembuka resmi.",
          },
          {
            question: "“Rahajeng semeng” berarti…",
            options: ["Selamat malam", "Selamat siang", "Selamat pagi", "Selamat datang"],
            answer: 2,
            explanation: "Semeng = pagi, jadi “Rahajeng semeng” = selamat pagi.",
          },
          {
            question: "Cara sopan bertanya kabar kepada guru adalah…",
            options: ["Kenken kabare?", "Napi gatra?", "Kija?", "Nyen ento?"],
            answer: 1,
            explanation: "“Napi gatra?” adalah bentuk alus, cocok untuk orang yang dihormati.",
          },
          {
            question: "“Suksma” dalam Bahasa Inggris adalah…",
            options: ["Sorry", "Hello", "Thank you", "Goodbye"],
            answer: 2,
            explanation: "Suksma = terima kasih = thank you.",
          },
        ],
        practice: [
          { prompt: "Selamat pagi, apa kabar?", reference: "Rahajeng semeng, napi gatra?", hint: "Gunakan bentuk alus." },
          { prompt: "Terima kasih banyak", reference: "Suksma pisan" },
        ],
      },
      {
        id: "sor-singgih",
        title: "Tingkatan Bahasa (Sor Singgih Basa)",
        balineseTitle: "Sor Singgih Basa Bali",
        summary: "Kapan memakai basa alus, basa andap, dan mengapa basa kasar dihindari.",
        minutes: 10,
        sections: [
          {
            type: "text",
            heading: "Mengapa ada tingkatan?",
            body: "Sor singgih basa adalah aturan pemilihan kata sesuai dengan kedudukan lawan bicara dan orang yang dibicarakan. Secara umum ada basa alus (halus, untuk menghormati), basa andap (biasa, untuk teman sebaya dan suasana akrab), dan basa kasar (kasar, sebaiknya dihindari).",
          },
          {
            type: "text",
            heading: "Ragam basa alus",
            body: "Basa alus dibagi lagi menjadi: alus singgih (untuk meninggikan orang yang dihormati), alus sor (untuk merendahkan diri sendiri), alus mider (dapat dipakai untuk keduanya), dan alus madia (tingkat menengah).",
          },
          {
            type: "vocab",
            heading: "Contoh: kata ganti orang",
            rows: [
              { bali: "titiang", indonesia: "saya", english: "I", level: "alus sor" },
              { bali: "tiang", indonesia: "saya", english: "I", level: "alus madia" },
              { bali: "icang / cang", indonesia: "aku", english: "I", level: "andap" },
              { bali: "ragane", indonesia: "Anda", english: "you", level: "alus madia" },
              { bali: "cai / nyai", indonesia: "kamu (laki-laki / perempuan)", english: "you", level: "andap" },
            ],
          },
          {
            type: "vocab",
            heading: "Contoh: “makan” di berbagai tingkat",
            rows: [
              { bali: "ngrayunang", indonesia: "makan (untuk orang yang dihormati)", level: "alus singgih" },
              { bali: "nunas", indonesia: "makan (untuk diri sendiri)", level: "alus sor" },
              { bali: "ngajeng", indonesia: "makan", level: "alus mider" },
              { bali: "madaar", indonesia: "makan", level: "andap" },
              { bali: "ngamah", indonesia: "makan (untuk hewan)", level: "kasar" },
            ],
          },
          {
            type: "vocab",
            heading: "Contoh lain",
            rows: [
              { bali: "makolem", indonesia: "tidur", level: "alus singgih" },
              { bali: "sirep", indonesia: "tidur", level: "alus sor" },
              { bali: "pules", indonesia: "tidur", level: "andap" },
              { bali: "lunga", indonesia: "pergi", level: "alus singgih" },
              { bali: "luas", indonesia: "pergi", level: "andap" },
            ],
          },
          {
            type: "tip",
            body: "Jika ragu, gunakan basa alus madia dengan “tiang”. Ini aman dan sopan di hampir semua situasi.",
          },
        ],
        quiz: [
          {
            question: "Kata “titiang” termasuk tingkat bahasa…",
            options: ["Andap", "Kasar", "Alus sor", "Alus singgih"],
            answer: 2,
            explanation: "“Titiang” dipakai untuk merendahkan diri sendiri, sehingga termasuk alus sor.",
          },
          {
            question: "Kata yang tepat untuk mengatakan seorang pendeta sedang makan adalah…",
            options: ["ngamah", "madaar", "ngrayunang", "nunas"],
            answer: 2,
            explanation: "“Ngrayunang” adalah alus singgih, untuk meninggikan orang yang dihormati.",
          },
          {
            question: "“Pules” berarti tidur dalam tingkat…",
            options: ["Andap", "Alus singgih", "Alus sor", "Alus mider"],
            answer: 0,
            explanation: "“Pules” adalah kata andap (biasa).",
          },
        ],
        practice: [
          { prompt: "Saya makan (bentuk sopan untuk diri sendiri)", reference: "Titiang nunas", hint: "Pakai alus sor untuk diri sendiri." },
          { prompt: "Kamu tidur (kepada teman sebaya)", reference: "Cai pules" },
        ],
      },
      {
        id: "aksara",
        title: "Mengenal Aksara Bali",
        balineseTitle: "Aksara Wreastra",
        summary: "18 aksara dasar Bali: ha na ca ra ka, da ta sa wa la, ma ga ba nga, pa ja ya nya.",
        minutes: 9,
        sections: [
          {
            type: "text",
            heading: "Aksara wreastra",
            body: "Aksara Bali adalah aksara turunan Brahmi yang digunakan untuk menulis Basa Bali, Kawi, dan Sanskerta. Untuk keperluan sehari-hari dipakai 18 aksara wreastra. Setiap aksara mengandung bunyi vokal /a/ bawaan.",
          },
          {
            type: "aksara",
            heading: "Urutan hanacaraka",
            letters: [
              { char: "ᬳ", latin: "ha" },
              { char: "ᬦ", latin: "na" },
              { char: "ᬘ", latin: "ca" },
              { char: "ᬭ", latin: "ra" },
              { char: "ᬓ", latin: "ka" },
              { char: "ᬤ", latin: "da" },
              { char: "ᬢ", latin: "ta" },
              { char: "ᬲ", latin: "sa" },
              { char: "ᬯ", latin: "wa" },
              { char: "ᬮ", latin: "la" },
              { char: "ᬫ", latin: "ma" },
              { char: "ᬕ", latin: "ga" },
              { char: "ᬩ", latin: "ba" },
              { char: "ᬗ", latin: "nga" },
              { char: "ᬧ", latin: "pa" },
              { char: "ᬚ", latin: "ja" },
              { char: "ᬬ", latin: "ya" },
              { char: "ᬜ", latin: "nya" },
            ],
          },
          {
            type: "tip",
            body: "Untuk mengubah vokal /a/ menjadi /i/, /u/, /e/, atau /o/, digunakan pangangge suara seperti ulu (i), suku (u), taleng (é), dan taleng tedong (o).",
          },
        ],
        quiz: [
          {
            question: "Berapa jumlah aksara wreastra?",
            options: ["12", "18", "20", "26"],
            answer: 1,
            explanation: "Ada 18 aksara wreastra: ha na ca ra ka, da ta sa wa la, ma ga ba nga, pa ja ya nya.",
          },
          {
            question: "Aksara ᬓ dibaca…",
            options: ["ka", "ga", "ha", "nga"],
            answer: 0,
            explanation: "ᬓ adalah aksara “ka”.",
          },
          {
            question: "Pangangge suara untuk mengubah bunyi menjadi /u/ disebut…",
            options: ["Ulu", "Taleng", "Suku", "Cecek"],
            answer: 2,
            explanation: "Suku mengubah vokal menjadi /u/.",
          },
        ],
        practice: [],
      },
    ],
  },
  {
    id: "dasar",
    title: "Pendidikan Dasar Basa Bali",
    balineseTitle: "Paplajahan Dasar Basa Bali",
    level: "Dasar",
    description:
      "Bangun fondasi: berhitung, keluarga, kosakata sehari-hari, kata tanya, dan menyusun kalimat sederhana.",
    outcomes: [
      "Berhitung 1–100 dalam Basa Bali",
      "Menyebut anggota keluarga dan urutan nama Bali",
      "Menguasai kosakata benda dan warna",
      "Menyusun kalimat dan pertanyaan sederhana",
    ],
    lessons: [
      {
        id: "angka",
        title: "Berhitung",
        balineseTitle: "Ngitung",
        summary: "Angka 1–10, puluhan, hingga ribuan dalam bentuk andap dan alus.",
        minutes: 7,
        sections: [
          {
            type: "vocab",
            heading: "Angka 1–10",
            rows: [
              { bali: "besik (alus: siki)", indonesia: "satu", english: "one" },
              { bali: "dua (alus: kalih)", indonesia: "dua", english: "two" },
              { bali: "telu (alus: tiga)", indonesia: "tiga", english: "three" },
              { bali: "papat", indonesia: "empat", english: "four" },
              { bali: "lima", indonesia: "lima", english: "five" },
              { bali: "nem", indonesia: "enam", english: "six" },
              { bali: "pitu", indonesia: "tujuh", english: "seven" },
              { bali: "kutus", indonesia: "delapan", english: "eight" },
              { bali: "sia", indonesia: "sembilan", english: "nine" },
              { bali: "dasa", indonesia: "sepuluh", english: "ten" },
            ],
          },
          {
            type: "vocab",
            heading: "Angka istimewa",
            rows: [
              { bali: "solas", indonesia: "sebelas", english: "eleven" },
              { bali: "duang dasa", indonesia: "dua puluh", english: "twenty" },
              { bali: "selae", indonesia: "dua puluh lima", english: "twenty-five" },
              { bali: "seket", indonesia: "lima puluh", english: "fifty" },
              { bali: "satus", indonesia: "seratus", english: "one hundred" },
              { bali: "siu", indonesia: "seribu", english: "one thousand" },
            ],
          },
          {
            type: "tip",
            body: "Beberapa angka punya nama khusus, misalnya selae (25) dan seket (50). Ini sering muncul saat tawar-menawar di pasar (peken).",
          },
        ],
        quiz: [
          {
            question: "“Kutus” berarti…",
            options: ["Tujuh", "Delapan", "Sembilan", "Enam"],
            answer: 1,
            explanation: "Kutus = delapan.",
          },
          {
            question: "Angka 25 dalam Basa Bali adalah…",
            options: ["Duang dasa lima", "Seket", "Selae", "Solas"],
            answer: 2,
            explanation: "25 memiliki nama khusus: selae.",
          },
          {
            question: "Bentuk alus dari “dua” adalah…",
            options: ["Kalih", "Siki", "Tiga", "Papat"],
            answer: 0,
            explanation: "Dua dalam basa alus adalah kalih.",
          },
        ],
        practice: [
          { prompt: "Tiga puluh", reference: "Telung dasa", hint: "Mirip dengan pola “duang dasa”." },
        ],
      },
      {
        id: "keluarga",
        title: "Keluarga & Nama Bali",
        balineseTitle: "Kulawarga",
        summary: "Sebutan anggota keluarga dan arti nama Wayan, Made, Nyoman, Ketut.",
        minutes: 8,
        sections: [
          {
            type: "vocab",
            heading: "Anggota keluarga",
            rows: [
              { bali: "bapa / aji", indonesia: "ayah", english: "father" },
              { bali: "meme / biang", indonesia: "ibu", english: "mother" },
              { bali: "pekak / kakiang", indonesia: "kakek", english: "grandfather" },
              { bali: "dadong / niang", indonesia: "nenek", english: "grandmother" },
              { bali: "beli", indonesia: "kakak laki-laki", english: "older brother" },
              { bali: "mbok", indonesia: "kakak perempuan", english: "older sister" },
              { bali: "adi", indonesia: "adik", english: "younger sibling" },
              { bali: "panak / pianak", indonesia: "anak", english: "child" },
              { bali: "cucu", indonesia: "cucu", english: "grandchild" },
              { bali: "nyama", indonesia: "saudara / kerabat", english: "relatives" },
            ],
          },
          {
            type: "text",
            heading: "Urutan nama anak",
            body: "Masyarakat Bali memberi nama depan berdasarkan urutan kelahiran: anak pertama Wayan / Putu / Gede, anak kedua Made / Kadek / Nengah, anak ketiga Nyoman / Komang, dan anak keempat Ketut. Anak kelima biasanya kembali ke Wayan.",
          },
        ],
        quiz: [
          {
            question: "“Meme” berarti…",
            options: ["Nenek", "Ibu", "Kakak", "Adik"],
            answer: 1,
            explanation: "Meme = ibu.",
          },
          {
            question: "Anak ketiga dalam keluarga Bali biasanya bernama…",
            options: ["Made", "Ketut", "Nyoman", "Wayan"],
            answer: 2,
            explanation: "Nyoman atau Komang adalah nama anak ketiga.",
          },
          {
            question: "“Beli” adalah sebutan untuk…",
            options: ["Kakak laki-laki", "Ayah", "Paman", "Adik"],
            answer: 0,
            explanation: "Beli = kakak laki-laki (juga sapaan untuk laki-laki muda).",
          },
        ],
        practice: [
          { prompt: "Ibu saya", reference: "Meme tiange", hint: "Akhiran kepemilikan: -e / tiange." },
        ],
      },
      {
        id: "kosakata",
        title: "Kosakata Sehari-hari",
        balineseTitle: "Kruna Sadina-dina",
        summary: "Benda di sekitar rumah, hewan, dan warna.",
        minutes: 7,
        sections: [
          {
            type: "vocab",
            heading: "Di rumah dan sekitarnya",
            rows: [
              { bali: "umah", indonesia: "rumah", english: "house" },
              { bali: "yeh", indonesia: "air", english: "water" },
              { bali: "nasi", indonesia: "nasi", english: "cooked rice" },
              { bali: "carik", indonesia: "sawah", english: "rice field" },
              { bali: "peken", indonesia: "pasar", english: "market" },
              { bali: "jaja", indonesia: "kue", english: "cake, snack" },
            ],
          },
          {
            type: "vocab",
            heading: "Hewan",
            rows: [
              { bali: "kedis", indonesia: "burung", english: "bird" },
              { bali: "meong", indonesia: "kucing", english: "cat" },
              { bali: "siap", indonesia: "ayam", english: "chicken" },
              { bali: "sampi", indonesia: "sapi", english: "cow" },
              { bali: "be", indonesia: "ikan / lauk", english: "fish / side dish" },
            ],
          },
          {
            type: "vocab",
            heading: "Warna",
            rows: [
              { bali: "barak", indonesia: "merah", english: "red" },
              { bali: "putih", indonesia: "putih", english: "white" },
              { bali: "selem", indonesia: "hitam", english: "black" },
              { bali: "kuning", indonesia: "kuning", english: "yellow" },
              { bali: "gadang", indonesia: "hijau", english: "green" },
            ],
          },
        ],
        quiz: [
          {
            question: "“Carik” berarti…",
            options: ["Pasar", "Sawah", "Sungai", "Gunung"],
            answer: 1,
            explanation: "Carik = sawah.",
          },
          {
            question: "Warna hitam dalam Basa Bali adalah…",
            options: ["Barak", "Gadang", "Selem", "Kuning"],
            answer: 2,
            explanation: "Selem = hitam.",
          },
          {
            question: "“Kedis” dalam Bahasa Inggris adalah…",
            options: ["Cat", "Bird", "Fish", "Chicken"],
            answer: 1,
            explanation: "Kedis = burung = bird.",
          },
        ],
        practice: [
          { prompt: "Ayam merah", reference: "Siap barak", hint: "Kata sifat ditulis setelah kata benda." },
        ],
      },
      {
        id: "lengkara",
        title: "Kata Tanya & Kalimat Sederhana",
        balineseTitle: "Ngwangun Lengkara",
        summary: "Susun kalimat S-P-O dan ajukan pertanyaan dengan sopan.",
        minutes: 10,
        sections: [
          {
            type: "text",
            heading: "Pola kalimat",
            body: "Susunan kalimat Basa Bali mirip Bahasa Indonesia: Subjek – Predikat – Objek – Keterangan. Contoh: “Tiang numbas nasi ring peken” (Saya membeli nasi di pasar).",
          },
          {
            type: "vocab",
            heading: "Kata tanya",
            rows: [
              { bali: "apa (alus: napi)", indonesia: "apa", english: "what" },
              { bali: "nyen (alus: sira)", indonesia: "siapa", english: "who" },
              { bali: "dija (alus: ring dija)", indonesia: "di mana", english: "where" },
              { bali: "kija (alus: jagi kija)", indonesia: "ke mana", english: "where to" },
              { bali: "kenken (alus: sapunapi)", indonesia: "bagaimana", english: "how" },
              { bali: "ngudiang (alus: napi mawinan)", indonesia: "mengapa", english: "why" },
              { bali: "kuda (alus: akuda)", indonesia: "berapa", english: "how many / how much" },
            ],
          },
          {
            type: "vocab",
            heading: "Contoh kalimat",
            rows: [
              { bali: "Tiang numbas nasi ring peken.", indonesia: "Saya membeli nasi di pasar.", level: "alus" },
              { bali: "Meme ngae jaja.", indonesia: "Ibu membuat kue.", level: "andap" },
              { bali: "Bapa luas ka carik.", indonesia: "Ayah pergi ke sawah.", level: "andap" },
              { bali: "Jagi kija?", indonesia: "Mau ke mana?", level: "alus" },
              { bali: "Akuda ajin ipun?", indonesia: "Berapa harganya?", level: "alus" },
            ],
          },
        ],
        quiz: [
          {
            question: "Bentuk alus dari “kija” (ke mana) adalah…",
            options: ["Ring dija", "Jagi kija", "Sapunapi", "Akuda"],
            answer: 1,
            explanation: "“Jagi kija?” = mau ke mana? (alus).",
          },
          {
            question: "“Meme ngae jaja” berarti…",
            options: ["Ibu membeli kue", "Ibu membuat kue", "Ibu makan kue", "Ibu menjual kue"],
            answer: 1,
            explanation: "Ngae = membuat, jaja = kue.",
          },
          {
            question: "Kata tanya “sapunapi” berarti…",
            options: ["Bagaimana", "Siapa", "Kapan", "Berapa"],
            answer: 0,
            explanation: "Sapunapi = bagaimana (alus).",
          },
        ],
        practice: [
          { prompt: "Saya membeli kue di pasar", reference: "Tiang numbas jaja ring peken", hint: "Pola: tiang + numbas + objek + ring + tempat." },
          { prompt: "Mau ke mana?", reference: "Jagi kija?" },
        ],
      },
    ],
  },
];

export function getCourse(courseId: string) {
  return courses.find((c) => c.id === courseId);
}

export function getLesson(courseId: string, lessonId: string) {
  const course = getCourse(courseId);
  if (!course) return undefined;
  const index = course.lessons.findIndex((l) => l.id === lessonId);
  if (index === -1) return undefined;
  return {
    course,
    lesson: course.lessons[index]!,
    index,
    prev: course.lessons[index - 1],
    next: course.lessons[index + 1],
  };
}

export function scoreQuiz(quiz: QuizQuestion[], answers: (number | null)[]) {
  const correct = quiz.reduce((sum, q, i) => sum + (answers[i] === q.answer ? 1 : 0), 0);
  return { correct, total: quiz.length, passed: quiz.length > 0 && correct / quiz.length >= QUIZ_PASS_RATIO };
}
