/* =========================================
   WHO PUT THAT THERE?
   Game Engine
========================================= */

"use strict";


/* =========================================
   GAME SETTINGS
========================================= */

const GAME_TIME = 60;

const POINTS_CORRECT = 1;
const POINTS_WRONG = 2;

const BEST_SCORE_KEY = "whoPutThatThereBestScore";
const THEME_KEY = "whoPutThatThereTheme";
const SOUND_KEY = "whoPutThatThereSound";


/* =========================================
   DOM ELEMENTS
========================================= */

const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const gameOverScreen = document.getElementById("gameOverScreen");

const startButton = document.getElementById("startButton");
const playAgainButton = document.getElementById("playAgainButton");
const homeButton = document.getElementById("homeButton");

const howToPlayButton = document.getElementById("howToPlayButton");
const modalStartButton = document.getElementById("modalStartButton");
const closeModalButton = document.getElementById("closeModalButton");

const howToPlayModal = document.getElementById("howToPlayModal");

const soundButton = document.getElementById("soundButton");
const themeButton = document.getElementById("themeButton");

const scoreElement = document.getElementById("score");
const comboElement = document.getElementById("combo");
const timerElement = document.getElementById("timer");

const timerCard = document.getElementById("timerCard");

const roomNameElement = document.getElementById("roomName");
const roomProgressElement = document.getElementById("roomProgress");

const gameRoom = document.getElementById("gameRoom");
const gameMessage = document.getElementById("gameMessage");

const finalScoreElement = document.getElementById("finalScore");
const finalBestScoreElement = document.getElementById("finalBestScore");
const finalFoundElement = document.getElementById("finalFound");
const finalRoomsElement = document.getElementById("finalRooms");

const startBestScoreElement = document.getElementById("startBestScore");
const newBestMessage = document.getElementById("newBestMessage");

const toast = document.getElementById("toast");


/* =========================================
   GAME STATE
========================================= */

let score = 0;
let combo = 0;
let timeLeft = GAME_TIME;

let totalFound = 0;
let roomsVisited = 0;

let currentRoomIndex = 0;
let currentRoomObjects = [];

let timerInterval = null;
let messageTimeout = null;
let toastTimeout = null;

let gameRunning = false;
let soundEnabled = true;

let audioContext = null;


/* =========================================
   ROOM DATA
========================================= */

const rooms = [

    {
        name: "Bedroom",

        background: `
            linear-gradient(
                180deg,
                #d9c4ad 0%,
                #d9c4ad 66%,
                #b58d70 66%,
                #b58d70 100%
            )
        `,

        objects: [

            {
                emoji: "🛏️",
                name: "bed",
                correct: false
            },

            {
                emoji: "🧸",
                name: "teddy bear",
                correct: false
            },

            {
                emoji: "📚",
                name: "books",
                correct: false
            },

            {
                emoji: "💡",
                name: "lamp",
                correct: false
            },

            {
                emoji: "🪴",
                name: "plant",
                correct: false
            },

            {
                emoji: "🖼️",
                name: "picture frame",
                correct: false
            },

            {
                emoji: "🧦",
                name: "sock",
                correct: false
            },

            {
                emoji: "🍳",
                name: "frying pan",
                correct: true
            },

            {
                emoji: "🪥",
                name: "toothbrush",
                correct: true
            },

            {
                emoji: "🥕",
                name: "carrot",
                correct: true
            },

            {
                emoji: "🎸",
                name: "guitar",
                correct: true
            },

            {
                emoji: "🧽",
                name: "sponge",
                correct: true
            }

        ]
    },


    {
        name: "Kitchen",

        background: `
            linear-gradient(
                180deg,
                #e6d5bd 0%,
                #e6d5bd 67%,
                #9e765d 67%,
                #9e765d 100%
            )
        `,

        objects: [

            {
                emoji: "🍳",
                name: "frying pan",
                correct: false
            },

            {
                emoji: "🍽️",
                name: "plate",
                correct: false
            },

            {
                emoji: "🥄",
                name: "spoon",
                correct: false
            },

            {
                emoji: "🧂",
                name: "salt",
                correct: false
            },

            {
                emoji: "🥛",
                name: "milk",
                correct: false
            },

            {
                emoji: "🍞",
                name: "bread",
                correct: false
            },

            {
                emoji: "🫖",
                name: "kettle",
                correct: false
            },

            {
                emoji: "🔪",
                name: "knife",
                correct: false
            },

            {
                emoji: "🧸",
                name: "teddy bear",
                correct: true
            },

            {
                emoji: "👟",
                name: "shoe",
                correct: true
            },

            {
                emoji: "🪥",
                name: "toothbrush",
                correct: true
            },

            {
                emoji: "🎒",
                name: "backpack",
                correct: true
            }

        ]
    },


    {
        name: "Classroom",

        background: `
            linear-gradient(
                180deg,
                #d9e1df 0%,
                #d9e1df 65%,
                #ad8968 65%,
                #ad8968 100%
            )
        `,

        objects: [

            {
                emoji: "📚",
                name: "books",
                correct: false
            },

            {
                emoji: "✏️",
                name: "pencil",
                correct: false
            },

            {
                emoji: "📓",
                name: "notebook",
                correct: false
            },

            {
                emoji: "🎒",
                name: "backpack",
                correct: false
            },

            {
                emoji: "📏",
                name: "ruler",
                correct: false
            },

            {
                emoji: "🖍️",
                name: "crayon",
                correct: false
            },

            {
                emoji: "🪑",
                name: "chair",
                correct: false
            },

            {
                emoji: "🧑‍🏫",
                name: "teacher",
                correct: false
            },

            {
                emoji: "🍳",
                name: "frying pan",
                correct: true
            },

            {
                emoji: "🛏️",
                name: "bed",
                correct: true
            },

            {
                emoji: "🧴",
                name: "shampoo",
                correct: true
            },

            {
                emoji: "🍌",
                name: "banana",
                correct: true
            }

        ]
    },


    {
        name: "Bathroom",

        background: `
            linear-gradient(
                180deg,
                #c9e1e2 0%,
                #c9e1e2 68%,
                #b7a28e 68%,
                #b7a28e 100%
            )
        `,

        objects: [

            {
                emoji: "🪥",
                name: "toothbrush",
                correct: false
            },

            {
                emoji: "🧴",
                name: "shampoo",
                correct: false
            },

            {
                emoji: "🧼",
                name: "soap",
                correct: false
            },

            {
                emoji: "🧻",
                name: "toilet paper",
                correct: false
            },

            {
                emoji: "🪞",
                name: "mirror",
                correct: false
            },

            {
                emoji: "🧺",
                name: "laundry basket",
                correct: false
            },

            {
                emoji: "🧽",
                name: "sponge",
                correct: false
            },

            {
                emoji: "🪒",
                name: "razor",
                correct: false
            },

            {
                emoji: "🍳",
                name: "frying pan",
                correct: true
            },

            {
                emoji: "📚",
                name: "books",
                correct: true
            },

            {
                emoji: "👟",
                name: "shoe",
                correct: true
            },

            {
                emoji: "🎸",
                name: "guitar",
                correct: true
            }

        ]
    },


    {
        name: "Living Room",

        background: `
            linear-gradient(
                180deg,
                #d7c7ba 0%,
                #d7c7ba 64%,
                #9b765d 64%,
                #9b765d 100%
            )
        `,

        objects: [

            {
                emoji: "🛋️",
                name: "sofa",
                correct: false
            },

            {
                emoji: "📺",
                name: "television",
                correct: false
            },

            {
                emoji: "🪴",
                name: "plant",
                correct: false
            },

            {
                emoji: "🕯️",
                name: "candle",
                correct: false
            },

            {
                emoji: "📚",
                name: "books",
                correct: false
            },

            {
                emoji: "🖼️",
                name: "picture",
                correct: false
            },

            {
                emoji: "🛋️",
                name: "chair",
                correct: false
            },

            {
                emoji: "🧸",
                name: "small pillow",
                correct: false
            },

            {
                emoji: "🍳",
                name: "frying pan",
                correct: true
            },

            {
                emoji: "🪥",
                name: "toothbrush",
                correct: true
            },

            {
                emoji: "🧹",
                name: "broom",
                correct: true
            },

            {
                emoji: "🥕",
                name: "carrot",
                correct: true
            }

        ]
    }

];


/* =========================================
   UTILITY FUNCTIONS
========================================= */

function getBestScore() {

    const saved = Number(
        localStorage.getItem(BEST_SCORE_KEY)
    );

    return Number.isFinite(saved) && saved > 0
        ? saved
        : 0;
}


function setBestScore(value) {

    localStorage.setItem(
        BEST_SCORE_KEY,
        String(value)
    );
}


function showScreen(screen) {

    startScreen.classList.remove("active");
    gameScreen.classList.remove("active");
    gameOverScreen.classList.remove("active");

    screen.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function clamp(value, min, max) {

    return Math.min(
        Math.max(value, min),
        max
    );
}


/* =========================================
   SHUFFLING
========================================= */

function shuffle(array) {

    const copy = [...array];

    for (
        let i = copy.length - 1;
        i > 0;
        i--
    ) {

        const j = Math.floor(
            Math.random() * (i + 1)
        );

        [
            copy[i],
            copy[j]
        ] = [
            copy[j],
            copy[i]
        ];
    }

    return copy;
}


/* =========================================
   AUDIO
========================================= */

function initAudio() {

    if (!soundEnabled) {
        return;
    }

    if (!audioContext) {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        if (!AudioContext) {
            return;
        }

        audioContext = new AudioContext();
    }

    if (
        audioContext.state === "suspended"
    ) {

        audioContext.resume();
    }
}


function playTone(
    frequency,
    duration = 0.08,
    type = "sine",
    volume = 0.045
) {

    if (!soundEnabled) {
        return;
    }

    initAudio();

    if (!audioContext) {
        return;
    }

    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();

    oscillator.type = type;

    oscillator.frequency.setValueAtTime(
        frequency,
        audioContext.currentTime
    );

    gain.gain.setValueAtTime(
        volume,
        audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + duration
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();

    oscillator.stop(
        audioContext.currentTime + duration
    );
}


function playCorrectSound() {

    playTone(
        620,
        0.07,
        "sine",
        0.04
    );

    setTimeout(() => {

        playTone(
            820,
            0.09,
            "sine",
            0.035
        );

    }, 55);
}


function playWrongSound() {

    playTone(
        180,
        0.12,
        "sawtooth",
        0.025
    );
}


function playGameOverSound() {

    playTone(
        330,
        0.1,
        "sine",
        0.035
    );

    setTimeout(() => {

        playTone(
            220,
            0.18,
            "sine",
            0.03
        );

    }, 100);
}


/* =========================================
   SOUND BUTTON
========================================= */

function updateSoundButton() {

    soundButton.textContent =
        soundEnabled
            ? "🔊"
            : "🔇";

    soundButton.setAttribute(
        "aria-label",
        soundEnabled
            ? "Mute sound"
            : "Turn sound on"
    );
}


function toggleSound() {

    soundEnabled = !soundEnabled;

    localStorage.setItem(
        SOUND_KEY,
        String(soundEnabled)
    );

    updateSoundButton();

    if (soundEnabled) {

        initAudio();

        playTone(
            600,
            0.08,
            "sine",
            0.03
        );

        showToast("Sound on 🔊");

    } else {

        showToast("Sound off 🔇");
    }
}


/* =========================================
   THEME
========================================= */

function loadTheme() {

    const savedTheme =
        localStorage.getItem(THEME_KEY);

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        themeButton.textContent = "☀️";

    } else {

        document.body.classList.remove("dark");

        themeButton.textContent = "🌙";
    }
}


function toggleTheme() {

    const isDark =
        document.body.classList.toggle("dark");

    localStorage.setItem(
        THEME_KEY,
        isDark ? "dark" : "light"
    );

    themeButton.textContent =
        isDark
            ? "☀️"
            : "🌙";
}


/* =========================================
   GAME START
========================================= */

function startGame() {

    initAudio();

    score = 0;
    combo = 0;
    timeLeft = GAME_TIME;

    totalFound = 0;
    roomsVisited = 0;

    currentRoomIndex = 0;

    gameRunning = true;

    newBestMessage.classList.add("hidden");

    updateHUD();

    showScreen(gameScreen);

    loadRoom();

    startTimer();

    playTone(
        520,
        0.1,
        "sine",
        0.035
    );
}


/* =========================================
   TIMER
========================================= */

function startTimer() {

    stopTimer();

    timerInterval = setInterval(() => {

        if (!gameRunning) {
            return;
        }

        timeLeft--;

        updateTimer();

        if (timeLeft <= 10) {

            timerCard.classList.add(
                "warning"
            );

        }

        if (timeLeft <= 0) {

            endGame();
        }

    }, 1000);
}


function stopTimer() {

    if (timerInterval !== null) {

        clearInterval(
            timerInterval
        );

        timerInterval = null;
    }
}


function updateTimer() {

    timerElement.textContent =
        Math.max(
            0,
            timeLeft
        );
}


/* =========================================
   HUD
========================================= */

function updateHUD() {

    scoreElement.textContent =
        score;

    comboElement.textContent =
        combo;

    updateTimer();
}


/* =========================================
   LOAD ROOM
========================================= */

function loadRoom() {

    if (!gameRunning) {
        return;
    }

    const room =
        rooms[
            currentRoomIndex %
            rooms.length
        ];

    roomsVisited++;

    roomNameElement.textContent =
        room.name;

    roomProgressElement.textContent =
        `Room ${roomsVisited}`;

    gameRoom.style.background =
        room.background;

    gameRoom.innerHTML = "";

    currentRoomObjects =
        shuffle(room.objects);

    const positions =
        generatePositions(
            currentRoomObjects.length
        );

    currentRoomObjects.forEach(
        (object, index) => {

            createGameObject(
                object,
                positions[index]
            );
        }
    );

    currentRoomIndex++;

}


/* =========================================
   POSITION GENERATION
========================================= */

function generatePositions(count) {

    const positions = [];

    const cols = 4;
    const rows = 3;

    const cellWidth =
        100 / cols;

    const cellHeight =
        100 / rows;

    const shuffledCells =
        shuffle(
            Array.from(
                {
                    length:
                        cols * rows
                },
                (_, index) => index
            )
        );

    for (
        let i = 0;
        i < count;
        i++
    ) {

        const cell =
            shuffledCells[i];

        const row =
            Math.floor(
                cell / cols
            );

        const col =
            cell % cols;

        const jitterX =
            (Math.random() * 30) - 15;

        const jitterY =
            (Math.random() * 25) - 12.5;

        const x =
            clamp(
                col * cellWidth +
                cellWidth / 2 +
                jitterX / 2,
                8,
                92
            );

        const y =
            clamp(
                row * cellHeight +
                cellHeight / 2 +
                jitterY / 2,
                10,
                90
            );

        positions.push({
            x,
            y
        });
    }

    return positions;
}


/* =========================================
   CREATE GAME OBJECT
========================================= */

function createGameObject(
    object,
    position
) {

    const button =
        document.createElement("button");

    button.type = "button";

    button.className =
        "game-object";

    button.textContent =
        object.emoji;

    button.setAttribute(
        "aria-label",
        object.name
    );

    button.dataset.correct =
        object.correct
            ? "true"
            : "false";

    button.dataset.name =
        object.name;

    button.style.left =
        `${position.x}%`;

    button.style.top =
        `${position.y}%`;

    button.addEventListener(
        "click",
        () => {

            handleObjectClick(
                button
            );

        },
        {
            once: true
        }
    );

    gameRoom.appendChild(
        button
    );
}


/* =========================================
   OBJECT CLICK
========================================= */

function handleObjectClick(button) {

    if (!gameRunning) {
        return;
    }

    if (
        button.classList.contains(
            "found"
        )
    ) {
        return;
    }

    const isCorrect =
        button.dataset.correct === "true";

    if (isCorrect) {

        handleCorrectClick(
            button
        );

    } else {

        handleWrongClick(
            button
        );
    }
}


/* =========================================
   CORRECT ANSWER
========================================= */

function handleCorrectClick(button) {

    score += POINTS_CORRECT;

    combo++;

    totalFound++;

    button.classList.add(
        "found"
    );

    playCorrectSound();

    showGameMessage(
        combo >= 3
            ? `+1  🔥 ${combo} combo!`
            : "+1  Nice!",
        "correct"
    );

    updateHUD();

    /*
        Small bonus feedback after a streak.
    */

    if (combo === 5) {

        score += 2;

        showToast(
            "5 in a row! +2 bonus 🔥"
        );

        playTone(
            900,
            0.1,
            "sine",
            0.035
        );

        updateHUD();
    }

    /*
        Check if every misplaced
        object in the room has
        already been found.
    */

    const remainingWrongObjects =
        [...gameRoom.querySelectorAll(
            ".game-object:not(.found)"
        )]
        .filter(
            element =>
                element.dataset.correct === "true"
        );

    if (
        remainingWrongObjects.length === 0
    ) {

        setTimeout(() => {

            if (!gameRunning) {
                return;
            }

            showToast(
                "Room cleared! 🧹"
            );

            loadRoom();

        }, 350);
    }
}


/* =========================================
   WRONG ANSWER
========================================= */

function handleWrongClick(button) {

    score = Math.max(
        0,
        score - POINTS_WRONG
    );

    combo = 0;

    button.classList.add(
        "wrong"
    );

    playWrongSound();

    showGameMessage(
        "-2  Not that one!",
        "wrong"
    );

    updateHUD();

    /*
        Prevent repeated accidental
        clicking of the same object.
    */

    setTimeout(() => {

        button.classList.remove(
            "wrong"
        );

    }, 400);
}


/* =========================================
   GAME MESSAGE
========================================= */

function showGameMessage(
    message,
    type
) {

    clearTimeout(
        messageTimeout
    );

    gameMessage.textContent =
        message;

    gameMessage.className =
        `game-message show ${type}`;

    messageTimeout =
        setTimeout(() => {

            gameMessage.classList.remove(
                "show"
            );

        }, 650);
}


/* =========================================
   END GAME
========================================= */

function endGame() {

    if (!gameRunning) {
        return;
    }

    gameRunning = false;

    stopTimer();

    timerCard.classList.remove(
        "warning"
    );

    playGameOverSound();

    const previousBest =
        getBestScore();

    const isNewBest =
        score > previousBest;

    if (isNewBest) {

        setBestScore(score);
    }

    finalScoreElement.textContent =
        score;

    finalBestScoreElement.textContent =
        isNewBest
            ? score
            : previousBest;

    finalFoundElement.textContent =
        totalFound;

    finalRoomsElement.textContent =
        roomsVisited;

    if (isNewBest && score > 0) {

        newBestMessage.classList.remove(
            "hidden"
        );

        setTimeout(() => {

            playTone(
                700,
                0.08,
                "sine",
                0.035
            );

            setTimeout(() => {

                playTone(
                    950,
                    0.12,
                    "sine",
                    0.035
                );

            }, 90);

        }, 250);

    } else {

        newBestMessage.classList.add(
            "hidden"
        );
    }

    showScreen(
        gameOverScreen
    );
}


/* =========================================
   HOME
========================================= */

function goHome() {

    gameRunning = false;

    stopTimer();

    timerCard.classList.remove(
        "warning"
    );

    updateStartScreen();

    showScreen(
        startScreen
    );
}


/* =========================================
   START SCREEN
========================================= */

function updateStartScreen() {

    startBestScoreElement.textContent =
        getBestScore();
}


/* =========================================
   HOW TO PLAY MODAL
========================================= */

function openHowToPlay() {

    howToPlayModal.classList.add(
        "active"
    );

    howToPlayModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";
}


function closeHowToPlay() {

    howToPlayModal.classList.remove(
        "active"
    );

    howToPlayModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";
}


/* =========================================
   TOAST
========================================= */

function showToast(message) {

    clearTimeout(
        toastTimeout
    );

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );

    toastTimeout =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 1800);
}


/* =========================================
   KEYBOARD SUPPORT
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            howToPlayModal.classList.contains(
                "active"
            )
        ) {

            closeHowToPlay();
        }

        if (
            event.key === "Enter" &&
            howToPlayModal.classList.contains(
                "active"
            )
        ) {

            closeHowToPlay();
        }
    }
);


/* =========================================
   EVENT LISTENERS
========================================= */

startButton.addEventListener(
    "click",
    startGame
);

playAgainButton.addEventListener(
    "click",
    startGame
);

homeButton.addEventListener(
    "click",
    goHome
);

howToPlayButton.addEventListener(
    "click",
    openHowToPlay
);

modalStartButton.addEventListener(
    "click",
    () => {

        closeHowToPlay();

        startGame();
    }
);

closeModalButton.addEventListener(
    "click",
    closeHowToPlay
);

soundButton.addEventListener(
    "click",
    toggleSound
);

themeButton.addEventListener(
    "click",
    toggleTheme
);


/* =========================================
   MODAL BACKDROP CLICK
========================================= */

howToPlayModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            howToPlayModal
        ) {

            closeHowToPlay();
        }
    }
);


/* =========================================
   LOAD SAVED SETTINGS
========================================= */

function loadSavedSettings() {

    const savedSound =
        localStorage.getItem(
            SOUND_KEY
        );

    if (savedSound !== null) {

        soundEnabled =
            savedSound !== "false";
    }

    updateSoundButton();

    loadTheme();

    updateStartScreen();
}


/* =========================================
   INITIALIZE
========================================= */

loadSavedSettings();

showScreen(
    startScreen
);
