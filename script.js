const quotes = [
    "No pain, no gain!",
    "Your only limit is you.",
    "Sweat, smile, repeat.",
    "Push yourself because no one else will!",
    "Train insane or remain the same."
];

// Display random motivational quote
document.getElementById("quote").innerText = quotes[Math.floor(Math.random() * quotes.length)];

// Screen transitions
document.getElementById("start-btn").addEventListener("click", () => {
    document.getElementById("welcome-screen").classList.add("hidden");
    document.getElementById("weekly-planner").classList.remove("hidden");
});

// Store workouts
let workouts = JSON.parse(localStorage.getItem("workouts")) || {};

// Check if it's a new week (Reset Status)
const lastReset = localStorage.getItem("lastReset");
const currentWeek = new Date().getWeek();
if (!lastReset || lastReset < currentWeek) {
    for (let day in workouts) {
        workouts[day].forEach(workout => workout.done = false);
    }
    localStorage.setItem("workouts", JSON.stringify(workouts));
    localStorage.setItem("lastReset", currentWeek);
}

// Handle day button clicks
document.querySelectorAll(".day-btn").forEach(button => {
    button.addEventListener("click", () => {
        const day = button.getAttribute("data-day");
        loadWorkoutDay(day);
    });
});

function loadWorkoutDay(day) {
    document.getElementById("weekly-planner").classList.add("hidden");
    document.getElementById("workout-day").classList.remove("hidden");
    document.getElementById("workout-day-title").innerText = `Workout for ${day}`;

    // Populate workouts
    const workoutList = document.getElementById("workout-list");
    workoutList.innerHTML = "";

    (workouts[day] || []).forEach((workout, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${workout.exercise} - ${workout.weight}kg x ${workout.reps} 
                        <button class="done-btn" data-day="${day}" data-index="${index}">
                            ${workout.done ? "✅" : "❌"}
                        </button>`;
        workoutList.appendChild(li);
    });

    // Handle workout completion toggle
    document.querySelectorAll(".done-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            const day = this.getAttribute("data-day");
            const index = this.getAttribute("data-index");
            workouts[day][index].done = !workouts[day][index].done;
            localStorage.setItem("workouts", JSON.stringify(workouts));
            loadWorkoutDay(day); // Refresh UI
        });
    });

    // Handle adding a workout
    document.getElementById("add-workout").addEventListener("click", () => {
        const exercise = document.getElementById("exercise").value;
        const weight = document.getElementById("weight").value;
        const reps = document.getElementById("reps").value;

        if (exercise && weight && reps) {
            workouts[day] = workouts[day] || [];
            workouts[day].push({ exercise, weight, reps, done: false });
            localStorage.setItem("workouts", JSON.stringify(workouts));
            loadWorkoutDay(day);
        }
    });
}

// Back button to weekly planner
document.getElementById("back-btn").addEventListener("click", () => {
    document.getElementById("workout-day").classList.add("hidden");
    document.getElementById("weekly-planner").classList.remove("hidden");
});

// Get current week number function
Date.prototype.getWeek = function () {
    let d = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - d) / 86400000) + d.getDay() + 1) / 7);
};
