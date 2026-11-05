Mabasa — Sahabat Belajar Bahasa Bali


Status dokumen: draf untuk disesuaikan dengan implementasi aktual. Tautan repositori yang diberikan saat penyusunan mengembalikan halaman 404, sehingga source code, fitur, framework, layanan AI, dan instruksi instalasi belum dapat diverifikasi. Ganti semua bagian bertanda [ISI/VERIFIKASI] sebelum mengirim submission.

Mabasa adalah platform web untuk membantu pelajar mengenal dan berlatih Bahasa Bali secara lebih interaktif. Arah pengembangan yang diusulkan adalah menggabungkan materi belajar dengan tutor percakapan berbasis AI yang memberi respons dan umpan balik bahasa. Fitur tersebut hanya boleh dinyatakan telah tersedia apabila benar-benar sudah berjalan pada versi yang disubmit.

1. Masalah

Kesempatan berlatih Bahasa Bali secara kontekstual dapat terbatas bagi pelajar yang membutuhkan ruang latihan mandiri, respons cepat, dan penjelasan yang mudah dipahami. Mabasa mengangkat kebutuhan tersebut sebagai hipotesis masalah yang perlu divalidasi bersama siswa, guru Bahasa Bali, atau penutur yang kompeten. README ini tidak mengklaim adanya hasil survei atau pengukuran dampak.

2. Target Pengguna

Pengguna utama yang dituju adalah pelajar SMA/SMK/sederajat yang ingin mempelajari atau melatih Bahasa Bali. Pengguna pendukung dapat mencakup guru dan pendamping belajar.

3. Fitur Utama

Daftar ini adalah sasaran produk, bukan pernyataan bahwa fitur sudah aktif. Cocokkan dengan versi aplikasi yang benar-benar berjalan.

•
Materi atau contoh penggunaan Bahasa Bali: [VERIFIKASI: modul dan konten yang tersedia].

•
Latihan Bahasa Bali melalui input pengguna: [VERIFIKASI: alur yang tersedia].

•
Tutor AI yang menanggapi latihan dan memberi penjelasan/koreksi: [VERIFIKASI: jika memang sudah terintegrasi dan dapat diuji].

•
Riwayat atau progres belajar: [VERIFIKASI: jika sudah ada].

Saat mengisi README final, sebutkan hanya fitur yang dapat didemonstrasikan dari kondisi awal hingga hasilnya.

4. Tech Stack

Isi berdasarkan source code dan konfigurasi deployment yang sebenarnya.

•
Frontend: [ISI/VERIFIKASI]

•
Backend/API: [ISI/VERIFIKASI]

•
Database/penyimpanan: [ISI/VERIFIKASI atau “tidak digunakan”]

•
Layanan/model AI: [ISI/VERIFIKASI atau “belum terintegrasi”]

•
Hosting/deployment: [ISI/VERIFIKASI]

5. Implementasi AI

Rancangan kandidat untuk Mabasa — konfirmasi terhadap source code sebelum mengirim. Jika sudah diimplementasikan, AI dapat berperan sebagai tutor latihan: pengguna mengirim kata, frasa, kalimat, atau pertanyaan; layanan AI memberi respons, alternatif ungkapan, dan penjelasan yang relevan. Materi/rujukan bahasa yang telah ditinjau manusia sebaiknya digunakan sebagai dasar agar jawaban lebih konsisten.

•
Model/API dan versi: [ISI/VERIFIKASI]

•
Fungsi AI yang benar-benar tersedia: [ISI/VERIFIKASI]

•
Input yang dikirim ke AI: [ISI/VERIFIKASI]

•
Output yang ditampilkan: [ISI/VERIFIKASI]

•
Penanganan kegagalan/kuota API: [ISI/VERIFIKASI]

Jangan menyimpan API key, token, password, atau kredensial di repository. Gunakan environment variable dan sediakan .env.example tanpa nilai rahasia.

6. Arsitektur dan Alur Data

Diagram berikut hanya menggambarkan rancangan umum. Sesuaikan dengan struktur implementasi aktual.

Plain Text


Pengguna
   │ input latihan
   ▼
Antarmuka web ──► Backend/API aplikasi ──► Layanan/model AI
                         │                       │
                         ├── materi belajar      └── respons/umpan balik
                         └── penyimpanan opsional          │
                                                         ▼
                                             Hasil ditampilkan di web



•
Frontend ke backend: [ISI/VERIFIKASI]

•
Backend ke model/API: [ISI/VERIFIKASI]

•
Penyimpanan data dan kebijakan retensi: [ISI/VERIFIKASI]

7. Menjalankan Secara Lokal

Instruksi berikut belum dapat disusun dengan akurat sebelum repository dan konfigurasi aplikasi bisa diperiksa. Ganti setelah memverifikasi file konfigurasi, misalnya package.json, requirements.txt, atau berkas sejenis.

1.
Clone repository: git clone https://github.com/voiderov/basa-bali-sahabat-belajar.git

2.
Masuk ke folder proyek: cd basa-bali-sahabat-belajar

3.
Pasang dependensi menggunakan perintah sesuai stack: [ISI/VERIFIKASI]

4.
Salin .env.example menjadi .env, lalu isi konfigurasi lokal yang diperlukan. Jangan membagikan file .env.

5.
Jalankan aplikasi: [ISI/VERIFIKASI]

8. Environment Variables

Lihat .env.example. Cantumkan hanya nama variabel dan contoh nilai non-rahasia, misalnya AI_API_KEY=your_key_here. Jangan pernah memasukkan secret asli ke GitHub.

9. Deployment

•
URL website aktif: [ISI/VERIFIKASI — wajib bisa diakses juri]

•
Commit/release versi submission: [ISI/VERIFIKASI — cantumkan commit hash atau tag]

•
Akun demo bila aplikasi memerlukan login: kirim melalui form panitia, bukan di repository.

10. Anggota Tim

•
I Gde Erovadhi

•
Adskhan Hafiz Dewanda Sirait

•
Danendra Naufal Bayuworo

Asal sekolah: SMA Negeri 2 Kuta Selatan
Kategori: SMA/SMK/sederajat
Ketua tim dan kontak: [TETAPKAN/NAMA, EMAIL, DAN NOMOR WHATSAPP]

11. Disclosure Teknologi dan Pengembangan

Lengkapi berdasarkan kondisi sebenarnya pada versi submission.

•
Status proyek sebelum kompetisi: [“Existing before competition” atau “Dibuat selama kompetisi” — pilih yang benar]

•
Pengembangan khusus kompetisi: [JELASKAN PERUBAHAN/PEKERJAAN TIM]

•
Framework, library, dan versi: [ISI/VERIFIKASI]

•
Model/API/dataset: [ISI/VERIFIKASI; tuliskan sumber dan lisensi bila ada]

•
Alat AI yang membantu coding: [ISI/VERIFIKASI atau “tidak digunakan”]

•
Aset/sumber pihak ketiga: [ISI/VERIFIKASI]

12. Batasan yang Diketahui

•
Akurasi ungkapan, tingkat tutur, konteks, dan variasi penggunaan Bahasa Bali harus ditinjau bersama guru atau penutur yang kompeten.

•
Jawaban model AI dapat keliru. Pengguna perlu diberi tahu bahwa keluaran AI adalah bantuan belajar, bukan otoritas final.

•
Ketersediaan dan kuota layanan AI bergantung pada konfigurasi yang benar-benar digunakan aplikasi.

•
Tambahkan batasan spesifik versi MVP: [ISI/VERIFIKASI].

13. Kredit dan Sumber Pihak Ketiga

•
Library, model/API, dataset, font, gambar, template, dan aset lainnya: [ISI/VERIFIKASI].

•
Pastikan seluruh penggunaan mematuhi lisensi dan izin yang berlaku.

14. Lisensi

[ISI/VERIFIKASI: tuliskan lisensi proyek. Jika belum ditentukan, jangan menyatakan proyek berlisensi terbuka.]

