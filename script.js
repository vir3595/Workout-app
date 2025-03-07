// Motivational Quotes
const quotes = [
    "Push harder than yesterday if you want a different tomorrow! 🔥",
    "Sweat, smile, repeat! 😊",
    "Stronger every day! 💪",
    "No pain, no gain! 🚀",
    "The hardest lift is lifting yourself up! 🙌"
];

// Show a random quote on load
document.getElementById("quote").innerText = quotes[Math.floor(Math.random() * quotes.length)];

// Event Listener for Start Button
document.getElementById("startBtn").addEventListener("click", () => {
    document.querySelector(".welcome-screen").classList.add("hidden");
    document.getElementById("weekView").classList.remove("hidden");
});

// Open specific day
function openDay(day) {
    document.getElementById("weekView").classList.add("hidden");
    document.getElementById("dayView").classList.remove("hidden");
    document.getElementById("dayTitle").innerText = `Workout Plan for ${day.charAt(0).toUpperCase() + day.slice(1)}`;

    loadWorkout(day);
}

// Back Button
document.getElementById("backBtn").addEventListener("click", () => {
    document.getElementById("dayView").classList.add("hidden");
    document.getElementById("weekView").classList.remove("hidden");
});

// Load and Save Workout Data
function loadWorkout(day) {
    const workoutList = document.getElementById("workout-list");
    workoutList.innerHTML = "";

    let workouts = JSON.parse(localStorage.getItem(day)) || [
        { name: "Bench Press", sets: 3, reps: 10, weight: 50, done: false },
        { name: "Squats", sets: 3, reps: 15, weight: 60, done: false },
        { name: "Deadlifts", sets: 3, reps: 8, weight: 80, done: false }
    ];

    workouts.forEach((exercise, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${exercise.name} - 
            ${exercise.sets} sets of ${exercise.reps} reps 
            @ ${exercise.weight}kg 
            <input type="checkbox" ${exercise.done ? "checked" : ""} onchange="toggleDone('${day}', ${index})">
        `;
        workoutList.appendChild(li);
    });

    localStorage.setItem(day, JSON.stringify(workouts));
}

// Toggle Completion
function toggleDone(day, index) {
    let workouts = JSON.parse(localStorage.getItem(day));
    workouts[index].done = !workouts[index].done;
    localStorage.setItem(day, JSON.stringify(workouts));
}

// Save Button
document.getElementById("saveWorkout").addEventListener("click", () => {
    alert("Workout Saved! ✅");
});
