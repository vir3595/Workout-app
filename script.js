document.addEventListener("DOMContentLoaded", function () {
    const plannerBtn = document.getElementById("plannerBtn");
    const homeBtn = document.getElementById("homeBtn");
    const statsBtn = document.getElementById("statsBtn");

    const plannerScreen = document.getElementById("plannerScreen");
    const homeScreen = document.getElementById("homeScreen");
    const statsScreen = document.getElementById("statsScreen");

    const dayButtons = document.querySelectorAll(".day-btn");
    const selectedDayTitle = document.getElementById("selectedDayTitle");
    const exerciseList = document.getElementById("exerciseList");
    const todaysWorkout = document.getElementById("todaysWorkout");

    const exerciseName = document.getElementById("exerciseName");
    const exerciseWeight = document.getElementById("exerciseWeight");
    const exerciseReps = document.getElementById("exerciseReps");
    const exerciseSets = document.getElementById("exerciseSets");
    const addExerciseBtn = document.getElementById("addExerciseBtn");

    let selectedDay = null;
    let workoutData = JSON.parse(localStorage.getItem("workoutData")) || {};

    function updateWorkoutDisplay() {
        todaysWorkout.innerHTML = "";
        const today = new Date().toLocaleString("en-us", { weekday: "long" });
        const todayExercises = workoutData[today] || [];

        todayExercises.forEach((exercise) => {
            const li = document.createElement("li");
            li.innerHTML = `${exercise.name} - ${exercise.weight}kg x ${exercise.reps} reps x ${exercise.sets} sets`;
            todaysWorkout.appendChild(li);
        });
    }

    function showScreen(screen) {
        plannerScreen.classList.remove("active");
        homeScreen.classList.remove("active");
        statsScreen.classList.remove("active");
        screen.classList.add("active");
    }

    plannerBtn.addEventListener("click", () => showScreen(plannerScreen));
    homeBtn.addEventListener("click", () => showScreen(homeScreen));
    statsBtn.addEventListener("click", () => showScreen(statsScreen));

    dayButtons.forEach((button) => {
        button.addEventListener("click", function () {
            selectedDay = this.getAttribute("data-day");
            selectedDayTitle.textContent = `Workout for ${selectedDay}`;
            exerciseList.innerHTML = "";

            if (workoutData[selectedDay]) {
                workoutData[selectedDay].forEach((exercise, index) => {
                    const li = document.createElement("li");
                    li.innerHTML = `${exercise.name} - ${exercise.weight}kg x ${exercise.reps} reps x ${exercise.sets} sets
                    <button class="delete-btn" data-index="${index}">❌</button>`;
                    exerciseList.appendChild(li);
                });
            }
        });
    });

    addExerciseBtn.addEventListener("click", function () {
        if (!selectedDay) return alert("Select a day first!");
        
        const newExercise = {
            name: exerciseName.value,
            weight: exerciseWeight.value,
            reps: exerciseReps.value,
            sets: exerciseSets.value,
        };

        if (!workoutData[selectedDay]) workoutData[selectedDay] = [];
        workoutData[selectedDay].push(newExercise);
        localStorage.setItem("workoutData", JSON.stringify(workoutData));

        updateWorkoutDisplay();
    });

    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-btn")) {
            workoutData[selectedDay].splice(e.target.getAttribute("data-index"), 1);
            localStorage.setItem("workoutData", JSON.stringify(workoutData));
            updateWorkoutDisplay();
        }
    });

    updateWorkoutDisplay();
});
