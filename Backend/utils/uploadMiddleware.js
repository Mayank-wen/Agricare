const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(), // Store as buffer instead of file
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only JPEG, PNG and WebP images are allowed"
        ),
        false
      );
    }
  },
});

module.exports = upload;
