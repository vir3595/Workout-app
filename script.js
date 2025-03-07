document.addEventListener("DOMContentLoaded", () => {
    const welcomeScreen = document.getElementById("welcome-screen");
    const weekPlan = document.getElementById("week-plan");
    const workoutPlanner = document.getElementById("workout-planner");
    const dayTitle = document.getElementById("day-title");
    const backBtn = document.getElementById("back-btn");
    const startBtn = document.getElementById("start-btn");

    const workoutForm = document.getElementById("workout-form");
    const exerciseName = document.getElementById("exercise-name");
    const exerciseWeight = document.getElementById("exercise-weight");
    const exerciseReps = document.getElementById("exercise-reps");
    const workoutList = document.getElementById("workout-list");

    let selectedDay = "";
    let workouts = JSON.parse(localStorage.getItem("workouts")) || {};

    // Load a new motivational quote on refresh
    const quotes = [
        "Push yourself, because no one else is going to do it for you!",
        "Success starts with self-discipline.",
        "The pain you feel today will be the strength you feel tomorrow.",
        "No excuses, just results!",
        "Train insane or remain the same!"
    ];
    document.getElementById("quote").innerText = quotes[Math.floor(Math.random() * quotes.length)];

    // Start Planning Button
    startBtn.addEventListener("click", () => {
        welcomeScreen.classList.add("hidden");
        weekPlan.classList.remove("hidden");
    });

    // Handle Day Selection
    document.querySelectorAll(".day-btn").forEach(button => {
        button.addEventListener("click", () => {
            selectedDay = button.getAttribute("data-day");
            dayTitle.innerText = `${selectedDay} Workout Plan`;
            loadWorkoutList();
            weekPlan.classList.add("hidden");
            workoutPlanner.classList.remove("hidden");
        });
    });

    // Handle Back Button
    backBtn.addEventListener("click", () => {
        workoutPlanner.classList.add("hidden");
        weekPlan.classList.remove("hidden");
    });

    // Handle Workout Submission
    workoutForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const exercise = {
            name: exerciseName.value,
            weight: exerciseWeight.value,
            reps: exerciseReps.value,
            done: false
        };

        if (!workouts[selectedDay]) {
            workouts[selectedDay] = [];
        }
        workouts[selectedDay].push(exercise);
        localStorage.setItem("workouts", JSON.stringify(workouts));
        loadWorkoutList();
        workoutForm.reset();
    });

    // Load workouts from storage
    function loadWorkoutList() {
        workoutList.innerHTML = "";
        if (workouts[selectedDay]) {
            workouts[selectedDay].forEach((workout, index) => {
                let li = document.createElement("li");
                li.innerHTML = `
                    ${workout.name} - ${workout.weight}kg x ${workout.reps} reps 
                    <input type="checkbox" ${workout.done ? "checked" : ""} data-index="${index}">
                `;
                workoutList.appendChild(li);
            });

            // Mark as done
            document.querySelectorAll("#workout-list input").forEach(input => {
                input.addEventListener("change", (e) => {
                    let index = e.target.getAttribute("data-index");
                    workouts[selectedDay][index].done = e.target.checked;
                    localStorage.setItem("workouts", JSON.stringify(workouts));
                });
            });
        }
    }

    // Reset workouts every week
    function resetWeeklyWorkouts() {
        let lastReset = localStorage.getItem("lastReset");
        let now = new Date().getTime();
        let oneWeek = 7 * 24 * 60 * 60 * 1000;

        if (!lastReset || now - lastReset > oneWeek) {
            localStorage.setItem("workouts", JSON.stringify({}));
            localStorage.setItem("lastReset", now);
        }
    }
    resetWeeklyWorkouts();
});
