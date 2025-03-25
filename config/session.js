const session = require("express-session");
require("dotenv").config();

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET || "mysecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // ใช้ `true` ถ้าเป็น HTTPS
});

module.exports = sessionMiddleware;
