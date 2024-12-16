$(document).ready(function() {
    // Menampilkan kotak input tugas
    $(".button-input").click(function() {
        $(".kotak-input-tugas").show();
    });
    
    // Menyembunyikan kotak input tugas saat tombol silang diklik
    $(".silang").click(function() {
        $(".kotak-input-tugas").hide();
    });

    // Menghandle perubahan file yang diupload dari tombol Browser
    $("#fileInput").change(function(event) {
        const files = event.target.files;
        handleFiles(files); // Panggil fungsi untuk memproses file
    });

    // Drag-and-drop area handling
    $(".area-input").on("dragover", function(event) {
        event.preventDefault();
        $(this).css("background-color", "#f0f0f0"); // Memberikan feedback visual
    });

    $(".area-input").on("dragleave", function(event) {
        event.preventDefault();
        $(this).css("background-color", ""); // Mengembalikan warna asli
    });

    $(".area-input").on("drop", function(event) {
        event.preventDefault();
        $(this).css("background-color", ""); // Mengembalikan warna asli

        // Mendapatkan file yang di-drop
        const files = event.originalEvent.dataTransfer.files;
        handleFiles(files); // Memproses file yang di-drop
    });
    function toggleMenuOnClick() {
        // Pastikan event handler sebelumnya dilepas terlebih dahulu
        $(".foto-pp").off("click");
        $(document).off("click");
    
        $(".foto-pp").click(function(event) {
            $(".menu-profil").slideToggle("fast");
            event.stopPropagation(); // Mencegah klik pada foto-pp menutup menu profil
        });
    
        $(document).click(function(event) {
            if (!$(event.target).closest('.foto-pp, .menu-profil').length) {
                $(".menu-profil").slideUp("fast"); // Menutup menu profil jika klik di luar
            }
        });
    }
    
    // Fungsi untuk memeriksa lebar layar dan mengaktifkan fungsionalitas jQuery
    function checkWindowWidth() {
        if (window.innerWidth < 950) {
            $(".menu-profil").hide(); // Sembunyikan menu profil saat layar kecil
            toggleMenuOnClick(); // Aktifkan jQuery jika lebar layar < 950px
        } else {
            $(".menu-profil").show(); // Tampilkan menu tanpa jQuery jika lebar layar >= 950px
            $(document).off("click"); // Nonaktifkan event klik di luar untuk lebar layar >= 950px
            $(".foto-pp").off("click"); // Pastikan event handler klik di foto-pp dilepas
        }
    }
    
    // Memeriksa ukuran layar pada saat load dan resize
    checkWindowWidth();
    $(window).resize(function() {
        checkWindowWidth();
    });
    
    
});

function handleFiles(files) {
    $(".detail-file-upload").empty(); // Kosongkan detail file upload sebelumnya

    for (let i = 0; i < files.length; i++) {
        // Membuat struktur HTML untuk setiap file
        const fileItem = `
            <div class="single-file">
                <div class="file-pilih">
                    <h5>${files[i].name}</h5>
                    <div class="loading"><div class="proses"></div></div>
                    <div class="detail-uk">
                        <div class="pause">Pause</div>
                        <div class="size">${(files[i].size / (1024 * 1024)).toFixed(2)} Mb</div>
                    </div>
                </div>
                <div class="btn-pause">
                    <img src="img/silang-bundar.svg" alt="">
                    <img src="img/pause-bundar.svg" alt="">
                </div>
            </div>
            <div class="line-batas"></div>
        `;

        // Menambahkan file item ke kontainer detail-file-upload
        $(".detail-file-upload").append(fileItem);
    }

    
}


