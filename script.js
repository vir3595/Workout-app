document.addEventListener("DOMContentLoaded", function () {
    // Navigation Buttons
    const plannerBtn = document.getElementById("plannerBtn");
    const homeBtn = document.getElementById("homeBtn");
    const statsBtn = document.getElementById("statsBtn");

    // Screens
    const plannerScreen = document.getElementById("plannerScreen");
    const homeScreen = document.getElementById("homeScreen");
    const statsScreen = document.getElementById("statsScreen");

    // Workout Planner Elements
    const dayButtons = document.querySelectorAll(".day-btn");
    const selectedDayTitle = document.getElementById("selectedDayTitle");
    const exerciseList = document.getElementById("exerciseList");
    const todaysWorkout = document.getElementById("todaysWorkout");
    const notification = document.getElementById("notification");

    // Form Inputs
    const exerciseName = document.getElementById("exerciseName");
    const exerciseWeight = document.getElementById("exerciseWeight");
    const exerciseReps = document.getElementById("exerciseReps");
    const exerciseSets = document.getElementById("exerciseSets");
    const addExerciseBtn = document.getElementById("addExerciseBtn");

    let selectedDay = null;
    let workoutData = JSON.parse(localStorage.getItem("workoutData")) || {};

    // Function to switch screens
    function showScreen(screen) {
        plannerScreen.classList.remove("active");
        homeScreen.classList.remove("active");
        statsScreen.classList.remove("active");

        screen.classList.add("active");
    }

    plannerBtn.addEventListener("click", () => showScreen(plannerScreen));
    homeBtn.addEventListener("click", () => showScreen(homeScreen));
    statsBtn.addEventListener("click", () => showScreen(statsScreen));

    // Function to load exercises for the selected day
    function loadExercisesForDay(day) {
        selectedDay = day;
        selectedDayTitle.textContent = `Workout Plan for ${day}`;
        exerciseList.innerHTML = "";

        if (workoutData[day]) {
            workoutData[day].forEach((exercise, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${exercise.name}</td>
                    <td>${exercise.weight}kg</td>
                    <td>${exercise.reps}</td>
                    <td>${exercise.sets}</td>
                    <td><button class="delete-btn" data-day="${day}" data-index="${index}">❌</button></td>
                `;
                exerciseList.appendChild(row);
            });
        }
    }

    // Click event for weekday buttons
    dayButtons.forEach((button) => {
        button.addEventListener("click", function () {
            loadExercisesForDay(this.dataset.day);
        });
    });

    // Function to update Today's Workout screen
    function updateWorkoutDisplay() {
        const today = new Date().toLocaleString("en-us", { weekday: "long" });
        todaysWorkout.innerHTML = "";

        if (workoutData[today]) {
            workoutData[today].forEach((exercise) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${exercise.name}</td>
                    <td>${exercise.weight}kg</td>
                    <td>${exercise.reps}</td>
                    <td>${exercise.sets}</td>
                `;
                todaysWorkout.appendChild(row);
            });
        }
    }

    // Function to show notification
    function showNotification(message) {
        notification.textContent = message;
        notification.classList.remove("hidden");
        setTimeout(() => notification.classList.add("hidden"), 2000);
    }

    // Add Exercise Event
    addExerciseBtn.addEventListener("click", function () {
        if (!selectedDay) return alert("Please select a day first!");

        const newExercise = {
            name: exerciseName.value,
            weight: exerciseWeight.value,
            reps: exerciseReps.value,
            sets: exerciseSets.value,
        };

        if (!newExercise.name || !newExercise.weight || !newExercise.reps || !newExercise.sets) {
            alert("Please fill all fields!");
            return;
        }

        if (!workoutData[selectedDay]) workoutData[selectedDay] = [];
        workoutData[selectedDay].push(newExercise);
        localStorage.setItem("workoutData", JSON.stringify(workoutData));

        showNotification("Exercise Added! ✅");

        loadExercisesForDay(selectedDay);
        updateWorkoutDisplay();

        // Clear input fields after adding
        exerciseName.value = "";
        exerciseWeight.value = "";
        exerciseReps.value = "";
        exerciseSets.value = "";
    });

    // Delete Exercise Event
    exerciseList.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-btn")) {
            const day = e.target.dataset.day;
            const index = e.target.dataset.index;
            workoutData[day].splice(index, 1);
            localStorage.setItem("workoutData", JSON.stringify(workoutData));

            showNotification("Exercise Deleted! ❌");

            loadExercisesForDay(day);
            updateWorkoutDisplay();
        }
    });

    // Load initial data
    updateWorkoutDisplay();
});
