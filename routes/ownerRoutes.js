const express = require('express');
const router = express.Router();


router.get('/dashboard', (req, res) => {
    
    res.render('./owner/dashboard'); // ต้องตรงกับที่อยู่ไฟล์
});
router.get('/manageMenu', (req, res) => {
   
    res.render('./owner/manageMenu'); // ต้องตรงกับที่อยู่ไฟล์
});
router.get('/manageCategory', (req, res) => {
   
    res.render('./owner/manageCategory'); // ต้องตรงกับที่อยู่ไฟล์
});
router.get('/menu', (req, res) => {
   
    res.render('./owner/menu'); // ต้องตรงกับที่อยู่ไฟล์
});


module.exports = router;