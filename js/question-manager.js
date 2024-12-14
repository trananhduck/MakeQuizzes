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
            this.showToast("Vui lòng nhập đầy đủ thông tin!", false);
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
            this.showToast("Cập nhật câu hỏi thành công!");
        } else {
            this.questions.push(newQuestion);
            this.showToast("Thêm câu hỏi thành công!");
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
            this.showToast("Đã xóa toàn bộ câu hỏi!");
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
        document.getElementById("addQuestionButton").textContent = "Cập nhật câu hỏi";
    },

    deleteQuestion: function (index) {
        if (confirm("Bạn có chắc chắn muốn xóa câu hỏi này?")) {
            this.questions.splice(index, 1);
            this.saveQuestions(); // Lưu lại sau khi xóa
            this.renderQuestionList(); // Cập nhật lại bảng
            this.showToast("Xóa câu hỏi thành công!");
        }
    },

    importExcel: function () {
        try {
            const fileInput = document.getElementById("excelFile");
            const file = fileInput.files[0];

            if (!file) {
                alert("Vui lòng chọn file Excel.");
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: "binary" });
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

                // Kiểm tra hàng tiêu đề
                const headers = rows[0];
                console.log(headers)
                if (
                    headers[0] !== "STT" ||
                    headers[1] !== "Câu hỏi" ||
                    headers[2] !== "Đáp án A" ||
                    headers[3] !== "Đáp án B" ||
                    headers[4] !== "Đáp án C" ||
                    headers[5] !== "Đáp án D" ||
                    headers[6] !== "Đáp án đúng"
                ) {
                    this.showToast("File không đúng định dạng tiêu đề yêu cầu!", false);
                    return;
                }

                // Kiểm tra từng hàng dữ liệu
                const newQuestions = [];
                for (let i = 1; i < rows.length; i++) {
                    const row = rows[i];
                    const stt = row[0];
                    const question = row[1];
                    const answerA = row[2];
                    const answerB = row[3];
                    const answerC = row[4];
                    const answerD = row[5];
                    const correctAnswer = row[6];

                    // 1. Kiểm tra cột STT
                    if (typeof stt !== "number" || stt !== i) {
                        this.showToast(`Lỗi: STT ở dòng ${i + 1} không hợp lệ (phải là số và tăng dần từ 1)!`, false);
                        return;
                    }

                    // 2. Kiểm tra các cột Đáp án A, B, C, D và Câu hỏi không được trống
                    if (!question || !answerA || !answerB || !answerC || !answerD) {
                        this.showToast(
                            `Lỗi: Dòng ${i + 1} có cột trống ở Câu hỏi hoặc Đáp án A, B, C, D!`,
                            false
                        );
                        return;
                    }

                    // 3. Kiểm tra cột Đáp án đúng
                    if (!["A", "B", "C", "D"].includes(correctAnswer)) {
                        this.showToast(
                            `Lỗi: Đáp án đúng ở dòng ${i + 1} không hợp lệ (phải là A, B, C hoặc D)!`,
                            false
                        );
                        return;
                    }

                    // Thêm câu hỏi hợp lệ vào danh sách
                    newQuestions.push({
                        question: question,
                        options: [answerA, answerB, answerC, answerD],
                        correctAnswer: correctAnswer,
                    });
                }

                // Gán dữ liệu đã kiểm tra vào mảng questions
                this.questions.push(...newQuestions);
                this.saveQuestions();
                this.renderQuestionList();
                this.showToast("Import dữ liệu thành công!");
            };

            reader.readAsBinaryString(file);
        } catch (error) {
            this.showToast("Import dữ liệu thất bại!", false);
        }
    },


    exportExcel: function () {
        try {
            const ws = XLSX.utils.json_to_sheet(
                this.questions.map((q, index) => ({
                    "STT": index + 1,
                    "Câu hỏi": q.question,
                    "Đáp án A": q.options[0],
                    "Đáp án B": q.options[1],
                    "Đáp án C": q.options[2],
                    "Đáp án D": q.options[3],
                    "Đáp án đúng": q.correctAnswer,
                }))
            );

            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Câu Hỏi");
            XLSX.writeFile(wb, "questions.xlsx");
            this.showToast("Export dữ liệu thành công!");
        } catch (error) {
            this.showToast("Export dữ liệu thất bại!", false);
        }
    },

    // Hiển thị thông báo Toast
    showToast: function (message, isSuccess = true) {
        const toast = document.getElementById("successToast");
        const toastMessage = document.getElementById("toastMessage");

        // Cập nhật nội dung và kiểu toast
        toastMessage.textContent = message;
        toast.classList.remove("toast-success", "toast-failure"); // Xóa lớp cũ
        toast.classList.add(isSuccess ? "toast-success" : "toast-failure"); // Thêm lớp phù hợp

        // Hiển thị Toast
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
    },

};

// Khởi tạo khi trang được tải
window.onload = function () {
    QuestionManager.init();
};
