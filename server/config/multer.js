const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    const folderPath = req.baseUrl.split('/').includes('api') ? req.baseUrl.split('/')[1] : req.baseUrl
    let path = `/app/uploads/${folderPath}`;
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
});

module.exports = upload;
