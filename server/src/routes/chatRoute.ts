import { Router } from "express";
const router = Router();

router.get("/rooms", (req, res) => {
  res.send("Chat Rooms");
});

export default router;
