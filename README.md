<div align="center">
  <img src="/src/assets/guru-basa.png" alt="Mabasa Hero Banner" width="100%">

  # ᬫᬩᬲ (Mabasa) - Basa Bali Sahabat Belajar
  
  **Belajar Basa Bali, ditemani Guru Basa AI.** <br>
  Kursus singkat untuk pelajar dan pendatang, plus tutor AI yang menjawab pertanyaanmu dalam Bahasa Indonesia maupun English.

  [![GitHub repo size](https://img.shields.io/github/repo-size/voiderov/basa-bali-sahabat-belajar)](https://github.com/voiderov/basa-bali-sahabat-belajar)
  [![GitHub stars](https://img.shields.io/github/stars/voiderov/basa-bali-sahabat-belajar?style=social)](https://github.com/voiderov/basa-bali-sahabat-belajar/stargazers)
</div>


## Problem

Basa Bali adalah bahasa ibu yang perlu dijaga bersama. Banyak generasi muda Bali kini lebih sering memakai Bahasa Indonesia, sementara pendatang dan ekspatriat kesulitan menemukan materi belajar yang ramah pemula. Aturan *sor singgih basa* (tingkatan bahasa) juga membuat banyak orang ragu untuk mulai berbicara. Pelajar membutuhkan ruang latihan mandiri yang tersedia kapan saja, bukan hanya materi yang dibaca secara pasif.

Catatan: gambaran masalah ini berasal dari pengamatan tim dan belum berupa hasil survei yang terukur.

## Target User

- **Pengguna utama:** pelajar (termasuk siswa SMA/SMK/sederajat) yang ingin mulai belajar atau memperkuat Basa Bali.
- **Pengguna kedua:** pendatang, ekspatriat, dan turis yang belajar lewat Bahasa Indonesia atau English.
- **Pendukung:** guru dan penutur yang dapat meninjau ketepatan contoh bahasa.

## Key Features

**Fitur inti**

- **Guru Basa AI:** tanya jawab dalam Bahasa Indonesia atau English, dengan contoh kalimat, label tingkat bahasa (alus/andap), dan latihan singkat.
- **Latihan dikoreksi AI:** pengguna menulis terjemahan sendiri, lalu AI memeriksa dan menjelaskan bagian yang perlu diperbaiki.
- **Dua kursus terstruktur**, lengkap dengan kosakata dan kuis:
  - *Pengenalan Basa Bali* (pemula, 4 pelajaran): sejarah, salam sehari-hari, tingkatan bahasa (sor singgih basa), dan dasar aksara Bali.
  - *Pendidikan Dasar Basa Bali* (dasar, 4 pelajaran): berhitung, keluarga, kosakata sehari-hari, kata tanya, dan menyusun kalimat sederhana.

**Fitur tambahan**

- Materi sor singgih dan 18 aksara wreastra.
- Antarmuka bernuansa Bali yang responsif di berbagai perangkat.

**Alur inti untuk dicoba:** buka website → pilih "Tanya Guru Basa" → ketik pertanyaan atau kalimat (misalnya *"How do I say 'thank you very much' in Balinese?"*) → terima jawaban AI beserta contoh kalimat dan tingkat bahasanya.

## Tech Stack

- **Frontend:** React + TypeScript, TanStack Start/Router (Vite), Tailwind CSS, shadcn-ui
- **Backend:** fungsi server aplikasi
- **Database:** tidak digunakan; materi kursus tersimpan sebagai data di dalam aplikasi
- **Hosting:** Lovable (kode di GitHub)

Versi library tercatat di `package.json`.

## AI Implementation

- **Model/API:** OpenAI `gpt-6-astra` melalui OpenAI API
- **AI function:** (1) Guru Basa AI, tutor tanya jawab Indonesia/English → Basa Bali; (2) Latihan dikoreksi AI, pemeriksaan terjemahan pengguna
- **Input:** pertanyaan atau kalimat pengguna; terjemahan yang ditulis pengguna
- **Output:** jawaban dengan contoh kalimat, label tingkat bahasa (alus/andap), dan latihan singkat; pemeriksaan serta penjelasan bagian yang perlu diperbaiki

AI diperlukan karena pertanyaan bebas dan tulisan pengguna tidak dapat dijawab atau dikoreksi oleh materi yang statis. Data yang dikirim ke model hanya teks yang diketik pengguna; aplikasi tidak meminta data pribadi.

## Architecture

```
Pengguna
  │ pertanyaan / latihan
  ▼
Frontend web Mabasa
  │ request aplikasi
  ▼
Backend / API (fungsi server) ───────► OpenAI API
  │                                        │ respons / umpan balik
  └── materi belajar (data di dalam app)   ▼
                              Hasil ditampilkan di web
```

## Installation / Local Run

```bash
git clone https://github.com/voiderov/basa-bali-sahabat-belajar.git
cd basa-bali-sahabat-belajar
npm install
cp .env.example .env   # lalu isi nilainya, lihat bagian 9
npm run dev
```

## Deployment

URL: https://mabasa.lovable.app

## Team Members

SMA Negeri 2 Kuta Selatan

- I Gde Erovadhi (ketua tim)
- Adskhan Hafiz Dewanda Sirait
- Danendra Naufal Bayuworo

## Third-party Resources / Credits

- **Library open-source:** React, TanStack Start/Router, Vite, Tailwind CSS, shadcn-ui, dan lainnya; mengikuti lisensi masing-masing (daftar di `package.json`).
- **Model/API:** Gemini API.
- **AI-assisted development:** Lovable.
- **Aset visual:** Gemini.
- **Status pengembangan:** seluruh fitur dibangun selama periode kompetisi; tidak ada produk sebelumnya.
- **Lisensi proyek:** [MIT](LICENSE).


