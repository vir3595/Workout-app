document.getElementById("start-btn").addEventListener("click", function () {
    document.getElementById("welcome-screen").classList.add("hidden");
    document.getElementById("workout-planner").classList.remove("hidden");
});

const workoutList = document.getElementById("workout-list");
const addWorkoutBtn = document.getElementById("add-workout");

addWorkoutBtn.addEventListener("click", function () {
    const day = document.getElementById("day").value;
    const exercise = document.getElementById("exercise").value;
    const weight = document.getElementById("weight").value;
    const reps = document.getElementById("reps").value;

    if (exercise && weight && reps) {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${day}</strong>: ${exercise} - ${weight}kg x ${reps} reps <button class="done-btn">✅</button>`;
        workoutList.appendChild(li);

        li.querySelector(".done-btn").addEventListener("click", function () {
            li.classList.toggle("completed");
        });

        document.getElementById("exercise").value = "";
        document.getElementById("weight").value = "";
        document.getElementById("reps").value = "";
    }
});
