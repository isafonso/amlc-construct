import { Router } from "express";
import ProductController from "./controllers/product";
import UserController from "./controllers/user";
import multer from "multer";
import { storage } from "./config/multer";

const router = Router();
const upload = multer({ storage: storage });

router.get("/", ProductController.index);
router.get("/galeria", ProductController.read);
router.post("/post", upload.single("picture"), ProductController.create);
router.post("/createUser", UserController.create);
router.post("/findUser", UserController.read);
router.get("/findProduct", ProductController.read);

export default router;
