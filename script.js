// Quiz Q&A
let isAuthenticated = false;

//Quiz questions, options, and correct answers
const quizData = [
    {
        question: "When is Canada Day celebrated?",
        options: ["10July", "11 July", "1 July", "1Jan"],
        correct: 2
    },
    {
        question: "How many days are in week?",
        options: ["8", "7", "15", "14"],
        correct: 1
    },
    {
        question: "How many months are there in 1 year?",
        options: ["13Months", "10Months", "24Months", "12Months"],
        correct: 3
    }
];

//Current question index and score
let currentQuestionIndex = 0;
let score = 0;

//Event listener for starting the quiz
document.getElementById('start-quiz').addEventListener('click', function() {
    isAuthenticated = true;
    if (isAuthenticated) {
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('quiz-container').style.display = 'block';
        loadQuestion();
    }
});

//Loading the next question
document.getElementById('next-question').addEventListener('click', function() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

//Restarting the quiz
document.getElementById('Re-Attempt').addEventListener('click', function() {
    isAuthenticated = false;
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('auth-container').style.display = 'block';
});

//Load the current question
function loadQuestion() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';
    const currentQuestion = quizData[currentQuestionIndex];

    const questionElement = document.createElement('h2');
    questionElement.innerText = currentQuestion.question;
    questionContainer.appendChild(questionElement);

//Create and append option button
    currentQuestion.options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.innerText = option;
        optionButton.addEventListener('click', () => checkAnswer(index));
        questionContainer.appendChild(optionButton);
    });

    updateProgress();
    document.getElementById('next-question').style.display = 'none';
}

//check the selected answer
function checkAnswer(selectedIndex) {
    const currentQuestion = quizData[currentQuestionIndex];
    const buttons = document.querySelectorAll('#question-container button');

    if (selectedIndex === currentQuestion.correct) {
        buttons[selectedIndex].classList.add('correct');
        score++;
    } else {
        buttons[selectedIndex].classList.add('incorrect');
        buttons[currentQuestion.correct].classList.add('correct');
    }

    buttons.forEach(button => button.disabled = true);
    document.getElementById('next-question').style.display = 'block';
}

//Update the progress
function updateProgress() {
    const progressContainer = document.getElementById('progress-container');
    progressContainer.innerHTML = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
}

//Show the final result
function showResult() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    document.getElementById('score').innerText = `You scored ${score} out of ${quizData.length}`;
}