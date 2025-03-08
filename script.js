// Motivational Quotes
const quotes = [
    "Push yourself because no one else is going to do it for you!",
    "Don’t stop when you’re tired. Stop when you’re done!",
    "It’s a slow process, but quitting won’t speed it up.",
    "Sweat is just fat crying. Keep going!",
    "Strong today, stronger tomorrow!"
];

document.getElementById("motivational-quote").innerText = quotes[Math.floor(Math.random() * quotes.length)];

// Navigation
document.getElementById("start-btn").addEventListener("click", () => {
    document.getElementById("welcome-screen").classList.add("hidden");
    document.getElementById("main-menu").classList.remove("hidden");
});

// Store muscle group selection
document.querySelectorAll(".muscle-group").forEach(select => {
    select.addEventListener("change", () => {
        const day = select.previousElementSibling.dataset.day;
        const muscleGroup = select.value;
        localStorage.setItem(`${day}-muscleGroup`, muscleGroup);
    });
});

// Load saved muscle groups
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".muscle-group").forEach(select => {
        const day = select.previousElementSibling.dataset.day;
        const savedMuscleGroup = localStorage.getItem(`${day}-muscleGroup`);
        if (savedMuscleGroup) {
            select.value = savedMuscleGroup;
        }
    });
});

// Navigate to workout planner
document.querySelectorAll(".day-btn").forEach(button => {
    button.addEventListener("click", () => {
        const day = button.dataset.day;
        document.getElementById("workout-day-title").innerText = `Workout Plan for ${day}`;
        document.getElementById("main-menu").classList.add("hidden");
        document.getElementById("workout-page").classList.remove("hidden");
    });
});

// Back Button
document.getElementById("back-btn").addEventListener("click", () => {
    document.getElementById("workout-page").classList.add("hidden");
    document.getElementById("main-menu").classList.remove("hidden");
});
