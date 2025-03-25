// routes/manageMenu.js
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const menuController = require('../controllers/menuController');
// const path = require('path');

// การตั้งค่า upload ภาพ
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });
// const upload = multer({ storage: storage });

// เส้นทางการเพิ่มเมนู
// router.post('/add', upload.single('menu_image'), menuController.addMenu);

// เส้นทางการดึงประเภทเมนู
// router.get('/menu-types', menuController.getMenuTypes);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const db = require('../config/db');

// // ดึงข้อมูลทั้งหมด
// router.get('/', async (req, res) => {
//     try {
//         const [rows] = await db.promise().query("SELECT * FROM menu");
//         res.json(rows);
//     } catch (error) {
//         res.status(500).json({ message: "Database error", error });
//     }
// });

// // ดึงเมนูตาม ID
// router.get('/:id', async (req, res) => {
//     try {
//         const [rows] = await db.promise().query("SELECT * FROM menu WHERE menu_id = ?", [req.params.id]);
//         if (rows.length === 0) return res.status(404).json({ message: "Menu not found" });
//         res.json(rows[0]);
//     } catch (error) {
//         res.status(500).json({ message: "Database error", error });
//     }
// });

// // เพิ่มเมนูใหม่
// router.post('/', async (req, res) => {
//     const { menu_name, menu_image, price, menu_type, detail_menu } = req.body;
//     try {
//         await db.promise().query("INSERT INTO menu (menu_name, menu_image, price, menu_type, detail_menu) VALUES (?, ?, ?, ?, ?)", 
//             [menu_name, menu_image, price, menu_type, detail_menu]);
//         res.json({ message: "Menu added successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Database error", error });
//     }
// });

// // อัปเดตเมนู
// router.put('/:id', async (req, res) => {
//     const { menu_name, menu_image, price, menu_type, detail_menu } = req.body;
//     try {
//         await db.promise().query("UPDATE menu SET menu_name=?, menu_image=?, price=?, menu_type=?, detail_menu=? WHERE menu_id=?", 
//             [menu_name, menu_image, price, menu_type, detail_menu, req.params.id]);
//         res.json({ message: "Menu updated successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Database error", error });
//     }
// });

// // ลบเมนู
// router.delete('/:id', async (req, res) => {
//     try {
//         await db.promise().query("DELETE FROM menu WHERE menu_id = ?", [req.params.id]);
//         res.json({ message: "Menu deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Database error", error });
//     }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const db = require("../config/db");
// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");

// const uploadDir = path.join(__dirname, "../public/uploads/");
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// // กำหนดการอัปโหลดไฟล์ (รองรับเฉพาะไฟล์รูปภาพ)
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, uploadDir),
//     filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
// });

// const fileFilter = (req, file, cb) => {
//     const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
//     if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(new Error("Invalid file type. Only JPG, PNG, and GIF are allowed."), false);
//     }
// };

// const upload = multer({ 
//     storage, 
//     fileFilter, 
//     limits: { fileSize: 2 * 1024 * 1024 } // จำกัดขนาด 2MB
// });


// 📌 ดึงข้อมูลเมนูทั้งหมด
// router.get("/", async (req, res) => {
//     try {
//         const [rows] = await db.promise().query("SELECT * FROM menu");
//         res.json(rows);
//     } catch (error) {
//         res.status(500).json({ message: "Database error", error });
//     }
// });

// router.get("/:id", async (req, res) => {
//     try {
//         const [rows] = await db.promise().query("SELECT * FROM menu WHERE menu_id = ?", [req.params.id]);

//         if (rows.length === 0) return res.status(404).json({ message: "Menu not found" });

//         res.json(rows[0]); // ส่งข้อมูลเมนูกลับไป
//     } catch (error) {
//         res.status(500).json({ message: "Database error", error });
//     }
// });



// 📌 เพิ่มเมนูใหม่
// router.post("/", upload.single("menu_image"), async (req, res) => {
//     const { menu_name, price, menu_type, detail_menu } = req.body;
//     if (!menu_name || !price || !menu_type) {
//         return res.status(400).json({ message: "Missing required fields" });
//     }
//     const menu_image = req.file ? req.file.filename : null;

//     try {
//         await db.promise().query(
//             "INSERT INTO menu (menu_name, menu_image, price, menu_type, detail_menu) VALUES (?, ?, ?, ?, ?)",
//             [menu_name, menu_image, price, menu_type, detail_menu]
//         );
//         res.json({ message: "Menu added successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Database error", error });
//     }
// });

// 📌 อัปเดตเมนู
// router.put("/:id", upload.single("menu_image"), async (req, res) => {
//     const { menu_name, price, menu_type, detail_menu } = req.body;
//     const menu_image = req.file ? req.file.filename : null;
//     const menu_id = req.params.id;

//     try {
//         const [rows] = await db.promise().query("SELECT menu_image FROM menu WHERE menu_id = ?", [menu_id]);
//         if (rows.length === 0) return res.status(404).json({ message: "Menu not found" });

//         const oldImage = rows[0].menu_image;

//         if (menu_image && oldImage) {
//             const oldImagePath = path.join(uploadDir, oldImage);
//             if (fs.existsSync(oldImagePath)) {
//                 try {
//                     fs.unlinkSync(oldImagePath);
//                 } catch (err) {
//                     console.error("Error deleting old image:", err);
//                 }
//             }
//         }

//         await db.promise().query(
//             "UPDATE menu SET menu_name=?, menu_image=?, price=?, menu_type=?, detail_menu=? WHERE menu_id=?",
//             [menu_name, menu_image || oldImage, price, menu_type, detail_menu, req.params.id]
//         );

//         res.json({ message: "Menu updated successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Database error", error });
//     }
// });





// 📌 ลบเมนู
// router.delete("/:id", async (req, res) => {
//     try {
//         const [rows] = await db.promise().query("SELECT menu_image FROM menu WHERE menu_id = ?", [req.params.id]);
//         if (rows.length === 0) return res.status(404).json({ message: "Menu not found" });

//         const menu_image = rows[0].menu_image;
//         if (menu_image) {
//             const imagePath = path.join(uploadDir, menu_image);
//             if (fs.existsSync(imagePath)) {
//                 try {
//                     fs.unlinkSync(imagePath);
//                 } catch (err) {
//                     console.error("Error deleting image:", err);
//                 }
//             }
//         }

//         await db.promise().query("DELETE FROM menu WHERE menu_id = ?", [req.params.id]);
//         res.json({ message: "Menu deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Database error", error });
//     }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const menuController = require("../controllers/menuController");
// const upload = require("../middleware/upload");

// router.get("/", menuController.getMenus);
// router.get("/:id", menuController.getMenu);
// router.post("/", upload.single("menu_image"), menuController.addMenu);
// router.put("/:id", upload.single("menu_image"), menuController.updateMenu);
// router.delete("/:id", menuController.deleteMenu);

// module.exports = router;
const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
const { upload, deleteOldImage }  = require("../middleware/upload");

// อ่านข้อมูลเมนูทั้งหมด
// router.get("/", menuController.getAllMenus);

// อ่านข้อมูลเมนูตาม ID
// router.get("/:id", menuController.getMenuById);

// สร้างเมนูใหม่
// router.post("/", deleteOldImage,upload.single("menu_image"), menuController.createMenu);

// อัปเดตเมนู
// router.put("/:id",  upload.single("menu_image"), menuController.updateMenu);
// เพิ่มเส้นทางใหม่สำหรับการอัปเดตรูปภาพ

// ลบเมนู
// router.delete("/:id", menuController.deleteMenu);



// อ่านข้อมูลเมนูทั้งหมด
router.get("/", menuController.getAllMenus);

// อ่านข้อมูลเมนูตาม ID
router.get("/:id", menuController.getMenuById);

// สร้างเมนูใหม่ (ไม่ต้องลบรูปภาพเก่า)
router.post("/", upload.single("menu_image"), menuController.createMenu);


// 📝 อัปเดตเมนู (ลบรูปเก่า + อัปโหลดใหม่)
router.put("/:id", deleteOldImage, upload.single("menu_image"), menuController.updateMenu);
  

// ลบเมนู
// router.delete("/:id", deleteOldImage, menuController.deleteMenu);
router.delete("/:id", menuController.deleteMenu);

// router.get('/:id',menuController.getMenuById);



module.exports = router;

