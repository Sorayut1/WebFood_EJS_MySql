// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "public/uploads/"); 
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname)); 
//     }
// });

// const fileFilter = (req, file, cb) => {
//     const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
//     if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(new Error("❌ Invalid file type. Only JPG, PNG, and GIF are allowed."), false);
//     }
// };


// const upload = multer({ 
//     storage, 
//     fileFilter, 
//     limits: { fileSize: 2 * 1024 * 1024 } 
// });

// module.exports = upload; 
// middleware/upload.js
// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, "../public/uploads"));
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage });

// module.exports = upload;
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises; // ใช้ promises แทน callback
const uploadDir = path.resolve(__dirname, "../public/uploads"); // ใช้ path.resolve() เพื่อความปลอดภัย
const db = require("../config/db"); // เรียกใช้งานฐานข้อมูล

// ตรวจสอบและสร้างโฟลเดอร์อัปโหลดถ้ายังไม่มี
async function ensureUploadDir() {
    try {
        await fs.access(uploadDir);
    } catch (error) {
        console.log("📂 Upload directory not found, creating...");
        await fs.mkdir(uploadDir, { recursive: true });
    }
}
ensureUploadDir(); // เรียกใช้ฟังก์ชันนี้เมื่อโหลดไฟล์

// ตั้งค่า multer storage
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        await ensureUploadDir(); // ตรวจสอบโฟลเดอร์ก่อนอัปโหลด
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const newFileName = Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

// กำหนดประเภทไฟล์ที่อนุญาต
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("❌ Invalid file type. Only JPG, PNG, and GIF are allowed."), false);
    }
};

// กำหนดค่า Multer
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } // จำกัดขนาดไฟล์ที่ 2 MB
});

const deleteOldImage = (req, res, next) => {
    const oldImage = req.body.oldImage; // ชื่อไฟล์รูปเก่าที่ส่งมาจากฟอร์ม

    if (oldImage) {
        const oldImagePath = path.join(__dirname, "../public/uploads", oldImage);

        try {
            fs.accessSync(oldImagePath, fs.constants.F_OK); // ตรวจสอบว่าไฟล์มีอยู่หรือไม่
            fs.unlinkSync(oldImagePath); // ลบไฟล์
            console.log("✅ Old image deleted successfully");
        } catch (err) {
            console.warn("⚠️ Old image not found or could not be deleted:", err.message);
        }
    }
    next(); // ดำเนินการ middleware ถัดไป
};




module.exports = { upload, deleteOldImage };
