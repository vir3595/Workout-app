document.addEventListener("DOMContentLoaded", () => {
    loadQuote();
    resetWeeklyStatus();
});

function loadQuote() {
    const quotes = [
        "No pain, no gain! 💪",
        "Push yourself, because no one else will do it for you. 🚀",
        "Your body achieves what your mind believes. 🏋️",
        "Excuses don’t burn calories! 🔥"
    ];
    document.getElementById("motivational-quote").innerText = quotes[Math.floor(Math.random() * quotes.length)];
}

function startWorkout() {
    document.getElementById("welcome-screen").classList.add("hidden");
    document.getElementById("weekly-menu").classList.remove("hidden");
}

function openWorkout(day) {
    document.getElementById("weekly-menu").classList.add("hidden");
    document.getElementById("workout-planner").classList.remove("hidden");
    document.getElementById("workout-day-title").innerText = `Workout Plan for ${day}`;
    loadExercises(day);
}

function goBack() {
    document.getElementById("workout-planner").classList.add("hidden");
    document.getElementById("weekly-menu").classList.remove("hidden");
}

function goBackToMenu() {
    document.getElementById("weekly-progress").classList.add("hidden");
    document.getElementById("weekly-menu").classList.remove("hidden");
}

function addExercise() {
    const day = document.getElementById("workout-day-title").innerText.replace("Workout Plan for ", "");
    const name = document.getElementById("exercise-name").value;
    const sets = document.getElementById("exercise-sets").value;
    const reps = document.getElementById("exercise-reps").value;
    const weight = document.getElementById("exercise-weight").value;
    
    if (name && sets && reps && weight) {
        let exercises = JSON.parse(localStorage.getItem(day)) || [];
        exercises.push({ name, sets, reps, weight, status: "❌" });
        localStorage.setItem(day, JSON.stringify(exercises));
        loadExercises(day);
    }
}

function loadExercises(day) {
    const tableBody = document.querySelector("#workout-table tbody");
    tableBody.innerHTML = "";
    let exercises = JSON.parse(localStorage.getItem(day)) || [];
    
    exercises.forEach((exercise, index) => {
        let row = tableBody.insertRow();
        row.innerHTML = `
            <td>${exercise.name}</td>
            <td>${exercise.sets}</td>
            <td>${exercise.reps}</td>
            <td>${exercise.weight} kg</td>
            <td onclick="toggleStatus('${day}', ${index})">${exercise.status}</td>
        `;
    });
}

function toggleStatus(day, index) {
    let exercises = JSON.parse(localStorage.getItem(day));
    exercises[index].status = exercises[index].status === "❌" ? "✅" : "❌";
    localStorage.setItem(day, JSON.stringify(exercises));
    loadExercises(day);
}

function resetWeeklyStatus() {
    const lastReset = localStorage.getItem("lastReset");
    const currentWeek = new Date().getWeek();
    
    if (lastReset != currentWeek) {
        ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].forEach(day => {
            let exercises = JSON.parse(localStorage.getItem(day)) || [];
            exercises.forEach(ex => ex.status = "❌");
            localStorage.setItem(day, JSON.stringify(exercises));
        });
        localStorage.setItem("lastReset", currentWeek);
    }
}

function viewProgress() {
    document.getElementById("weekly-menu").classList.add("hidden");
    document.getElementById("weekly-progress").classList.remove("hidden");
    let progressContainer = document.getElementById("progress-container");
    progressContainer.innerHTML = "";

    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].forEach(day => {
        let exercises = JSON.parse(localStorage.getItem(day)) || [];
        if (exercises.length) {
            progressContainer.innerHTML += `<h3>${day}</h3>`;
            exercises.forEach(ex => {
                progressContainer.innerHTML += `<p>${ex.name} - ${ex.sets}x${ex.reps} (${ex.weight} kg) - ${ex.status}</p>`;
            });
        }
    });
}
