let currentQuestionIndex = 0;
const questions = document.querySelectorAll('.question');
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const submitButton = document.getElementById("submit");

function showQuestion(index) {
    questions.forEach((question, i) => {
        if (i === index) {
            question.classList.add('active');
            question.classList.remove('hidden');
            question.scrollIntoView({ behavior: 'smooth' });
        } else {
            question.classList.remove('active');
            question.classList.add('hidden');
        }
    });

    prevButton.style.display = index === 0 ? 'none' : 'inline-block';
    nextButton.style.display = index === questions.length - 1 ? 'none' : 'inline-block';
    submitButton.style.display = index === questions.length - 1 ? 'inline-block' : 'none';
}

document.getElementById("next").addEventListener("click", () => {
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
});

document.getElementById("prev").addEventListener("click", () => {
    currentQuestionIndex--;
    showQuestion(currentQuestionIndex);
});

document.getElementById("submit").addEventListener("click", () => {
    let score = 0;
    questions.forEach((question, index) => {
        const selectedOption = question.querySelector('input[type="radio"]:checked');
        if (selectedOption) {
            const answer = selectedOption.value;
            if (answer === question.getAttribute('data-correct')) {
                score++;
            }
        } else {
            alert(`Please answer question ${index + 1}`);
            return;
        }
    });

    document.querySelector('.main').style.display = 'none';
    document.querySelector('.result').style.display = 'block';
    document.getElementById("score").textContent = `Your score is: ${score} out of ${questions.length}`;
});

document.getElementById("retry").addEventListener("click", () => {
    document.querySelector('.result').style.display = 'none';
    document.querySelector('.main').style.display = 'block';
    document.querySelectorAll('input[type="radio"]').forEach(input => input.checked = false);
    currentQuestionIndex = 0;
    showQuestion(currentQuestionIndex);
});

showQuestion(currentQuestionIndex);
