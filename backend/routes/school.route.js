
import { Router } from "express";
import {
  addSchool,
  getAllSchools,
} from "../controllers/school.controller.js";
import { upload } from "../utils/multer.js";

const router = Router();

router.post("/", upload.single("image"), addSchool);

router.get("/", getAllSchools);


export default router;
