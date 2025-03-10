document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-planning");
    const weekdays = document.querySelectorAll(".day-btn");
    const viewProgress = document.getElementById("view-progress");
    const backToMenu = document.getElementById("back-to-menu");
    const backToMenuProgress = document.getElementById("back-to-menu-progress");
    const addExerciseBtn = document.getElementById("add-exercise");
    const homeBtn = document.getElementById("home-btn");
    const plannerBtn = document.getElementById("planner-btn");
    const progressBtn = document.getElementById("progress-btn");

    const screens = {
        welcome: document.getElementById("welcome-screen"),
        menu: document.getElementById("main-menu"),
        planner: document.getElementById("workout-planner"),
        progress: document.getElementById("progress-page"),
    };

    // Motivational Quotes
    const quotes = [
        "No Pain, No Gain! 💪",
        "Push Harder Than Yesterday! 🔥",
        "Your Only Limit Is You! 🚀",
        "Train Like a Beast, Look Like a Beauty! 🏆"
    ];

    function getRandomQuote() {
        return quotes[Math.floor(Math.random() * quotes.length)];
    }
    
    document.getElementById("motivational-quote").textContent = getRandomQuote();

    // Navigation Handlers
    function showScreen(screen) {
        Object.values(screens).forEach(s => s.classList.add("hidden"));
        screen.classList.remove("hidden");
    }

    startButton.addEventListener("click", () => showScreen(screens.menu));
    
    weekdays.forEach(button => {
        button.addEventListener("click", function() {
            document.getElementById("selected-day").textContent = this.dataset.day + " Workout Plan";
            showScreen(screens.planner);
        });
    });

    viewProgress.addEventListener("click", () => showScreen(screens.progress));
    backToMenu.addEventListener("click", () => showScreen(screens.menu));
    backToMenuProgress.addEventListener("click", () => showScreen(screens.menu));

    // Bottom Menu Navigation
    homeBtn.addEventListener("click", () => showScreen(screens.menu));
    plannerBtn.addEventListener("click", () => showScreen(screens.planner));
    progressBtn.addEventListener("click", () => showScreen(screens.progress));

    // Exercise Input
    addExerciseBtn.addEventListener("click", function() {
        let exerciseName = prompt("Enter exercise name:");
        let sets = prompt("Enter sets:");
        let reps = prompt("Enter reps:");
        let weight = prompt("Enter weight:");

        if (exerciseName && sets && reps && weight) {
            let exerciseList = document.getElementById("exercise-list");
            let exerciseDiv = document.createElement("div");
            exerciseDiv.innerHTML = `<p>${exerciseName} - ${sets} Sets x ${reps} Reps @ ${weight}kg</p>`;
            exerciseList.appendChild(exerciseDiv);
        }
    });
});
