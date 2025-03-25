// const Menu = require("../models/menuModel");
const fs = require("fs");
const path = require("path");

// const uploadDir = path.join(__dirname, "../public/uploads/");

// 📌 ดึงเมนูทั้งหมด
// exports.getMenus = async (req, res) => {
//     try {
//         const menus = await Menu.getAllMenus();
//         res.json(menus);
//     } catch (error) {
//         res.status(500).json({ message: "Database error", error });
//     }
// };

// 📌 ดึงเมนูตาม ID
// exports.getMenu = async (req, res) => {
//     try {
//         const menu = await Menu.getMenuById(req.params.id);
//         if (!menu) return res.status(404).json({ message: "Menu not found" });
//         res.json(menu);
//     } catch (error) {
//         res.status(500).json({ message: "Database error", error });
//     }
// };

// 📌 เพิ่มเมนูใหม่
// exports.addMenu = async (req, res) => {
//     const { menu_name, price, menu_type, detail_menu } = req.body;
//     if (!menu_name || !price || !menu_type) return res.status(400).json({ message: "Missing required fields" });

//     const menu_image = req.file ? req.file.filename : null;

//     try {
//         await Menu.createMenu({ menu_name, menu_image, price, menu_type, detail_menu });
//         res.json({ message: "Menu added successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Database error", error });
//     }
// };

// 📌 อัปเดตเมนู
// exports.updateMenu = async (req, res) => {
//     const { menu_name, price, menu_type, detail_menu } = req.body;
//     const menu_image = req.file ? req.file.filename : null;
//     const menu_id = req.params.id;

//     try {
//         const oldMenu = await Menu.getMenuById(menu_id);
//         if (!oldMenu) return res.status(404).json({ message: "Menu not found" });

//         if (menu_image && oldMenu.menu_image) {
//             const oldImagePath = path.join(uploadDir, oldMenu.menu_image);
//             if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
//         }

//         await Menu.updateMenu(menu_id, { menu_name, menu_image: menu_image || oldMenu.menu_image, price, menu_type, detail_menu });

//         res.json({ message: "Menu updated successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Database error", error });
//     }
// };

// 📌 ลบเมนู
// exports.deleteMenu = async (req, res) => {
//     try {
//         const oldMenu = await Menu.getMenuById(req.params.id);
//         if (!oldMenu) return res.status(404).json({ message: "Menu not found" });

//         if (oldMenu.menu_image) {
//             const imagePath = path.join(uploadDir, oldMenu.menu_image);
//             if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
//         }

//         await Menu.deleteMenu(req.params.id);
//         res.json({ message: "Menu deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Database error", error });
//     }
// };
const Menu = require("../models/menuModel");


exports.getAllMenus = async (req, res) => {
    try {
        const menus = await Menu.getAllMenus();
        res.json(menus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMenuById = async (req, res) => {
    try {
        const menu = await Menu.getMenuById(req.params.id);
        if (!menu) return res.status(404).json({ message: "Menu not found" });
        res.json(menu);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createMenu = async (req, res) => {
    try {
        const { menu_name, price, special, detail_menu, menu_type_id } = req.body;
        const menu_image = req.file ? req.file.filename : null;
        await Menu.createMenu({ menu_name, price, special, detail_menu, menu_type_id, menu_image });
        res.status(201).json({ message: "Menu created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateMenu = async (req, res) => {
    try {
        const { menu_name, price, special, detail_menu, menu_type_id} = req.body;
        const menu_image = req.file ? req.file.filename : null;
        await Menu.updateMenu(req.params.id, { menu_name, price, special, detail_menu, menu_type_id, menu_image });
        res.json({ message: "Menu updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.deleteMenu = async (req, res) => {
    try {
        const menuId = req.params.id;
        const result = await Menu.deleteMenu(menuId);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "ไม่พบเมนูที่ต้องการลบ" });
        }

        res.json({ message: "✅ ลบเมนูเรียบร้อยแล้ว" });
    } catch (error) {
        res.status(500).json({ message: "❌ เกิดข้อผิดพลาดในการลบเมนู", error: error.message });
    }
};

// exports.getMenuTypes = (req, res) => {
//     try {
//         const query = `SELECT * FROM menu_type`; // ดึงข้อมูลจากตาราง menu_type
//         connection.query(query, (error, results) => {
//             if (error) {
//                 res.status(500).json({ error: error.message });
//                 return;
//             }
//             res.json(results); // ส่งข้อมูลประเภทเมนูไปที่ Frontend
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
// exports.getMenuByIdJoin = async (req, res) => {
//     try {
//         console.log("req.params.id:", req.params.id);  // ตรวจสอบค่าที่ได้รับ

//         const menu_id = parseInt(req.params.id, 10);
//         if (isNaN(menu_id)) {
//             return res.status(400).json({ success: false, message: "menu_id ต้องเป็นตัวเลข" });
//         }

//         console.log("menu_id (parsed):", menu_id); // ตรวจสอบค่าหลังแปลงเป็นตัวเลข

//         const menu = await Menu.getMenuByIdJoin(menu_id);
//         if (!menu) {
//             return res.status(404).json({ success: false, message: "ไม่พบเมนูนี้" });
//         }

//         return res.status(200).json({ success: true, data: menu });
//     } catch (error) {
//         console.error("เกิดข้อผิดพลาดในการดึงข้อมูลเมนู:", error);
//         return res.status(500).json({ success: false, message: error.message });
//     }
// exports.getMenuByIdJoin = async (req, res) => {
//     try {
//         const menu_id = parseInt(req.params.id, 10);
//         if (isNaN(menu_id)) {
//             return res.status(400).json({ success: false, message: "menu_id ต้องเป็นตัวเลข" });
//         }

//         const menu = await Menu.getMenuByIdJoin(menu_id);
//         if (!menu) {
//             return res.status(404).json({ success: false, message: "ไม่พบเมนูนี้" });
//         }

//         // ส่งข้อมูลกลับไปยัง frontend
//         return res.status(200).json({
//             success: true,
//             data: {
//                 menu_id: menu.menu_id,
//                 menu_name: menu.menu_name,
//                 price: menu.price,
//                 type_name: menu.type_name,  // นำ type_name มาแสดง
//                 detail_menu: menu.detail_menu,
//                 menu_image: menu.menu_image,
//                 special: menu.special,
//             }
            
//         });
        
//     } catch (error) {
//         return res.status(500).json({ success: false, message: error.message });
//     }
    
// };



