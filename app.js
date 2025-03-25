const express = require('express');
const app = express();
const path = require('path');
// const mysql = require('mysql2');
// const multer = require('multer');


const menuRoutes = require('./routes/menuRoutes'); // นำเข้าไฟล์ menu.js
const routes = require('./routes/indexRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const categoryRoutes = require("./routes/categoryRoutes"); // ใช้เส้นทางที่ถูกต้องตามที่คุณตั้งไว้

// ตั้งค่า Routes (เช่น เพิ่ม แก้ไข เมนู)


app.set('views', path.join(__dirname, 'views')); // ✅ บอก Express ว่า views อยู่ที่ไหน
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public'))); // ✅ ให้ Express ใช้ไฟล์ CSS, JS
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
// ตั้งค่า middleware สำหรับ body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use('/', routes);
app.use('/owner', ownerRoutes); // เส้นทางเจ้าของร้านเริ่มต้นด้วย /owner
// เชื่อมโยง route
// app.use('/manageMenu', manageMenuRoutes);


app.use("/api/owner/manageMenu", menuRoutes);
app.use("/api/owner/category", categoryRoutes);



app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
