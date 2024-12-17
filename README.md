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
