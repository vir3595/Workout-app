document.addEventListener("DOMContentLoaded", () => {
    const welcomeScreen = document.getElementById("welcome-screen");
    const mainMenu = document.getElementById("main-menu");
    const workoutPage = document.getElementById("workout-page");
    const progressPage = document.getElementById("progress-page");

    const startButton = document.getElementById("start-planning");
    const weekdayButtons = document.querySelectorAll(".day-btn");
    const backToMain = document.getElementById("back-main");
    const backToWeek = document.getElementById("back-week");
    const backToProgress = document.getElementById("back-progress");
    const progressButton = document.getElementById("weekly-progress");

    const exerciseList = document.getElementById("exercise-list");
    const addExerciseButton = document.getElementById("add-exercise");
    const saveWorkoutButton = document.getElementById("save-workout");
    const notification = document.getElementById("notification");

    const workoutPlannerBtn = document.getElementById("workout-planner-btn");
    const homeBtn = document.getElementById("home-btn");
    const statsBtn = document.getElementById("stats-btn");

    let selectedDay = "";
    let workouts = JSON.parse(localStorage.getItem("workouts")) || {};
    let currentDay = new Date().toLocaleString('en-us', { weekday: 'long' });

    // Show the desired screen
    function showScreen(screen) {
        // Hide all screens
        welcomeScreen.classList.add("hidden");
        mainMenu.classList.add("hidden");
        workoutPage.classList.add("hidden");
        progressPage.classList.add("hidden");

        // Show the selected screen
        screen.classList.remove("hidden");
    }

    // Handle Welcome Screen -> Main Menu transition
    startButton.addEventListener("click", () => {
        showScreen(mainMenu);
        loadRandomQuote();
    });

    // Back buttons
    backToMain.addEventListener("click", () => showScreen(mainMenu));
    backToWeek.addEventListener("click", () => showScreen(mainMenu));
    backToProgress.addEventListener("click", () => showScreen(mainMenu));

    // Weekly Progress Screen
    progressButton.addEventListener("click", () => {
        showScreen(progressPage);
        const progressList = document.getElementById("progress-list");
        progressList.innerHTML = "";
        for (const day in workouts) {
            if (workouts[day].length > 0) {
                let li = document.createElement("li");
                li.textContent = `${day}: ${workouts[day].length} exercises`;
                progressList.appendChild(li);
            }
        }
    });

    // Handle weekday selection
    weekdayButtons.forEach(button => {
        button.addEventListener("click", () => {
            selectedDay = button.dataset.day;
            document.getElementById("workout-day-title").textContent = `${selectedDay}'s Workout Plan`;
            loadExercises();
            showScreen(workoutPage);
        });
    });

    // Load exercises for the selected day
    function loadExercises() {
        exerciseList.innerHTML = "";
        if (workouts[selectedDay]) {
            workouts[selectedDay].forEach((exercise, index) => {
                let li = document.createElement("li");
                li.textContent = `${exercise.name} - ${exercise.sets} sets x ${exercise.reps} reps @ ${exercise.weight} kg`;
                exerciseList.appendChild(li);
            });
        }
    }

    // Add a new exercise
    addExerciseButton.addEventListener("click", () => {
        const name = document.getElementById("exercise-name").value;
        const sets = document.getElementById("exercise-sets").value;
        const reps = document.getElementById("exercise-reps").value;
        const weight = document.getElementById("exercise-weight").value;
        if (name && sets && reps && weight) {
            const exercise = { name, sets, reps, weight };
            if (!workouts[selectedDay]) {
                workouts[selectedDay] = [];
            }
            workouts[selectedDay].push(exercise);
            localStorage.setItem("workouts", JSON.stringify(workouts));
            loadExercises();
            showNotification("Exercise added!");
        }
    });

    // Save workout
    saveWorkoutButton.addEventListener("click", () => {
        showNotification("Workout saved!");
    });

    // Show notification
    function showNotification(message) {
        notification.textContent = message;
        notification.classList.remove("hidden");
        setTimeout(() => {
            notification.classList.add("hidden");
        }, 2000);
    }

    // Bottom navigation logic
    workoutPlannerBtn.addEventListener("click", () => showScreen(mainMenu));
    homeBtn.addEventListener("click", () => {
        selectedDay = currentDay;
        document.getElementById("workout-day-title").textContent = `${selectedDay}'s Workout Plan`;
        loadExercises();
        showScreen(workoutPage);
    });
    statsBtn.addEventListener("click", () => showScreen(progressPage));
});
