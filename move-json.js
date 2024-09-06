const fs = require('fs');
const path = require('path');

// Đường dẫn thư mục chứa các file JSON gốc
const sourceDir = path.join(__dirname, 'content', 'posts');

// Đường dẫn file tổng hợp
const summaryFilePath = path.join(__dirname, 'content', 'tongHop.json');

// Xóa nội dung cũ bằng cách ghi JSON rỗng
fs.writeFileSync(summaryFilePath, JSON.stringify([], null, 2), 'utf8');
console.log('Đã xóa nội dung cũ trong file tongHop.json.');

// Đọc tất cả các file trong thư mục source
fs.readdir(sourceDir, (err, files) => {
    if (err) {
        console.error('Không thể đọc thư mục:', err);
        return;
    }

    // Lọc lấy các file có đuôi .json
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    // Mảng để lưu nội dung của các file JSON
    const allData = [];

    // Đọc và tổng hợp nội dung của từng file JSON
    jsonFiles.forEach(file => {
        const filePath = path.join(sourceDir, file);

        // Đọc nội dung file JSON
        const data = fs.readFileSync(filePath, 'utf8');
        try {
            // Parse nội dung JSON và thêm vào mảng tổng hợp
            allData.push(JSON.parse(data));
        } catch (err) {
            console.error(`Lỗi khi parse file ${file}:`, err);
        }
    });


    // Ghi mảng tổng hợp vào file tongHop.json
    fs.writeFileSync(summaryFilePath, JSON.stringify(allData, null, 2), 'utf8');

    console.log(`Đã tổng hợp nội dung các file JSON vào ${summaryFilePath}`);
});
