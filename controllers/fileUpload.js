const fileUploader = require("../middleware/fileUpload");

const fs = require("fs");

const uploadFile = async (req, res) => {
  try {
    await fileUploader(req, res);
    if (req.files === undefined) {
      res.status(400).json({ error: true, message: "Choose a file to upload" });
    } else {
      res.json({
        error: false,
        message:
          "File uploaded successfully: " +
          req.files.map((file) => file.originalname).join(", "),
      });
    }
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res
        .status(500)
        .json({ error: true, message: "File size should be less than 5MB" });
    } else {
      res
        .status(500)
        .json({ error: true, message: `something went wrong: ${err}` });
    }
  }
};

const getFilesList = (req, res) => {
  const path = __basedir + "/public/uploads/";
  fs.readdir(path, function (err, files) {
    if (err) {
      res.status(500).json({
        error: true,
        message: "files not found.",
      });
    }

    const URL = req.protocol + '://' + req.get('host') + req.originalUrl + "/"
    const filesList = files.map(file => ({ name: file, url: URL + file }))
    res.status(200).json({ error: false, files: filesList });
  });
};

const downloadFiles = (req, res) => {
  const fileName = req.params.name;
  const path = __basedir + "/public/uploads/";

  res.download(path + fileName, (err) => {
    if (err) {
      res.status(500).json({
        error: true,
        message: "file can not be downloaded: " + err,
      });
    }
  });
};

module.exports = { uploadFile, downloadFiles, getFilesList };
