import { Router } from "express";
const router = Router();

router.get("/profile", (req, res) => {
  res.send("User Profile");
});

export default router;
