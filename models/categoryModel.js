// // const db = require("../config/db");

// // const Category = {
// //     // ฟังก์ชันนี้จะใช้ในการดึงข้อมูลหมวดหมู่ตาม ID
// //     getMenuById: async (menu_type_id) => {
// //         const [rows] = await db.query("SELECT * FROM menu_type WHERE menu_type_id = ?", [menu_type_id]);
// //         return rows[0];  // คืนค่าหมวดหมู่ที่พบ
// //     },

// //     // ฟังก์ชันดึงข้อมูลทั้งหมดของหมวดหมู่
// //     getAll: async () => {
// //         const [rows] = await db.query("SELECT * FROM menu_type");
// //         return rows;
// //     },

// //     // ฟังก์ชันสำหรับการสร้างหมวดหมู่ใหม่
// //     create: async (category_name) => {
// //         const [result] = await db.query("INSERT INTO menu_type (type_name) VALUES (?)", [category_name]);
// //         return result;
// //     },

// //     // ฟังก์ชันสำหรับการอัปเดตข้อมูลหมวดหมู่
// //     update: async (id, category_name) => {
// //         const [result] = await db.query("UPDATE menu_type SET type_name = ? WHERE menu_type_id = ?", [category_name, id]);
// //         return result;
// //     },

// //     // ฟังก์ชันสำหรับการลบหมวดหมู่
// //     delete: async (id) => {
// //         const [result] = await db.query("DELETE FROM menu_type WHERE menu_type_id = ?", [id]);
// //         return result;
// //     }
// // };

// // module.exports = Category;


// const db = require("../config/db");
// const path = require("path");
// const fs = require("fs");

// class Menu {
//     // ดึงข้อมูลเมนูทั้งหมดพร้อมกับข้อมูลประเภทเมนู
//     static async getAllMenus() {
//         const [rows] = await db.query(`
//             SELECT menu.*, menu_type.type_name AS category_name
//             FROM menu
//             JOIN menu_type ON menu.menu_type_id = menu_type.menu_type_id
//         `);
//         return rows;
//     }

//     // ดึงข้อมูลเมนูตาม ID พร้อมข้อมูลประเภทเมนู
//     static async getMenuById(menu_id) {
//         const [rows] = await db.query(`
//             SELECT menu.*, menu_type.type_name AS category_name
//             FROM menu
//             JOIN menu_type ON menu.menu_type_id = menu_type.menu_type_id
//             WHERE menu.menu_id = ?
//         `, [menu_id]);
//         return rows[0];
//     }

//     // สร้างเมนูใหม่
//     static async createMenu(menuData) {
//         const { menu_name, price, special, detail_menu, menu_type_id, menu_image } = menuData;
//         const [result] = await db.query(
//             "INSERT INTO menu (menu_name, price, special, detail_menu, menu_type_id, menu_image) VALUES (?, ?, ?, ?, ?, ?)",
//             [menu_name, price, special, detail_menu, menu_type_id, menu_image]
//         );
//         return result;
//     }

//     // อัปเดตเมนู
//     static async updateMenu(menu_id, menuData) {
//         try {
//             const { menu_name, price, special, detail_menu, menu_type_id, menu_image } = menuData;

//             const [oldMenu] = await db.query("SELECT menu_image FROM menu WHERE menu_id = ?", [menu_id]);
//             if (!oldMenu.length) {
//                 throw new Error("ไม่พบเมนูที่ต้องการอัปเดต");
//             }

//             let newImage = oldMenu[0].menu_image;

//             if (menu_image) {
//                 newImage = menu_image;
//                 const oldImagePath = path.join(__dirname, "../public/uploads", oldMenu[0].menu_image);
//                 if (fs.existsSync(oldImagePath)) {
//                     fs.unlinkSync(oldImagePath);
//                     console.log("✅ ลบรูปเก่าแล้ว:", oldMenu[0].menu_image);
//                 }
//             }

//             const [result] = await db.query(
//                 `UPDATE menu 
//                  SET menu_name = ?, price = ?, special = ?, detail_menu = ?, menu_type_id = ?, menu_image = ?
//                  WHERE menu_id = ?`,
//                 [menu_name, price, special, detail_menu, menu_type_id, newImage, menu_id]
//             );
//             return result;
//         } catch (error) {
//             console.error("❌ เกิดข้อผิดพลาดในการอัปเดตเมนู:", error);
//             throw error;
//         }
//     }

//     // ลบเมนู
//     static async deleteMenu(menu_id) {
//         try {
//             const [menuData] = await db.query("SELECT menu_image FROM menu WHERE menu_id = ?", [menu_id]);
//             if (menuData.length === 0) {
//                 throw new Error("ไม่พบเมนูที่ต้องการลบ");
//             }

//             const imageFile = menuData[0].menu_image;
//             if (imageFile) {
//                 const imagePath = path.join(__dirname, "../public/uploads", imageFile);
//                 try {
//                     fs.accessSync(imagePath, fs.constants.F_OK);
//                     fs.unlinkSync(imagePath);
//                     console.log("✅ ลบรูปภาพแล้ว:", imageFile);
//                 } catch (err) {
//                     console.warn("⚠️ ไม่พบไฟล์รูปภาพหรือไม่สามารถลบได้:", err.message);
//                 }
//             }

//             const [result] = await db.query("DELETE FROM menu WHERE menu_id = ?", [menu_id]);
//             return result;
//         } catch (error) {
//             console.error("❌ เกิดข้อผิดพลาดในการลบเมนู:", error.message);
//             throw error;
//         }

        
//     }


    
    
// }

// module.exports = Menu;
const db = require("../config/db"); // เชื่อมต่อกับฐานข้อมูล

// ดึงข้อมูลหมวดหมู่ทั้งหมด
const getAllCategories = async () => {
    const [rows] = await db.query("SELECT * FROM menu_type");
    return rows;
};
// ดึงข้อมูลหมวดหมู่ที่เจาะจงตาม menu_type_id
const getCategoryById = async (menu_type_id) => {
    const [rows] = await db.query("SELECT * FROM menu_type WHERE menu_type_id = ?", [menu_type_id]);
    return rows;
};

// เพิ่มหมวดหมู่ใหม่
const addCategory = async (type_name) => {
    const [result] = await db.query("INSERT INTO menu_type (type_name) VALUES (?)", [type_name]);
    return result.insertId;
};

// แก้ไขหมวดหมู่
const updateCategory = async (id, type_name) => {
    await db.query("UPDATE menu_type SET type_name = ? WHERE menu_type_id = ?", [type_name, id]);
};

// ลบหมวดหมู่
const deleteCategory = async (id) => {
    await db.query("DELETE FROM menu_type WHERE menu_type_id = ?", [id]);
};

module.exports = {
    getAllCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryById
};
