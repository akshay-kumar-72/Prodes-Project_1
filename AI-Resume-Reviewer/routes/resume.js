const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadResume } = require("../controllers/resumeController");

// Setup multer to save files in /uploads folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// POST /api/resume/upload
router.post("/upload", upload.single("resume"), uploadResume);

module.exports = router;

