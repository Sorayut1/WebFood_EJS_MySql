// const MenuType = require("../models/categoryModel"); // ใช้ Model ที่ถูกต้อง

// const categoryController = {
//     // ฟังก์ชันดึงข้อมูลทั้งหมดของหมวดหมู่
//     getAllCategories: async (req, res) => {
//         try {
//             const categories = await MenuType.getAll();
//             res.json({ success: true, data: categories });
//             console.log(category)
//         } catch (error) {
//             res.status(500).json({ success: false, message: error.message });
//         }
//     },

//     // ฟังก์ชันดึงข้อมูลหมวดหมู่ตาม ID
//     getCategoryById: async (req, res) => {
//         try {
//             const category = await MenuType.getMenuById(req.params.id); // ใช้ฟังก์ชัน getMenuById จาก model
//             if (!category) {
//                 return res.status(404).json({ message: "หมวดหมู่ไม่พบ" });
//             }
//             res.json({ success: true, data: category });
//         } catch (error) {
//             res.status(500).json({ success: false, message: error.message });
//         }
//     },

//     // ฟังก์ชันเพิ่มหมวดหมู่
//     createCategory: async (req, res) => {
//         try {
//             const { type_name } = req.body; // เปลี่ยนเป็น type_name
//             if (!type_name) {
//                 return res.status(400).json({ success: false, message: "กรุณากรอกชื่อประเภทเมนู" });
//             }

//             await MenuType.create(type_name);
//             res.json({ success: true, message: "เพิ่มประเภทเมนูสำเร็จ" });
//         } catch (error) {
//             res.status(500).json({ success: false, message: error.message });
//         }
//     },

//     // ฟังก์ชันอัปเดตหมวดหมู่
//     updateCategory: async (req, res) => {
//         try {
//             const { id } = req.params;
//             const { type_name } = req.body; // เปลี่ยนเป็น type_name
//             if (!type_name) {
//                 return res.status(400).json({ success: false, message: "กรุณากรอกชื่อประเภทเมนู" });
//             }

//             await MenuType.update(id, type_name);
//             res.json({ success: true, message: "แก้ไขประเภทเมนูสำเร็จ" });
//         } catch (error) {
//             res.status(500).json({ success: false, message: error.message });
//         }
//     },

//     // ฟังก์ชันลบหมวดหมู่
//     deleteCategory: async (req, res) => {
//         try {
//             const { id } = req.params;
//             await MenuType.delete(id);
//             res.json({ success: true, message: "ลบประเภทเมนูสำเร็จ" });
//         } catch (error) {
//             res.status(500).json({ success: false, message: error.message });
//         }
//     }
// };

// module.exports = categoryController;
const categoryModel = require("../models/categoryModel");

// ดึงข้อมูลหมวดหมู่ทั้งหมด
const getCategories = async (req, res) => {
    try {
        const categories = await categoryModel.getAllCategories();
        res.json({ success: true, data: categories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในการดึงข้อมูล", error });
    }
};
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;  // รับ id จาก URL parameters

        // เรียกใช้ model เพื่อดึงข้อมูลหมวดหมู่ตาม id
        const category = await categoryModel.getCategoryById(id);

        // ตรวจสอบว่ามีข้อมูลหมวดหมู่ที่ตรงกับ id หรือไม่
        if (!category) {
            return res.status(404).json({ success: false, message: "ไม่พบหมวดหมู่" });
        }

        // ส่งข้อมูลกลับไป
        res.json({ success: true, data: category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในการดึงข้อมูลหมวดหมู่", error });
    }
};

// เพิ่มหมวดหมู่ใหม่
const addCategory = async (req, res) => {
    const { type_name } = req.body;
    if (!type_name) {
        return res.status(400).json({ success: false, message: "กรุณาระบุชื่อหมวดหมู่" });
    }
    try {
        const insertId = await categoryModel.addCategory(type_name);
        res.json({ success: true, message: "เพิ่มหมวดหมู่สำเร็จ", insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "ไม่สามารถเพิ่มหมวดหมู่ได้", error });
    }
};

// แก้ไขหมวดหมู่
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { type_name } = req.body;
    if (!type_name) {
        return res.status(400).json({ success: false, message: "กรุณาระบุชื่อหมวดหมู่" });
    }
    try {
        await categoryModel.updateCategory(id, type_name);
        res.json({ success: true, message: "แก้ไขหมวดหมู่สำเร็จ" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "ไม่สามารถแก้ไขข้อมูลได้", error });
    }
};

// ลบหมวดหมู่
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        await categoryModel.deleteCategory(id);
        res.json({ success: true, message: "ลบหมวดหมู่สำเร็จ" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "ไม่สามารถลบข้อมูลได้", error });
    }
};


module.exports = {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryById
};

