# EVENTHUB

UTS Pemrograman Web.

Nama : Janice Nicole
NIM  : 03082240026

EVENTHUB adalah halaman web untuk melihat info workshop informatika dan daftar sebagai peserta. Dibuat pakai HTML, CSS, Bootstrap, dan JavaScript biasa. Setelah form diisi, ringkasan dan total biaya langsung muncul di halaman yang sama.

## Cara kerja web (Browser, Web Server, Response)

1. Kita buka alamat web di browser.
2. Browser kirim request ke web server, minta file yang dituju, misalnya index.html.
3. Web server cari filenya, lalu kirim balik response. Isinya kode status (misalnya 200 kalau berhasil) dan file yang diminta.
4. Browser baca index.html. Kalau di dalamnya ada file CSS, JavaScript, atau gambar, browser minta lagi satu per satu ke server.
5. Browser menampilkan halamannya dan menjalankan JavaScript.

Di proyek ini Bootstrap diambil dari CDN, jadi saat halaman dibuka browser juga minta file Bootstrap ke server CDN.

## Struktur folder

```
03082240026_Janice_UTSWeb/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
    └── image.png
```

- index.html : halaman utama (navbar, info, kartu workshop, tabel jadwal, form)
- css/style.css : tampilan buatan sendiri
- js/script.js : validasi form, hitung biaya, dan ringkasan
- assets/image.png : gambar di bagian atas halaman

## Biaya

- Front-End Web : Rp 150.000
- UI/UX Design : Rp 125.000
- Cybersecurity Dasar : Rp 175.000

Angka ini ada di bagian atas js/script.js.

## Cara jalankan

Buka index.html di browser. Harus ada internet karena Bootstrap dari CDN.