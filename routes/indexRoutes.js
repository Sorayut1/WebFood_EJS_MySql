const express = require('express');
const router = express.Router();


router.get('/menu', (req, res) => {
    res.render("./menu"); // ✅ ต้องตรงกับชื่อไฟล์ใน views/pages/
});

router.get('/menu', (req, res) => {
    res.render('pages/menu');
});

router.get('/cart', (req, res) => {
    res.render('pages/cart');
});

router.get('/orders', (req, res) => {
    res.render('pages/orders');
});

router.get('/contact', (req, res) => {
    res.render('pages/contact');
});

module.exports = router;
