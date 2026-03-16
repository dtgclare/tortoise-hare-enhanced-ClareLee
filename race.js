// render the track with tortoise aand hare emojis
const startBtn = document.getElementById("startBtn");
const messageEl = document.getElementById("message");
const trackEl = document.getElementById("track");

const TRACK_LENGTH = 70;

let tortoisePosition = 1;
let harePosition = 1;
let raceInterval = null;

startBtn.addEventListener("click", startRace);
// start the race with a button click
// trigger the move of the tortoise and hare evert second
function startRace() {
    tortoisePosition = 1;
    harePosition = 1;

    messageEl.textContent = "BANG !!!!!  AND THEY'RE OFF !!!!!";

    startBtn.disabled = true;

    if (raceIntervalId !== null) {
        clearInterval(raceIntervalId);
    }

    // run a race step every one second
    raceIntervalId = setInterval(raceStep, 1000);
}

// when one of the animals reach the end of the track, show result
function raceStep() {
    moveTortoise(); // move the tortoise randomly
    moveHare(); // move the hare randomly
    clampPositions(); // fix the position if they go beyond the race track
    renderTrack(); // render the track again with the new positions

    //check finish
    if (tortoisePosition >= TRACK_LENGTH || harePosition >= TRACK_LENGTH) {
        clearInterval(raceIntervalId);
        raceInterval;
        startBtn.disabled = false;
        showResult();
    }
}

function moveTortoise() {
    // random integer 1 - 10
    let roll = Math.floor(Math.random() * 10) + 1;

    if (roll >= 1 && roll <= 5) {
        // 1 - 5 fast plod
        tortoisePosition += 4;
    } else if (roll >= 6 && roll <= 7) {
        // 6 - 7 slip
        tortoisePosition -= 5;
    } else {
        // 8 - 10 slow plod
        tortoisePosition += 1;
    }
}

function moveHare() {
    // random integer 1 - 10
    let roll = Math.floor(Math.random() * 10) + 1;

    if (roll >= 1 && roll <= 2) {
        // 1 - 2 sleep
        // do nothing
    } else if (roll >= 3 && roll <= 4) {
        // 3 - 4 big hop
        harePosition += 9;
    } else if (roll === 5) {
        // 5 big slip
        harePosition -= 12;
    } else if (roll >= 6 && roll <= 8) {
        // small hop
        harePosition += 2;
    } else {
        // 9 - 10 small slip
        harePosition -= 4;
    }
}

function clampPositions() {
    // fit the position within the track
    const MIN_POSITION = 1;
    const MAX_POSITION = TRACK_LENGTH;

    tortoisePosition = Math.max(
        MIN_POSITION,
        Math.min(MAX_POSITION, tortoisePosition),
    );

    harePosition = Math.max(MIN_POSITION, Math.min(MAX_POSITION, harePosition));
}

// render the track with tortoise aand hare emojis
function renderTrack() {
    trackEl.innerHTML = "";

    for (let i = 1; i <= TRACK_LENGTH; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        const isTortoiseHere = tortoisePosition === i;
        const isHareHere = harePosition === i;

        if (isTortoiseHere && isHareHere) {
            cell.textContent = "💥";
            cell.classList.add("both");
        } else if (isTortoiseHere) {
            cell.textContent = "🐢";
            cell.classList.add("tortoise");
        } else if (isHareHere) {
            cell.textContent = "🐇";
            cell.classList.add("hare");
        }

        trackEl.appendChild(cell);
    }
}

function showResult() {
    if (tortoisePosition >= TRACK_LENGTH && harePosition >= TRACK_LENGTH) {
        messageEl.textContent = "It's a tie!";
    } else if (tortoisePosition >= TRACK_LENGTH) {
        messageEl.textContent = "TORTOISE WINS!!";
    } else if (harePosition >= TRACK_LENGTH) {
        messageEl.textContent = "HARE WINS!!";
    }
}

renderTrack();
