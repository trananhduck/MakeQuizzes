const QuizHandler = {
    currentQuestionIndex: 0,
    score: 0,
    timer: null,
    elapsedTime: 0, 
    answeredQuestions: new Set(),

    startQuiz: function () {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.elapsedTime = 0; 

        this.answeredQuestions.clear();
        QuestionManager.questions.forEach((q) => (q.selectedAnswer = null));

        this.saveState();
        this.loadState();

        document.getElementById("startQuizButton").style.display = "none";
        document.getElementById("quizSection").style.display = "block";
        document.getElementById("totalQuestions").textContent =
            QuestionManager.questions.length;

        this.renderQuestion();
        this.updateAnsweredCount();

        this.startTimer(); 
    },

    startTimer: function () {
        this.timer = setInterval(() => {
            this.elapsedTime++;
            const minutes = Math.floor(this.elapsedTime / 60);
            const seconds = this.elapsedTime % 60;
            document.getElementById("timer").textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
        }, 1000);
    },

    renderQuestion: function () {
        const question = QuestionManager.questions[this.currentQuestionIndex];

        if (!question || !question.question || !question.options || question.options.length < 4) {
            this.updateNavigationButtons();
            return;
        }

        const quizQuestionElement = document.getElementById("quizQuestion");
        const quizOptionsElement = document.getElementById("quizOptions");

        quizQuestionElement.textContent = `${this.currentQuestionIndex + 1}. ${question.question}`;
        quizOptionsElement.innerHTML = question.options
            .map((option, index) => {
                if (!option) {
                    return '';
                }

                const answerValue = ['A', 'B', 'C', 'D'][index];  // Đảm bảo giá trị A, B, C, D
                const checked = question.selectedAnswer === answerValue ? "checked" : "";
                return `
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="question"
                            value="${answerValue}"
                            ${checked}
                            onclick="QuizHandler.recordAnswer('${answerValue}')"
                        />
                        <label class="form-check-label">${answerValue}. ${option}</label>  <!-- Hiển thị giá trị A, B, C, D -->
                    </div>
                `;
            })
            .filter(option => option !== '')
            .join("");

        this.updateNavigationButtons();
    },

    recordAnswer: function (answer) {
        const currentQuestion = QuestionManager.questions[this.currentQuestionIndex];
        currentQuestion.selectedAnswer = answer;
        this.answeredQuestions.add(this.currentQuestionIndex);
        this.updateAnsweredCount();
        this.saveState();
    },

    updateNavigationButtons: function () {
        const prevButton = document.getElementById("prevQuestionButton");
        const nextButton = document.getElementById("nextQuestionButton");

        prevButton.disabled = this.currentQuestionIndex === 0;
        nextButton.textContent =
            this.currentQuestionIndex === QuestionManager.questions.length - 1
                ? "Hoàn thành"
                : "Câu tiếp theo";
    },

    updateAnsweredCount: function () {
        document.getElementById("answeredCount").textContent =
            this.answeredQuestions.size;
    },

    previousQuestion: function () {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.renderQuestion();
        }
    },

    nextQuestion: function () {
        if (this.currentQuestionIndex < QuestionManager.questions.length - 1) {
            this.currentQuestionIndex++;
            this.renderQuestion();
        } else {
            const modal = new bootstrap.Modal(document.getElementById("submitQuizModal"));
            modal.show();
        }
    },

    submitQuiz: function () {
        clearInterval(this.timer); // Dừng bộ đếm thời gian khi nộp bài

        this.score = 0;
        QuestionManager.questions.forEach((q) => {
            if (q.selectedAnswer && q.selectedAnswer === q.correctAnswer) {
                this.score++;
            }
        });

        const resultElement = document.getElementById("quizResult");
        const totalQuestions = QuestionManager.questions.length;

        resultElement.textContent = `Bạn đã trả lời đúng ${this.score}/${totalQuestions} câu. Thời gian làm bài: ${Math.floor(this.elapsedTime / 60)}:${(this.elapsedTime % 60).toString().padStart(2, "0")}`;
        resultElement.className = "alert mt-3";
        resultElement.classList.add(this.score === totalQuestions ? "alert-success" : "alert-warning");
        resultElement.style.display = "block";

        document.getElementById("quizSection").style.display = "none";
        document.getElementById("retrySection").style.display = "block";

        // Lưu kết quả vào localStorage
        localStorage.setItem("quizResult", JSON.stringify({
            score: this.score,
            totalQuestions: totalQuestions,
            elapsedTime: this.elapsedTime
        }));

        this.clearState();
    },



    restartQuiz: function () {
        document.getElementById("retrySection").style.display = "none";
        this.startQuiz();
    },

    saveState: function () {
        const state = {
            currentQuestionIndex: this.currentQuestionIndex,
            elapsedTime: this.elapsedTime,
            answeredQuestions: Array.from(this.answeredQuestions),
            questions: QuestionManager.questions,
        };

        localStorage.setItem("quizState", JSON.stringify(state));
    },

    loadState: function () {
        const savedState = localStorage.getItem("quizState");
        if (savedState) {
            const state = JSON.parse(savedState);

            this.currentQuestionIndex = state.currentQuestionIndex;
            this.elapsedTime = state.elapsedTime;
            this.answeredQuestions = new Set(state.answeredQuestions);
            QuestionManager.questions = state.questions;
        }
    },

    clearState: function () {
        localStorage.removeItem("quizState");
    },
};
