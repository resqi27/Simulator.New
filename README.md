# Deadlock Lab — Professional Interactive Simulator

Website edukasi interaktif untuk mengenal **Deadlock**, **Resource Allocation Graph (RAG)**, dan **Banker's Algorithm**. Dibuat tanpa framework atau proses build sehingga mudah dijalankan dan di-host.

## Jalankan di komputer
1. Ekstrak ZIP.
2. Buka folder `Deadlock_Lab_Professional`.
3. Buka `index.html` di browser modern.

Semua fungsi inti berjalan secara lokal. Font Google akan dimuat jika internet tersedia; jika tidak, browser menggunakan font cadangan.

## Isi project
- `index.html` — struktur halaman, navigasi, materi, dan simulator.
- `styles.css` — desain responsif dengan palet sage, cream, dan lavender; motion halus serta dukungan `prefers-reduced-motion`.
- `app.js` — navigasi, materi, kuis, visualisasi RAG bertahap, dan pemeriksaan safe sequence Banker.

## Fitur
- Landing page dan halaman materi.
- RAG dengan skenario deadlock dan tanpa siklus.
- Analisis RAG bertahap dengan panah yang muncul seiring proses.
- Banker’s Algorithm dengan tabel Allocation, Max, Need, Available.
- Tombol Mulai, Langkah Berikutnya, Sebelumnya, dan Reset.
- Mini quiz dengan feedback skor.
- Layout responsif untuk desktop dan ponsel.

## Publikasikan agar bisa dicoba orang lain
Website ini statis. Untuk Netlify Drop, ekstrak ZIP terlebih dahulu lalu unggah folder yang berisi `index.html`, `styles.css`, dan `app.js` (folder project ini). Setelah hosting memberikan URL, bagikan URL tersebut kepada teman atau calon reviewer.

## Catatan akademik
UNSAFE berarti tidak ditemukan safe sequence dari kondisi yang diperiksa; itu tidak otomatis membuktikan deadlock aktual. Untuk RAG, siklus memastikan deadlock bila setiap resource yang terlibat hanya memiliki satu instance.


## Frosted Glass Edition
Versi ini menggunakan tampilan glassmorphism bernuansa sage green, cream, dan lavender:
panel transparan, efek blur, highlight halus, sudut membulat, dan hover yang lembut.
Fungsi simulator, langkah Banker, diagram RAG, dan kuis dari versi sebelumnya dipertahankan.
Buka `index.html` di browser untuk mencoba secara lokal. Untuk publikasi, unggah folder project
ke layanan hosting static seperti GitHub Pages atau Netlify.


## Banker input controls
Pada versi ini, nilai Allocation, Max, dan Available awal dapat diedit. Tekan **Terapkan angka** untuk memvalidasi input dan menghitung ulang Need, lalu gunakan tombol langkah untuk menjalankan analisis. Untuk mencoba UNSAFE, coba Available awal A=0 dan B=0 dengan contoh Allocation/Max default. Max harus selalu lebih besar atau sama dengan Allocation.
