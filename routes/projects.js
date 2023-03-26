import express, { response } from "express";
import {
  addProject,
  deleteProject,
  errHandler,
  getProject,
  getProjects,
  updateProject,
} from "../controllers/projects.js";
import path from "path";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 2024,
  },
});

router.get("/", getProjects);
router.get("/:id", getProject);
router.use("/img_project", express.static("images"));
router.post("/abdullah_projects_upload", upload.single("image"), addProject);
router.delete("/:id", deleteProject);
router.patch("/:id", updateProject);
router.use(errHandler);

export default router;
