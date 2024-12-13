document.addEventListener("DOMContentLoaded", function () {
    QuizHandler.renderQuiz();
});
document.getElementById("backToCreateQuestions").addEventListener("click", function () {
    QuizHandler.resetQuiz(); // Đặt lại trạng thái khi quay lại tạo câu hỏi
  });
  