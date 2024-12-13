const QuestionManager = {
    questions: [],
    editIndex: null,

    // Khởi tạo
    init: function () {
        this.questions = JSON.parse(localStorage.getItem("questions")) || [];
        this.renderQuestionList();
        this.bindEvents();
    },

    // Thêm phương thức để gắn sự kiện
    bindEvents: function () {
        const addQuestionButton = document.getElementById("addQuestionButton");
        if (addQuestionButton) {
            addQuestionButton.addEventListener("click", (e) => {
                e.preventDefault(); // Ngăn chặn submit form mặc định
                this.addQuestion();
            });
        }
    },

    addQuestion: function () {
        // Lấy các phần tử DOM
        const questionInput = document.getElementById("questionInput");
        const option1 = document.getElementById("option1");
        const option2 = document.getElementById("option2");
        const option3 = document.getElementById("option3");
        const option4 = document.getElementById("option4");
        const correctAnswer = document.getElementById("correctAnswer");
        const formError = document.getElementById("formError");

        // Ẩn thông báo lỗi ban đầu
        formError.style.display = "none";

        // Kiểm tra và trim các giá trị
        const question = questionInput.value.trim();
        const opt1 = option1.value.trim();
        const opt2 = option2.value.trim();
        const opt3 = option3.value.trim();
        const opt4 = option4.value.trim();
        const correctAnswerValue = correctAnswer.value;

        // Kiểm tra tính hợp lệ của dữ liệu
        if (!question || !opt1 || !opt2 || !opt3 || !opt4 || !correctAnswerValue) {
            formError.style.display = "block";
            return;
        }

        // Tạo đối tượng câu hỏi mới
        const newQuestion = {
            question,
            options: [opt1, opt2, opt3, opt4],
            correctAnswer: correctAnswerValue,
        };

        // Kiểm tra trạng thái chỉnh sửa hay thêm mới
        if (this.editIndex !== null) {
            this.questions[this.editIndex] = newQuestion;
            this.editIndex = null;
            document.getElementById("addQuestionButton").textContent = "Thêm câu hỏi";
        } else {
            this.questions.push(newQuestion);
        }

        // Lưu câu hỏi và cập nhật giao diện
        this.saveQuestions();
        this.renderQuestionList();

        // Reset form
        questionInput.value = "";
        option1.value = "";
        option2.value = "";
        option3.value = "";
        option4.value = "";
        correctAnswer.value = "";

        // Đảm bảo thông báo lỗi được ẩn
        formError.style.display = "none";
    },


    deleteAllQuestions: function () {
        const confirmation = confirm("Bạn có chắc chắn muốn xóa tất cả câu hỏi?");
        if (confirmation) {
            this.questions = []; // Đặt danh sách câu hỏi về rỗng
            this.saveQuestions(); // Lưu danh sách trống vào localStorage
            this.renderQuestionList(); // Cập nhật giao diện
        }
    },

    saveQuestions: function () {
        localStorage.setItem("questions", JSON.stringify(this.questions)); // Lưu mảng câu hỏi vào localStorage
    },

    renderQuestionList: function () {
        const questionTableBody = document.getElementById("questionTableBody");
        questionTableBody.innerHTML = ""; // Xóa các hàng cũ trong bảng

        // Hiển thị tất cả câu hỏi đã lưu
        this.questions.forEach((q, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${q.question}</td>
                <td>${q.options[0]}</td>
                <td>${q.options[1]}</td>
                <td>${q.options[2]}</td>
                <td>${q.options[3]}</td>
                <td>${q.correctAnswer}</td> <!-- Hiển thị A, B, C, D -->
                <td>
                    <button class="btn btn-info btn-sm" onclick="QuestionManager.editQuestion(${index})">Sửa</button>
                    <button class="btn btn-danger btn-sm" onclick="QuestionManager.deleteQuestion(${index})">Xóa</button>
                </td>
            `;
            questionTableBody.appendChild(row);
        });
    },

    renderQuestionList: function () {
        const questionTableBody = document.getElementById("questionTableBody");
        questionTableBody.innerHTML = ""; // Xóa các hàng cũ trong bảng

        // Hiển thị tất cả câu hỏi đã lưu
        this.questions.forEach((q, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${index + 1}</td>
            <td>${q.question}</td>
            <td>${q.options[0]}</td>
            <td>${q.options[1]}</td>
            <td>${q.options[2]}</td>
            <td>${q.options[3]}</td>
            <td>${q.correctAnswer}</td>
            <td>
                <button class="btn btn-info btn-sm" onclick="QuestionManager.editQuestion(${index})">Sửa</button>
                <button class="btn btn-danger btn-sm" onclick="QuestionManager.deleteQuestion(${index})">Xóa</button>
            </td>
        `;
            questionTableBody.appendChild(row);
        });
    },
    editQuestion: function (index) {
        const question = this.questions[index];
        document.getElementById("questionInput").value = question.question;
        document.getElementById("option1").value = question.options[0];
        document.getElementById("option2").value = question.options[1];
        document.getElementById("option3").value = question.options[2];
        document.getElementById("option4").value = question.options[3];
        document.getElementById("correctAnswer").value = question.correctAnswer;

        this.editIndex = index;
        document.getElementById("addQuestionButton").textContent = "Thêm câu hỏi";
    },

    deleteQuestion: function (index) {
        if (confirm("Bạn có chắc chắn muốn xóa câu hỏi này?")) {
            this.questions.splice(index, 1);
            this.saveQuestions(); // Lưu lại sau khi xóa
            this.renderQuestionList(); // Cập nhật lại bảng
        }
    },

    importExcel: function () {
        const fileInput = document.getElementById("excelFile");
        const file = fileInput.files[0];
        if (!file) {
            alert("Vui lòng chọn file Excel.");
            return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const rows = XLSX.utils.sheet_to_json(sheet);
            rows.forEach((row, index) => {
                const question = row["Câu hỏi"];
                const options = [
                    row["Đáp án A"],
                    row["Đáp án B"],
                    row["Đáp án C"],
                    row["Đáp án D"]
                ];
                const correctAnswer = row["Đáp án đúng"];
                const newQuestion = {
                    index: QuestionManager.questions.length + index + 1, // Thêm số thứ tự
                    question,
                    options,
                    correctAnswer
                };
                QuestionManager.questions.push(newQuestion);
            });
            QuestionManager.saveQuestions();
            QuestionManager.renderQuestionList();
        };
        reader.readAsBinaryString(file);
    },


    exportExcel: function () {
        const ws = XLSX.utils.json_to_sheet(this.questions.map((q, index) => {
            let correctAnswer = "";
            if (q.correctAnswer === 'A') {
                correctAnswer = 'A'
            } else if (q.correctAnswer === 'B') {
                correctAnswer = 'B'
            } else if (q.correctAnswer === 'C') {
                correctAnswer = 'C'
            } else if (q.correctAnswer === 'D') {
                correctAnswer = 'D'
            }

            return {
                "STT": index + 1, // Thêm cột số thứ tự
                "Câu hỏi": q.question,
                "Đáp án A": q.options[0],
                "Đáp án B": q.options[1],
                "Đáp án C": q.options[2],
                "Đáp án D": q.options[3],
                "Đáp án đúng": correctAnswer
            };
        }));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Câu Hỏi");

        XLSX.writeFile(wb, "questions.xlsx");
    },

};

// Khởi tạo khi trang được tải
window.onload = function () {
    QuestionManager.init();
};
