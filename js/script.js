const HARGA_WORKSHOP = {
  frontend: { nama: "Front-End Web", harga: 150000 },
  uiux:     { nama: "UI/UX Design", harga: 125000 },
  cyber:    { nama: "Cybersecurity Dasar", harga: 175000 }
};
const DISKON_TIPE = { Mahasiswa: 0.20, Umum: 0 };
const MIN_WORKSHOP_BUNDLE = 3;
const DISKON_BUNDLE = 0.10;

const form = document.getElementById("formDaftar");
const boxRingkasan = document.getElementById("ringkasan");

const rupiah = (n) => "Rp " + n.toLocaleString("id-ID");

function setError(id, pesan) {
  document.getElementById("err-" + id).textContent = pesan;
  const input = document.getElementById(id);
  if (input) input.classList.toggle("is-invalid-eh", pesan !== "");
}

function validasi(data) {
  let valid = true;

  if (data.nama.trim() === "") { setError("nama", "Nama wajib diisi."); valid = false; }
  else setError("nama", "");

  if (data.email.trim() === "") { setError("email", "Email wajib diisi."); valid = false; }
  else if (!data.email.includes("@")) { setError("email", "Format email tidak valid."); valid = false; }
  else setError("email", "");

  const polaHp = /^(08|\+628)[0-9]{8,11}$/;
  if (!polaHp.test(data.hp.trim())) {
    setError("hp", "Nomor HP harus diawali 08 atau +628, panjang 10–13 digit.");
    valid = false;
  } else setError("hp", "");

  if (data.tanggal === "") { setError("tanggal", "Tanggal hadir wajib dipilih."); valid = false; }
  else setError("tanggal", "");

  const errW = document.getElementById("err-workshop");
  if (data.workshop.length === 0) { errW.textContent = "Pilih minimal satu workshop."; valid = false; }
  else errW.textContent = "";

  return valid;
}

function hitungBiaya(daftarWorkshop, tipe) {
  let subtotal = 0;
  const namaWorkshop = [];

  for (let i = 0; i < daftarWorkshop.length; i++) {
    const item = HARGA_WORKSHOP[daftarWorkshop[i]];
    subtotal += item.harga;
    namaWorkshop.push(item.nama);
  }

  let potongan = subtotal * DISKON_TIPE[tipe];
  if (daftarWorkshop.length >= MIN_WORKSHOP_BUNDLE) {
    potongan += subtotal * DISKON_BUNDLE;
  }
  return { subtotal, potongan, total: subtotal - potongan, namaWorkshop };
}

function tampilkanRingkasan(data, hasil) {
  boxRingkasan.innerHTML = "";

  const judul = document.createElement("h3");
  judul.className = "h5";
  judul.textContent = "Ringkasan pendaftaran";
  boxRingkasan.appendChild(judul);

  const dl = document.createElement("dl");
  const baris = [
    ["Nama", data.nama],
    ["Tipe peserta", data.tipe],
    ["Tanggal hadir", data.tanggal],
    ["Sesi", data.sesi],
    ["Workshop", hasil.namaWorkshop.join(", ")],
    ["Subtotal", rupiah(hasil.subtotal)],
    ["Diskon", "- " + rupiah(hasil.potongan)]
  ];
  baris.forEach(([label, isi]) => {
    const dt = document.createElement("dt");
    dt.textContent = label;
    const dd = document.createElement("dd");
    dd.textContent = isi;
    dl.append(dt, dd);
  });
  boxRingkasan.appendChild(dl);

  const total = document.createElement("p");
  total.className = "eh-total mb-0";
  total.textContent = "Total: " + rupiah(hasil.total);
  boxRingkasan.appendChild(total);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    nama: form.nama.value,
    email: form.email.value,
    hp: form.hp.value,
    tipe: form.tipe.value,
    tanggal: form.tanggal.value,
    sesi: form.sesi.value,
    workshop: Array.from(form.querySelectorAll('input[name="workshop"]:checked')).map(c => c.value)
  };

  if (!validasi(data)) return;

  tampilkanRingkasan(data, hitungBiaya(data.workshop, data.tipe));
});

form.addEventListener("reset", function () {
  ["nama", "email", "hp", "tanggal"].forEach(id => setError(id, ""));
  document.getElementById("err-workshop").textContent = "";
  boxRingkasan.innerHTML = '<h3 class="h5">Ringkasan pendaftaran</h3><p class="text-muted mb-0">Isi formulir lalu tekan Daftar. Ringkasan dan total biaya muncul di sini.</p>';
});
