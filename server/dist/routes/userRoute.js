"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/profile", (req, res) => {
    res.send("User Profile");
});
// POST User 정보 생성
// UUID 아이디 생성
router.post("/", (req, res) => {
    res.send("User Profile");
});
// 소켓 연결 요청
router.post("/socket", (req, res) => { });
exports.default = router;
