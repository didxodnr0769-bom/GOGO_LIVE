import { Router } from "express";
const router = Router();

router.get("/rooms", (req, res) => {
  res.send("Chat Rooms");
});

// 채팅 전송
//
export default router;
