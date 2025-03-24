
import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { Request, Response } from "express";
import route from "./routes/route";
const app: express.Application = express();
app.use(express.json());
app.use("/user", route);
app.get("/check", (req: any, res: any) => {
  console.log("checking");
  return res.status(200).json({ message: " Express Works" });
});
app.get("/",(req,res)=>{
    res.send("Hi");
})
const port: number = 4000;
app.listen(port, async () => {
  try {
    await AppDataSource.initialize();
    console.log("connected to mysql");
    console.log('Server running on port 4000');
  } catch (error) {
    console.log("database error", error);
  }
});
// // Handling '/' Request
// app.get('/', (_req, _res) => {
//     _res.send("TypeScript With Express");
// });




