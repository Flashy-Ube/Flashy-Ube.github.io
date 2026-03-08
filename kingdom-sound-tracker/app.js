// -------------------
// Example journal entries preload
// -------------------
if (!localStorage.getItem("journalEntries")) {
    const exampleData = {
        "6/9/2026": [
            "Today I removed secular music from my playlist.",
            "Spent time composing worship melodies."
        ],
        "6/8/2026": [
            "Fast day 3 was difficult but productive."
        ]
    };
    localStorage.setItem("journalEntries", JSON.stringify(exampleData));
}

// -------------------
// Daily Scripture
// -------------------
const scriptures = [
    "Psalm 101:3 — I will set no wicked thing before my eyes",
    "Romans 12:2 — Be transformed by renewing your mind",
    "Philippians 4:8 — Think on what is pure"
];
function showRandomVerse() {
    const verse = scriptures[Math.floor(Math.random() * scriptures.length)];
    document.getElementById("verse").innerText = verse;
}

// -------------------
// Start Fast
// -------------------
function startFast() {
    const length = parseInt(document.getElementById("fastLength").value);
    const items = Array.from(document.querySelectorAll("input[type=checkbox]:checked"))
        .map(box => box.value);

    const fastData = { length, items, startDate: new Date().toISOString() };
    localStorage.setItem("fastData", JSON.stringify(fastData));
    alert("Your fast has started!");
    loadFastProgress();
    loadFastTimeline();
    showFastDay();
}

// -------------------
// Fast Progress
// -------------------
function loadFastProgress() {
    const fastData = JSON.parse(localStorage.getItem("fastData"));
    if (!fastData) return;

    const start = new Date(fastData.startDate);
    const today = new Date();
    let daysPassed = Math.floor((today - start)/(1000*60*60*24)) + 1;
    if (daysPassed > fastData.length) daysPassed = fastData.length;

    document.getElementById("dayCounter").innerText = `Day ${daysPassed} / ${fastData.length}`;
    document.getElementById("progressFill").style.width = (daysPassed / fastData.length * 100) + "%";

    const checkins = JSON.parse(localStorage.getItem("checkins")) || {};
    const total = Object.keys(checkins).length;
    let success = Object.values(checkins).filter(v => v).length;
    let purity = total ? Math.round(success / total * 100) : 100;
    document.getElementById("purityScore").innerText = `Sound Purity Score: ${purity}%`;
}

// -------------------
// Check-In
// -------------------
function checkIn(success) {
    const today = new Date().toDateString();
    const checkins = JSON.parse(localStorage.getItem("checkins")) || {};
    checkins[today] = success;
    localStorage.setItem("checkins", JSON.stringify(checkins));
    document.getElementById("checkStatus").innerText = "Check-in saved for today.";
    loadFastProgress();
    loadFastTimeline();
}

// -------------------
// Fast Timeline
// -------------------
function loadFastTimeline() {
    const fastData = JSON.parse(localStorage.getItem("fastData"));
    if (!fastData) return;

    const timelineDiv = document.getElementById("fastTimeline");
    timelineDiv.innerHTML = "";

    const start = new Date(fastData.startDate);
    const today = new Date();
    const checkins = JSON.parse(localStorage.getItem("checkins")) || {};

    for (let i=0; i<fastData.length; i++) {
        const dayDate = new Date(start);
        dayDate.setDate(start.getDate() + i);
        const dateKey = dayDate.toDateString();

        const dayDiv = document.createElement("div");
        dayDiv.className = "timelineDay";

        let label = `Day ${i+1}`;
        if (checkins[dateKey] === true) label += " ✔";
        else if (checkins[dateKey] === false) label += " ✘";
        if (dayDate.toDateString() === today.toDateString()) label += " (today)";

        dayDiv.innerText = label;
        timelineDiv.appendChild(dayDiv);
    }
}

// -------------------
// Show Fast Day Label
// -------------------
function showFastDay() {
    const fastData = JSON.parse(localStorage.getItem("fastData"));
    if (!fastData) return;
    const start = new Date(fastData.startDate);
    const today = new Date();
    const day = Math.floor((today - start)/(1000*60*60*24)) + 1;
    document.getElementById("fastDayLabel").innerText = `Fast Day ${day}`;
}

// -------------------
// Journal
// -------------------
// Save a reflection
function saveJournal() {
    const entry = document.getElementById("journal").value.trim();
    if (!entry) {
        document.getElementById("saveStatus").innerText = "Write something first.";
        return;
    }

    const today = new Date().toLocaleDateString();
    const journalData = JSON.parse(localStorage.getItem("journalEntries")) || {};
    if (!journalData[today]) journalData[today] = [];
    journalData[today].push(entry);
    localStorage.setItem("journalEntries", JSON.stringify(journalData));

    document.getElementById("journal").value = "";
    document.getElementById("saveStatus").innerText = "Entry saved!";
    displayEntries();
}

// -------------------
// Display all saved reflections
// -------------------
function displayEntries() {
    const journalData = JSON.parse(localStorage.getItem("journalEntries")) || {};
    let output = "";

    // Sort dates descending so newest is first
    const sortedDates = Object.keys(journalData).sort((a,b) => new Date(b) - new Date(a));

    sortedDates.forEach(date => {
        output += `<div class="journalDay"><h4>${date}</h4>`;
        journalData[date].forEach(entry => {
            output += `<div class="journalEntry">${entry}</div>`;
        });
        output += `</div>`;
    });

    document.getElementById("pastEntries").innerHTML = output;
}




function loadTodayEntry() {
    const today = new Date().toLocaleDateString();
    const entries = JSON.parse(localStorage.getItem("journalEntries")) || {};
    if (entries[today]) {
        document.getElementById("journal").value = entries[today].join("\n");
    }
}

// -------------------
// Load entries when page opens
// -------------------
window.addEventListener("load", displayEntries);

// -------------------
// On Page Load
// -------------------
window.addEventListener("load", () => {
    showRandomVerse();
    displayEntries();
    loadTodayEntry();
    loadFastProgress();
    loadFastTimeline();
    showFastDay();
});