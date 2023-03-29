const multer = require("multer");
const Jimp = require("jimp");
const crypto = require("crypto");
const path = require("path");
const { asyncErrorHandler } = require("../utils");

let tempFilePath = "";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp");
  },
  filename: function (req, file, cb) {
    const name = file.originalname.split(".");
    cb(null, `${req.user.id}.${name[1]}`);
    tempFilePath = path.resolve(`./tmp/${req.user.id}.${name[1]}`);
  },
});

const upload = multer({ storage: storage });

const uploadFile = asyncErrorHandler(async (req, res, next) => {
  const avatarFileName = `${path.resolve("./src/public/avatars")}/${
    req.user.id
  }/${crypto.randomUUID()}.jpg`;
  Jimp.read(tempFilePath, (err, avatar) => {
    if (err) throw err;
    avatar.cover(250, 250).quality(100).write(avatarFileName);
  });
  req.user.avatarURL = avatarFileName;
  await req.user.save();
  res.json(req.user);
});

module.exports = { uploadFile, upload };
