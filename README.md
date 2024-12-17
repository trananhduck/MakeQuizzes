# **Công cụ tạo câu hỏi - MakeQuizzes**

## **Giới thiệu**

Dự án này là một **web application** đơn giản để **thêm, sửa, xóa, quản lý danh sách câu hỏi và trả lời danh sách câu hỏi**. Ứng dụng còn hỗ trợ **import file Excel** chứa danh sách câu hỏi để tiết kiệm thời gian nhập liệu và **export file Excel** .

---

## **Tính năng**

1. **Quản lý câu hỏi**:
   - Thêm câu hỏi mới với thông tin chi tiết.
   - Sửa câu hỏi đã có.
   - Xóa câu hỏi với xác nhận từ người dùng.
   - Hiển thị danh sách câu hỏi đã lưu.
   - Xóa toàn bộ câu hỏi.

2. **Import file Excel**:
   - Cho phép người dùng tải lên file Excel chứa danh sách câu hỏi.
   - Đọc dữ liệu từ file Excel và hiển thị lên giao diện.
2. **Export file Excel**:
   - Cho phép người dùng tải xuống file Excel chứa danh sách câu hỏi lưu trong localStorage.
3. **Lưu trữ dữ liệu**:
   - Sử dụng **localStorage** để lưu trữ danh sách câu hỏi trên trình duyệt.
   - Tự động lưu khi có thay đổi.
4. **Thông báo**:
   - Hiển thị thông báo (toast) khi thực hiện thành công các thao tác như thêm, xóa câu hỏi.
5. **Trả lời danh sách câu hỏi**:
   - Trả lời danh sách câu hỏi và hiển thị thời gian làm bài, số câu đã làm.
   - Kiểm tra đáp án và hiển thị lên màn hình kết quả bài làm. 
---

## **Công nghệ sử dụng**

- **HTML**: Giao diện người dùng.
- **CSS**: Thiết kế và tạo trải nghiệm thân thiện.
- **JavaScript**: Xử lý logic ứng dụng và giao tiếp với DOM.
- **SheetJS (xlsx)**: Thư viện đọc file Excel.
- **localStorage**: Lưu trữ dữ liệu cục bộ trên trình duyệt.
---

## **Cài đặt và sử dụng**

### **1. Clone dự án**
```bash
git clone https://github.com/your-username/question-management-app.git
cd question-management-app

### **2. **Mở file trong trình duyệt****
Chạy file index.html trên trình duyệt.

### **3. Các bước sử dụng**
1. Thêm câu hỏi mới:
Nhấn vào nút "Thêm câu hỏi" và nhập các thông tin yêu cầu.
Sau khi nhấn "Lưu", câu hỏi sẽ được thêm vào danh sách.
2. Xóa câu hỏi:
Nhấn vào nút "Xóa" bên cạnh câu hỏi cần xóa.
Xác nhận xóa khi có thông báo.
3.Sửa câu hỏi:
Nhấn vào nút "Sửa" và cập nhật thông tin.
4.Import file Excel:
Chọn file Excel từ máy tính của bạn và nhấn "Thêm Danh Sách Câu Hỏi", dữ liệu sẽ được đọc và thêm vào danh sách câu hỏi.
5. Export file Excel:
Nhấn vào nút "Xuất Danh Sách Câu Hỏi", danh sách câu hỏi sẽ được tải về máy tính của bạn.
6. Trả lời danh sách câu hỏi:
- Chọn tab "Trả lời câu hỏi".
- Nhấn "Bắt đầu làm bài" để khởi động quiz.
- Chọn 1 trong 4 đáp án đối với mỗi câu hỏi.
- Có thể sử dụng 2 nút điều hướng để trả lời câu hỏi.
- Nếu muốn nộp bài, nhấn nút "Hoàn thành" (ở câu hỏi cuối cùng) và xác nhận nộp bài.
- Chọn "Làm lại" nếu muốn trả lời lại danh sách câu hỏi.

### **3. Cấu trúc thư mục**
question-management-app/
│
├── index.html          # Giao diện chính
├── style.css           # File CSS tùy chỉnh
├── script.js           # Logic ứng dụng
├── toast.js            # Xử lý thông báo
└── libs/
    └── xlsx.full.min.js # Thư viện SheetJS để đọc file Excel

