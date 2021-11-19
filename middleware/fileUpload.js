const util = require("util");
const multer = require("multer");

const directory = "./public/uploads/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, directory);
  },
  filename: (req, file, cb) => {
    cb(null, getFileName(file));
  },
});

const getFileName = (file, random = false) => {
  if (random) {
    return (Date.now() + "-" + Math.round(Math.random() * 1e9) + "." + file.originalname.split(".").pop()).toLocaleLowerCase()
  }
  else {
    return file.originalname.split(" ").join("_").toLocaleLowerCase()
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg") {
      cb(null, true);
    } else {
      cb(null, false);
      cb(new Error("file type not supported, try with png, jpg"));
    }
  },
}).array("files");

const fileUploadMiddleware = util.promisify(upload);

module.exports = fileUploadMiddleware;
