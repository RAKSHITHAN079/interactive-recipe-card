document.addEventListener('DOMContentLoaded', () => {
    const toggleIngredients = document.getElementById('toggle-ingredients');
    const ingredientsList = document.getElementById('ingredients-list');
    const toggleSteps = document.getElementById('toggle-steps');
    const stepsList = document.getElementById('steps-list');
    const startCooking = document.getElementById('start-cooking');
    const nextStep = document.getElementById('next-step');
    const progress = document.getElementById('progress');
    const timerElement = document.querySelector('.timer');
    const timeRemaining = document.getElementById('time-remaining');
    let stepIndex = 0;
    let interval;

    toggleIngredients.addEventListener('click', () => {
        ingredientsList.classList.toggle('hidden');
        toggleIngredients.textContent = ingredientsList.classList.contains('hidden') ? 'Show Ingredients' : 'Hide Ingredients';
    });

    toggleSteps.addEventListener('click', () => {
        stepsList.classList.toggle('hidden');
        toggleSteps.textContent = stepsList.classList.contains('hidden') ? 'Show Steps' : 'Hide Steps';
    });

    startCooking.addEventListener('click', () => {
        stepIndex = 0;
        highlightStep(stepIndex);
        nextStep.classList.remove('hidden');
        startCooking.classList.add('hidden');
        timerElement.classList.remove('hidden');
        startTimer(600); // 10 minutes timer
    });

    nextStep.addEventListener('click', () => {
        stepIndex++;
        if (stepIndex < stepsList.children.length) {
            highlightStep(stepIndex);
        } else {
            nextStep.classList.add('hidden');
        }
        updateProgressBar(stepIndex + 1, stepsList.children.length);
    });

    function highlightStep(index) {
        Array.from(stepsList.children).forEach((step, i) => {
            step.style.backgroundColor = i === index ? '#f0e68c' : 'transparent';
        });
    }

    function updateProgressBar(currentStep, totalSteps) {
        const progressPercent = (currentStep / totalSteps) * 100;
        progress.style.width = `${progressPercent}%`;
    }

    function startTimer(duration) {
        let remainingTime = duration;
        interval = setInterval(() => {
            let minutes = Math.floor(remainingTime / 60);
            let seconds = remainingTime % 60;
            timeRemaining.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            if (remainingTime <= 0) {
                clearInterval(interval);
            } else {
                remainingTime--;
            }
        }, 1000);
    }

    document.getElementById('print-recipe').addEventListener('click', () => {
        window.print();
    });
});
