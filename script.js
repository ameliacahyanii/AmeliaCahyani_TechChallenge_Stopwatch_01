// Tunggu sampai semua HTML selesai dimuat baru jalananin scriptnya
$(document).ready(function () {
  // Variable untuk simpan waktu
  let hours = 0; 
  let minutes = 0;
  let seconds = 0;
  let miliseconds = 0;

  // Variable untuk simpan reference interval timer
  // Null = stopwatch lagi ngga jalan
  let timer = null;

  // Funsgi untuk update tampilan waktu di layar
  // Dipanggil setiap kali ada perubahan waktu
  function updateDisplay() {
    // Update jam, convery angka ke string terus tambhain "0" di depan kalau cuma 1 digit
    $("#hours").text(hours.toString().padStart(2, "0"));

    // Update menit, logicnya sama kayak hours
    $("#minutes").text(minutes.toString().padStart(2, "0"));

    // Update detik, logicnya sama kayak hours
    $("#seconds").text(seconds.toString().padStart(2, "0"));

    // Update milidetik, ditampilin sebagai centiseconds (1/100 detik)
    // Dibagi 10 karena kita increment per 10ms, jadi 0-990ms jadi 0-99
    // Math.floor buat bulatkan ke bawah
    $("#miliseconds").text(
      Math.floor(miliseconds / 10)
        .toString()
        .padStart(2, "0"),
    );
  }

  // Fungsi buat start / mulai stopwatch
  function startTimer() {
    // Cek dulu apakah timer udah jalan
    if (timer != null) return;

    // Bikin interval yang jalan setipa 10 milidetik
    // Fungsi di dalam ini akan dipanggil terus menerus setiap 10ms
    timer = setInterval(function () {
      miliseconds += 10;

      // Cek apakah milidetik udah sampai 1000 (1 detik)
      if (miliseconds === 1000) {
        miliseconds = 0;
        seconds++; // Naikin detik 1
      }

      // Cek apakah detik udah sampai 60 (1 menit)
      if (seconds === 60) {
        seconds = 0;
        minutes++; // Naikin menit 1
      }

      // Cek apakah menit udah sampai 60 (1 jam)
      if (minutes === 60) {
        minutes = 0;
        hours++; // Naikin jam 1
      }

      // Update tampilan di layar setiap kali ada perubahan
      updateDisplay();
    }, 10);
  }

  // Fungsi untuk pause/berhentiin stopwatch sementara
  // Waktu tetep kesimpan, cuma intervalnya yang di-stop
  function pauseTimer() {
    // clearInternal = stop interval yang lagi jalan
    // Timer yang di-pass bakal berhenti panggil fungsinya
    clearInterval(timer);

    // Set timer ke mull lagi, agar startTimer() bisa jalan lagi
    timer = null;
  }

  // Fungsi untuk reset stopwatch ke 00:00:00:00
  function resetTimer() {
    pauseTimer();

    // Reset semua variable waktu ke 0
    hours = 0;
    minutes = 0;
    seconds = 0;
    miliseconds = 0;

    // Update display biar yang keliatan di layar juga balike ke 00:00:00:00
    updateDisplay();
  }

  // Event listeer buat tombol start
  // Pas tombol diklik, jalanin fungsi startTimer
  $("#start").click(startTimer);

  // Event listeer buat tombol pause
  // Pas tombol diklik, jalanin fungsi pauseTimer
  $("#pause").click(pauseTimer);

  // Event listeer buat tombol reset
  // Pas tombol diklik, jalanin fungsi resetTimer
  $("#reset").click(resetTimer);

  // Panggil updateDisplat pas pertama kali load
  // Biar tampilan awal udah muncul 00:00:00:00 (bukan kosong)
  updateDisplay();
});
