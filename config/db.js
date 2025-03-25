const mysql = require('mysql2/promise');

// สร้างการเชื่อมต่อกับฐานข้อมูล MySQL
const pool = mysql.createPool({
    host: 'localhost',  // เปลี่ยนเป็นโฮสต์ของคุณ
    user: 'root',       // เปลี่ยนเป็นชื่อผู้ใช้ MySQL ของคุณ
    password: '',       // เปลี่ยนเป็นรหัสผ่านของ MySQL
    database: 'foodorder_db', // เปลี่ยนเป็นชื่อฐานข้อมูลของคุณ restaurant_food_db foodorder_db
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0


    
});

module.exports = pool;  // ใช้ pool ได้เลย ไม่ต้องใช้ pool.promise()
