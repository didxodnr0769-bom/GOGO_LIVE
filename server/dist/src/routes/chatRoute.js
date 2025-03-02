"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/rooms", (req, res) => {
    res.send("Chat Rooms");
});
// 채팅 전송
//
exports.default = router;
