document.getElementById('start-planning').addEventListener('click', function() {
    document.getElementById('welcome').classList.add('hidden');
    document.getElementById('main-menu').classList.remove('hidden');
});

document.querySelectorAll('.day').forEach(button => {
    button.addEventListener('click', function() {
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('exercise-page').classList.remove('hidden');
        document.getElementById('selected-day').textContent = this.getAttribute('data-day');
    });
});

document.getElementById('weekly-progress').addEventListener('click', function() {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('progress-page').classList.remove('hidden');
});

document.getElementById('back').addEventListener('click', function() {
    document.getElementById('exercise-page').classList.add('hidden');
    document.getElementById('main-menu').classList.remove('hidden');
});

document.getElementById('back-to-main').addEventListener('click', function() {
    document.getElementById('progress-page').classList.add('hidden');
    document.getElementById('main-menu').classList.remove('hidden');
});

document.getElementById('add-exercise').addEventListener('click', function() {
    const exerciseName = document.getElementById('exercise-name').value.trim();
    const muscleGroup = document.getElementById('muscle-group').value;
    if (exerciseName && muscleGroup) {
        const li = document.createElement('li');
        li.textContent = `${muscleGroup.toUpperCase()}: ${exerciseName}`;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.onclick = function() {
            li.remove();
        };
        
        li.appendChild(deleteBtn);
        document.getElementById('exercise-list').appendChild(li);
        document.getElementById('exercise-name').value = '';
    }
});

document.getElementById('save-workout').addEventListener('click', function() {
    alert('Workout saved!'); // Replace this with actual saving logic.
});
