import express from "express";
import user from "./routes/userRoute";
import chat from "./routes/chatRoute";

const app = express();

app.use("/user", user);
app.use("/chat", chat);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
