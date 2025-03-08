document.addEventListener("DOMContentLoaded", function() {
    const quotes = [
        "Push yourself, because no one else will do it for you! 🔥",
        "It’s a slow process, but quitting won’t speed it up! 💪",
        "Every rep counts, keep going! 🏋️‍♂️",
        "Be stronger than your excuses! 🚀",
        "Your only limit is your mind. Keep pushing! 🏆"
    ];
    document.getElementById("motivational-quote").innerText = quotes[Math.floor(Math.random() * quotes.length)];

    const startButton = document.getElementById("start-planning");
    const weeklyMenu = document.getElementById("weekly-menu");
    const workoutPlanner = document.getElementById("workout-planner");
    const weeklyProgress = document.getElementById("weekly-progress");
    const progressButton = document.getElementById("progress-button");
    const backToMainButton = document.getElementById("back-to-main");
    const backToMenuButton = document.getElementById("back-to-menu");
    
    startButton.addEventListener("click", () => {
        document.getElementById("welcome-screen").classList.add("hidden");
        weeklyMenu.classList.remove("hidden");
    });

    document.querySelectorAll(".weekday").forEach(button => {
        button.addEventListener("click", function() {
            const day = this.dataset.day;
            document.getElementById("selected-day").innerText = `Workout Plan - ${day}`;
            workoutPlanner.classList.remove("hidden");
            weeklyMenu.classList.add("hidden");
            loadWorkouts(day);
        });
    });

    backToMenuButton.addEventListener("click", () => {
        workoutPlanner.classList.add("hidden");
        weeklyMenu.classList.remove("hidden");
    });

    progressButton.addEventListener("click", () => {
        weeklyMenu.classList.add("hidden");
        weeklyProgress.classList.remove("hidden");
        loadProgress();
    });

    backToMainButton.addEventListener("click", () => {
        weeklyProgress.classList.add("hidden");
        weeklyMenu.classList.remove("hidden");
    });

    document.getElementById("add-exercise").addEventListener("click", () => {
        addExercise();
    });

    function addExercise() {
        const day = document.getElementById("selected-day").innerText.replace("Workout Plan - ", "");
        const exercise = document.getElementById("exercise-name").value;
        const sets = document.getElementById("sets").value;
        const reps = document.getElementById("reps").value;
        const weight = document.getElementById("weight").value;
        if (!exercise || !sets || !reps || !weight) return;

        let workouts = JSON.parse(localStorage.getItem(day)) || [];
        workouts.push({ exercise, sets, reps, weight, done: false });
        localStorage.setItem(day, JSON.stringify(workouts));

        loadWorkouts(day);
    }

    function loadWorkouts(day) {
        const tbody = document.querySelector("#workout-table tbody");
        tbody.innerHTML = "";
        let workouts = JSON.parse(localStorage.getItem(day)) || [];
        workouts.forEach((workout, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${workout.exercise}</td>
                <td>${workout.sets}</td>
                <td>${workout.reps}</td>
                <td>${workout.weight}kg</td>
                <td><input type="checkbox" ${workout.done ? "checked" : ""} data-index="${index}" data-day="${day}"></td>
            `;
            tbody.appendChild(row);
        });

        document.querySelectorAll("#workout-table input[type='checkbox']").forEach(checkbox => {
            checkbox.addEventListener("change", function() {
                let workouts = JSON.parse(localStorage.getItem(this.dataset.day));
                workouts[this.dataset.index].done = this.checked;
                localStorage.setItem(this.dataset.day, JSON.stringify(workouts));
            });
        });
    }

    function loadProgress() {
        let progressContainer = document.getElementById("progress-container");
        progressContainer.innerHTML = "";
        let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        days.forEach(day => {
            let workouts = JSON.parse(localStorage.getItem(day)) || [];
            if (workouts.length > 0) {
                let div = document.createElement("div");
                div.innerHTML = `<h3>${day}</h3>`;
                workouts.forEach(workout => {
                    div.innerHTML += `<p>${workout.exercise} - ${workout.sets} sets x ${workout.reps} reps @ ${workout.weight}kg</p>`;
                });
                progressContainer.appendChild(div);
            }
        });
    }
});
