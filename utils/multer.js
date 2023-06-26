const multer = require("multer");
const path = require("path");

const mimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/PNG", "image/gif", "image/bmp", "image/webp"];

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (mimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file type!"), false);
    }
  },
});



