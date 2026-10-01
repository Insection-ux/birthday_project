/* =====================================================
   BIRTHDAY WEBSITE
   LYDIA PUTRI AYU NINGSIH ❤️
===================================================== */


/* =====================================================
   DATA GAME
===================================================== */

let currentQuestion = 0;


const questions = [

    {
        question: "Siapa orang yang paling aku sayangi? ❤️",

        correct: "Kamu ❤️",

        wrong: "Tetanggaku 😏"
    },


    {
        question:
            "Kalau punya waktu seharian, aku paling ingin menghabiskannya dengan siapa? ❤️",

        correct: "Sama kamu ❤️",

        wrong: "Sama komputer 💻"
    },


    {
        question:
            "Kalau aku boleh memilih satu hal untuk masa depan...",

        correct:
            "Terus membuat cerita bersamamu ❤️",

        wrong:
            "Menjadi jomblo selamanya 😂"
    },


    {
        question:
            "Menurutku, kamu itu...",

        correct:
            "Seseorang yang sangat berarti ❤️",

        wrong:
            "Teman biasa 😌"
    }

];



/* =====================================================
   TEKS TOMBOL SALAH
===================================================== */

const escapeTexts = [

    "Yakin? 😏",

    "Hehe, nggak boleh 😂",

    "Coba pilih yang lain 😌",

    "Bukan aku jawabannya 😭",

    "Masih ngejar?! 😂",

    "Kok masih maksa sih 😭",

    "Jawabannya sudah jelas ❤️",

    "UDAH PILIH YANG SATU LAGI ❤️"

];



/* =====================================================
   PINDAH HALAMAN
===================================================== */

function showPage(id) {

    const pages =
        document.querySelectorAll(".page");


    pages.forEach(function(page) {

        page.classList.remove("active");

    });


    const target =
        document.getElementById(id);


    if (target) {

        target.classList.add("active");

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



/* =====================================================
   MULAI GAME
===================================================== */

function startGame() {

    currentQuestion = 0;

    showPage("game");

    showQuestion();

}



/* =====================================================
   TAMPILKAN PERTANYAAN
===================================================== */

function showQuestion() {

    const data =
        questions[currentQuestion];


    if (!data) {

        showStory();

        return;

    }



    /* Pertanyaan */

    const question =
        document.getElementById("question");


    if (question) {

        question.textContent =
            data.question;

    }



    /* Nomor */

    const number =
        document.getElementById("questionNumber");


    if (number) {

        number.textContent =
            "Pertanyaan " +
            (currentQuestion + 1) +
            " dari " +
            questions.length;

    }



    /* Container jawaban */

    const answers =
        document.getElementById("answers");


    if (!answers) {

        return;

    }



    /* Bersihkan */

    answers.innerHTML = "";



    /* =================================================
       TOMBOL BENAR
    ================================================= */

    const correctButton =
        document.createElement("button");


    correctButton.type =
        "button";


    correctButton.className =
        "answer correct";


    correctButton.textContent =
        data.correct;


    correctButton.addEventListener(
        "click",
        nextQuestion
    );


    answers.appendChild(
        correctButton
    );



    /* =================================================
       TOMBOL SALAH
    ================================================= */

    const wrongButton =
        document.createElement("button");


    wrongButton.type =
        "button";


    wrongButton.className =
        "answer wrong";


    wrongButton.textContent =
        data.wrong;


    wrongButton.dataset.escapeCount =
        "0";



    /* Mouse */

    wrongButton.addEventListener(
        "mouseenter",
        moveWrongButton
    );



    /* Klik */

    wrongButton.addEventListener(
        "click",
        moveWrongButton
    );



    /* HP */

    wrongButton.addEventListener(
        "touchstart",
        moveWrongButton,
        {
            passive: false
        }
    );


    answers.appendChild(
        wrongButton
    );

}



/* =====================================================
   TOMBOL SALAH KABUR
===================================================== */

function moveWrongButton(event) {

    event.preventDefault();

    event.stopPropagation();


    const button =
        event.currentTarget;


    let count =
        Number(
            button.dataset.escapeCount
        );


    count++;


    button.dataset.escapeCount =
        String(count);



    /* Ganti teks */

    const index =
        Math.min(
            count - 1,
            escapeTexts.length - 1
        );


    button.textContent =
        escapeTexts[index];



    /* Ukuran */

    const width =
        button.offsetWidth;


    const height =
        button.offsetHeight;



    /* Batas layar */

    const maxX =
        Math.max(
            20,
            window.innerWidth -
            width -
            20
        );


    const maxY =
        Math.max(
            20,
            window.innerHeight -
            height -
            20
        );



    /* Posisi random */

    const x =
        20 +
        Math.random() *
        Math.max(
            1,
            maxX - 20
        );


    const y =
        20 +
        Math.random() *
        Math.max(
            1,
            maxY - 20
        );



    /* Jalankan */

    button.classList.add(
        "running"
    );


    button.style.position =
        "fixed";


    button.style.left =
        x + "px";


    button.style.top =
        y + "px";


    button.style.zIndex =
        "9999";



    /* Pesan tambahan */

    if (count === 3) {

        button.textContent =
            "Masih ngejar?! 😂";

    }


    if (count === 5) {

        button.textContent =
            "Tolong jangan pilih aku 😭";

    }


    if (count >= 7) {

        button.textContent =
            "UDAH PILIH YANG SATU LAGI ❤️";

    }

}



/* =====================================================
   PERTANYAAN BERIKUTNYA
===================================================== */

function nextQuestion() {

    currentQuestion++;


    if (
        currentQuestion <
        questions.length
    ) {

        showQuestion();

    }

    else {

        setTimeout(
            function() {

                showStory();

            },
            400
        );

    }

}



/* =====================================================
   OUR STORY
===================================================== */

function showStory() {

    showPage("story");

}



/* =====================================================
   FOTO
===================================================== */

function showPhoto(number) {

    if (
        number < 1 ||
        number > 8
    ) {

        return;

    }


    showPage(
        "photo" + number
    );

}



/* =====================================================
   VIDEO
===================================================== */

function showVideo(number) {

    if (
        number < 1 ||
        number > 3
    ) {

        return;

    }


    showPage(
        "video" + number
    );



    /* Hentikan video dari halaman lain */

    document
        .querySelectorAll("video")
        .forEach(function(video) {

            if (
                !video.closest(
                    "#video" + number
                )
            ) {

                video.pause();

            }

        });

}



/* =====================================================
   LETTER
===================================================== */

function showLetter() {

    showPage("letter");

}



/* =====================================================
   SPECIAL VIDEO
===================================================== */

function showSpecialVideo() {

    showPage("special");


    const video =
        document.getElementById(
            "specialVideo"
        );


    if (video) {

        video.currentTime = 0;

    }

}



/* =====================================================
   FINAL
===================================================== */

function showFinal() {

    const video =
        document.getElementById(
            "specialVideo"
        );


    if (video) {

        video.pause();

    }


    showPage("final");



    /* Banyak hati */

    for (
        let i = 0;
        i < 30;
        i++
    ) {

        setTimeout(
            createHeart,
            i * 100
        );

    }

}



/* =====================================================
   BUAT HATI
===================================================== */

function createHeart() {

    const container =
        document.getElementById(
            "hearts"
        );


    if (!container) {

        return;

    }


    const heart =
        document.createElement(
            "div"
        );


    heart.className =
        "heart";


    heart.textContent =
        "❤️";


    heart.style.left =
        Math.random() * 100 +
        "%";


    heart.style.fontSize =
        18 +
        Math.random() * 20 +
        "px";


    heart.style.animationDuration =
        3 +
        Math.random() * 4 +
        "s";


    container.appendChild(
        heart
    );


    setTimeout(
        function() {

            heart.remove();

        },
        7000
    );

}



/* =====================================================
   HATI OTOMATIS
===================================================== */

setInterval(
    createHeart,
    1200
);