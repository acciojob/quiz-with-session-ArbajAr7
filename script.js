document.addEventListener("DOMContentLoaded", function () {
    const quizForm = document.getElementById("quiz-form");
    const submitBtn = document.getElementById("submit-btn");
    const resultDiv = document.getElementById("result");

    const correctAnswers = {
        q1: "A",
        q2: "B",
        q3: "D",
        q4: "A",
        q5: "C"
    };

    function loadProgress() {
        const progress = sessionStorage.getItem("progress");
        if (progress) {
            const savedAnswers = JSON.parse(progress);
            for (const question in savedAnswers) {
                const value = savedAnswers[question];
                const radio = document.querySelector(`input[name=${question}][value=${value}]`);
                if (radio) {
                    radio.checked = true;
                }
            }
        }
    }

    function saveProgress() {
        const progress = {};
        const formData = new FormData(quizForm);
        formData.forEach((value, key) => {
            progress[key] = value;
        });
        sessionStorage.setItem("progress", JSON.stringify(progress));
    }

    function calculateScore() {
        const formData = new FormData(quizForm);
        let score = 0;
        formData.forEach((value, key) => {
            if (correctAnswers[key] === value) {
                score++;
            }
        });
        return score;
    }

    function handleFormChange() {
        saveProgress();
    }

    function handleSubmit() {
        const score = calculateScore();
        localStorage.setItem("score", score);
        resultDiv.textContent = `Your score is ${score} out of 5.`;
    }

    quizForm.addEventListener("change", handleFormChange);
    submitBtn.addEventListener("click", handleSubmit);

    loadProgress();
});
