document.addEventListener("DOMContentLoaded", function () {
    let currentDay = "";
    const days = document.querySelectorAll(".day-btn");
    const exerciseList = document.getElementById("exercise-list");
    const exerciseName = document.getElementById("exercise-name");
    const exerciseWeight = document.getElementById("exercise-weight");
    const exerciseReps = document.getElementById("exercise-reps");
    const exerciseSets = document.getElementById("exercise-sets");
    const addExerciseBtn = document.getElementById("add-exercise");
    const todaysWorkoutList = document.getElementById("todays-workout");

    let workoutData = JSON.parse(localStorage.getItem("workoutData")) || {};

    function updateWorkoutDisplay() {
        todaysWorkoutList.innerHTML = "";
        if (currentDay && workoutData[currentDay]) {
            workoutData[currentDay].forEach((exercise) => {
                const li = document.createElement("li");
                li.textContent = `${exercise.name} - ${exercise.weight}kg, ${exercise.reps} reps, ${exercise.sets} sets`;
                todaysWorkoutList.appendChild(li);
            });
        }
    }

    function saveWorkout() {
        localStorage.setItem("workoutData", JSON.stringify(workoutData));
        updateWorkoutDisplay();
    }

    days.forEach((day) => {
        day.addEventListener("click", function () {
            days.forEach(d => d.classList.remove("active"));
            this.classList.add("active");
            currentDay = this.getAttribute("data-day");
            document.getElementById("selected-day-title").textContent = `Workout for ${currentDay}`;
            exerciseList.innerHTML = "";

            if (workoutData[currentDay]) {
                workoutData[currentDay].forEach((exercise, index) => {
                    const li = document.createElement("li");
                    li.innerHTML = `${exercise.name} - ${exercise.weight}kg, ${exercise.reps} reps, ${exercise.sets} sets
                    <button onclick="deleteExercise('${currentDay}', ${index})">❌</button>`;
                    exerciseList.appendChild(li);
                });
            }
        });
    });

    addExerciseBtn.addEventListener("click", function () {
        if (currentDay && exerciseName.value && exerciseWeight.value && exerciseReps.value && exerciseSets.value) {
            if (!workoutData[currentDay]) {
                workoutData[currentDay] = [];
            }

            workoutData[currentDay].push({
                name: exerciseName.value,
                weight: exerciseWeight.value,
                reps: exerciseReps.value,
                sets: exerciseSets.value
            });

            saveWorkout();
            exerciseName.value = "";
            exerciseWeight.value = "";
            exerciseReps.value = "";
            exerciseSets.value = "";
        }
    });

    window.deleteExercise = function (day, index) {
        if (workoutData[day]) {
            workoutData[day].splice(index, 1);
            saveWorkout();
            document.querySelector(`[data-day='${day}']`).click();
        }
    };

    document.getElementById("btn-planner").addEventListener("click", function () {
        document.getElementById("workout-planner").classList.remove("hidden");
        document.getElementById("home").classList.add("hidden");
        document.getElementById("stats").classList.add("hidden");
    });

    document.getElementById("btn-home").addEventListener("click", function () {
        document.getElementById("workout-planner").classList.add("hidden");
        document.getElementById("home").classList.remove("hidden");
        document.getElementById("stats").classList.add("hidden");
        updateWorkoutDisplay();
    });

    document.getElementById("btn-stats").addEventListener("click", function () {
        document.getElementById("workout-planner").classList.add("hidden");
        document.getElementById("home").classList.add("hidden");
        document.getElementById("stats").classList.remove("hidden");
    });

    document.getElementById("btn-home").click();
});
