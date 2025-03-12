document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start-button");
    const workoutPlanner = document.getElementById("workout-planner");
    const homeScreen = document.getElementById("home");
    const statsScreen = document.getElementById("stats");
    const welcomeScreen = document.getElementById("welcome-screen");
    const weekdays = document.querySelectorAll(".day-btn");

    function showScreen(screen) {
        document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
        screen.classList.remove("hidden");
    }

    startButton.addEventListener("click", function () {
        welcomeScreen.classList.add("hidden");
        homeScreen.classList.remove("hidden");
    });

    document.getElementById("btn-planner").addEventListener("click", function () {
        showScreen(workoutPlanner);
    });

    document.getElementById("btn-home").addEventListener("click", function () {
        showScreen(homeScreen);
    });

    document.getElementById("btn-stats").addEventListener("click", function () {
        showScreen(statsScreen);
    });

    weekdays.forEach(button => {
        button.addEventListener("click", function () {
            weekdays.forEach(b => b.classList.remove("active"));
            this.classList.add("active");
        });
    });
});
