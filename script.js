const workouts = [
    "Push-ups - 3 sets of 10 reps",
    "Squats - 3 sets of 15 reps",
    "Plank - Hold for 1 minute",
    "Jumping Jacks - 2 minutes"
];

const workoutList = document.getElementById("workout-list");

workouts.forEach(workout => {
    let li = document.createElement("li");
    li.textContent = workout;
    workoutList.appendChild(li);
});
