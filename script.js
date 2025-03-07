// Motivational Quotes
const quotes = [
    "Push harder than yesterday if you want a different tomorrow! 🔥",
    "Sweat, smile, repeat! 😊",
    "Stronger every day! 💪",
    "No pain, no gain! 🚀",
    "The hardest lift is lifting yourself up! 🙌"
];

document.getElementById("quote").innerText = quotes[Math.floor(Math.random() * quotes.length)];

// Navigation
document.getElementById("startBtn").addEventListener("click", () => {
    document.querySelector(".welcome-screen").classList.add("hidden");
    document.getElementById("weekView").classList.remove("hidden");
});

function openDay(day) {
    document.getElementById("weekView").classList.add("hidden");
    document.getElementById("dayView").classList.remove("hidden");
    document.getElementById("dayTitle").innerText = `Workout Plan for ${day.charAt(0).toUpperCase() + day.slice(1)}`;
    loadWorkout(day);
}

document.getElementById("backBtn").addEventListener("click", () => {
    document.getElementById("dayView").classList.add("hidden");
    document.getElementById("weekView").classList.remove("hidden");
});

document.getElementById("historyBtn").addEventListener("click", () => {
    document.getElementById("weekView").classList.add("hidden");
    document.getElementById("historyView").classList.remove("hidden");
    loadHistory();
});

document.getElementById("historyBack").addEventListener("click", () => {
    document.getElementById("historyView").classList.add("hidden");
    document.getElementById("weekView").classList.remove("hidden");
});

// Workout Management
function loadWorkout(day) {
    let workouts = JSON.parse(localStorage.getItem(day)) || [];
    document.getElementById("workout-list").innerHTML = workouts.map((exercise, index) =>
        `<li>${exercise.name} - ${exercise.sets}x${exercise.reps} @ ${exercise.weight}kg <input type="checkbox" ${exercise.done ? "checked" : ""} onchange="toggleDone('${day}', ${index})"></li>`
    ).join("");
}

function addExercise() {
    let day = document.getElementById("dayTitle").innerText.split(" ")[2].toLowerCase();
    let newExercise = {
        name: document.getElementById("exerciseName").value,
        sets: document.getElementById("sets").value,
        reps: document.getElementById("reps").value,
        weight: document.getElementById("weight").value,
        done: false
    };
    let workouts = JSON.parse(localStorage.getItem(day)) || [];
    workouts.push(newExercise);
    localStorage.setItem(day, JSON.stringify(workouts));
    loadWorkout(day);
}

// History
