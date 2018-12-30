const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

// Initialize Express App
const app = express();
// Initialize CORS
app.use(cors());

// Set Multer
// Set Storage Engine
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.toLowerCase());
  }
});

// Initialize single Upload Method
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000
  },
  fileFilter: (req, file, callback) => {
    checkFileType(file, callback);
  }
}).single("upload");

const uploads = multer({
  storage: storage,
  limits: {
    fileSize: 1000000
  },
  fileFilter: (req, file, callback) => {
    checkFileType(file, callback);
  }
}).array("uploads");

// Check File Type Function
checkFileType = (file, callback) => {
  // Allowed Extentions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check Extentions
  const extname = filetypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  // Check MIME Types
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return callback(null, true);
  } else {
    callback("Error: Images Only!");
  }
};

// Root Route
app.get("/", (req, res, next) => {});

// Single Upload Route
app.post("/upload", (req, res, next) => {
  upload(req, res, err => {
    if (err) {
      console.log(err);
    } else {
      res.send(req.file);
    }
  });
});

// Multiple Uploads Route
app.post("/uploads", (req, res, next) => {
  uploads(req, res, err => {
    if (err) {
      console.log(err);
    } else {
      res.send(req.files);
    }
  });
});

// Initialize Port
const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`Server Running on http://localhost:${port}`)
);
