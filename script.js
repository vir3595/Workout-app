// Array of workouts
const workouts = [
    "Push-ups - 3 sets of 10 reps",
    "Squats - 3 sets of 15 reps",
    "Plank - Hold for 1 minute",
    "Jumping Jacks - 2 minutes"
];

// Get the workout list and message elements
const workoutList = document.getElementById("workout-list");
const messageElement = document.getElementById("message");

// Add workouts to the list
workouts.forEach(workout => {
    let li = document.createElement("li");
    li.textContent = workout;
    workoutList.appendChild(li);
});

// Function to display a message when the button is clicked
function showMessage() {
    messageElement.innerText = "Keep up with your workouts!";
}
