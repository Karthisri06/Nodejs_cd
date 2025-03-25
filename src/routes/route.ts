import { Request, Response, Router } from 'express';
import { UserController} from '../controllers/user.controller';
const router = Router();
const user = new UserController();


router.post("/postUser",user.createUser);
router.get("/getUser",user.getUsers);
router.patch("/updateUser/:id", user.putUser);
router.delete("/deleteUser/:id", user.deleteUser);
export default router;
