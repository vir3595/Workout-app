document.addEventListener("DOMContentLoaded", function () {
    const welcomePage = document.getElementById("welcome-page");
    const mainMenu = document.getElementById("main-menu");
    const exercisePage = document.getElementById("exercise-page");
    const progressPage = document.getElementById("progress-page");

    const startButton = document.getElementById("start-planning");
    const weekdays = document.querySelectorAll(".weekday");
    const weeklyProgressButton = document.getElementById("weekly-progress");
    const backButton = document.getElementById("back-button");
    const backToMainButton = document.getElementById("back-to-main");

    const selectedDayTitle = document.getElementById("selected-day");
    const muscleGroupDropdown = document.getElementById("muscle-group");
    const exerciseInput = document.getElementById("exercise-input");
    const addExerciseButton = document.getElementById("add-exercise");
    const saveWorkoutButton = document.getElementById("save-workout");
    const exerciseList = document.getElementById("exercise-list");
    const progressList = document.getElementById("progress-list");

    let currentDay = "";
    let weeklyExercises = JSON.parse(localStorage.getItem("weeklyExercises")) || {};

    // Start Planning → Go to Main Menu
    startButton.addEventListener("click", function () {
        welcomePage.classList.add("hidden");
        mainMenu.classList.remove("hidden");
    });

    // Select a weekday and go to exercise input page
    weekdays.forEach(button => {
        button.addEventListener("click", function () {
            currentDay = button.dataset.day;
            selectedDayTitle.textContent = `${currentDay} - Exercises`;
            exerciseList.innerHTML = "";
            
            // Load previous exercises
            if (weeklyExercises[currentDay]) {
                weeklyExercises[currentDay].forEach(exercise => {
                    addExerciseToList(exercise);
                });
            }

            mainMenu.classList.add("hidden");
            exercisePage.classList.remove("hidden");
        });
    });

    // Add exercise to list
    addExerciseButton.addEventListener("click", function () {
        const exercise = `${muscleGroupDropdown.value}: ${exerciseInput.value.trim()}`;
        if (exercise !== "") {
            addExerciseToList(exercise);
            exerciseInput.value = "";
        }
    });

    function addExerciseToList(exercise) {
        const li = document.createElement("li");
        li.textContent = exercise;

        // Delete Button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "❌";
        deleteButton.addEventListener("click", function () {
            li.remove();
        });

        li.appendChild(deleteButton);
        exerciseList.appendChild(li);
    }

    // Save Workout
    saveWorkoutButton.addEventListener("click", function () {
        const exercises = Array.from(exerciseList.children).map(li => li.textContent.replace("❌", "").trim());
        weeklyExercises[currentDay] = exercises;
        localStorage.setItem("weeklyExercises", JSON.stringify(weeklyExercises));
        alert("Workout Saved!");
    });

    // Back to Main Menu
    backButton.addEventListener("click", function () {
        exercisePage.classList.add("hidden");
        mainMenu.classList.remove("hidden");
    });

    // Open Weekly Progress
    weeklyProgressButton.addEventListener("click", function () {
        progressList.innerHTML = "";
        Object.keys(weeklyExercises).forEach(day => {
            const li = document.createElement("li");
            li.textContent = `${day}: ${weeklyExercises[day].length} exercises`;
            progressList.appendChild(li);
        });
        mainMenu.classList.add("hidden");
        progressPage.classList.remove("hidden");
    });

    // Back to Main Menu from Progress Page
    backToMainButton.addEventListener("click", function () {
        progressPage.classList.add("hidden");
        mainMenu.classList.remove("hidden");
    });
});
