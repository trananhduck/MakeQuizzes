document.addEventListener("DOMContentLoaded", function () {
    QuizHandler.renderQuiz();
});
document.getElementById("backToCreateQuestions").addEventListener("click", function () {
    QuizHandler.resetQuiz(); 
});
