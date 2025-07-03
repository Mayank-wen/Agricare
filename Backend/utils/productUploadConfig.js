const multer = require("multer");
const bucket = require("./firebaseConfig");

const productUpload = multer({
  storage: multer.memoryStorage(), // Use memory storage for Firebase
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

// Create middleware to handle Firebase upload
const handleFirebaseUpload = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded",
      });
    }

    const file = req.file;
    const fileName = `products/${Date.now()}-${file.originalname}`;
    const blob = bucket.file(fileName);

    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on("error", (err) => {
      console.error("Upload error:", err);
      res.status(500).json({
        success: false,
        error: "Failed to upload product image",
      });
    });

    blobStream.on("finish", async () => {
      await blob.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      res.json({
        success: true,
        url: publicUrl,
        filename: fileName,
      });
    });

    blobStream.end(file.buffer);
  } catch (error) {
    console.error("Firebase upload error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to upload to Firebase",
      details: error.message,
    });
  }
};

module.exports = {
  productUpload,
  handleFirebaseUpload,
};
