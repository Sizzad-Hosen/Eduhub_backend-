"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendImageToCloudinary = exports.upload = void 0;
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// 🔁 Ensure 'uploads/' folder exists
const uploadFolder = path_1.default.join(process.cwd(), 'uploads');
if (!fs_1.default.existsSync(uploadFolder)) {
    fs_1.default.mkdirSync(uploadFolder);
}
// Multer setup
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});
exports.upload = (0, multer_1.default)({ storage });
// Cloudinary uploader
const sendImageToCloudinary = (imageName, localPath) => {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.upload(localPath, { public_id: imageName.trim(), folder: 'eduHub' }, (error, result) => {
            if (error) {
                return reject(error);
            }
            // ✅ Delete temp file after upload
            fs_1.default.unlink(localPath, (err) => {
                if (err)
                    console.error("❌ Failed to delete temp file:", err);
                else
                    console.log("✅ Temp file deleted:", localPath);
            });
            resolve(result);
        });
    });
};
exports.sendImageToCloudinary = sendImageToCloudinary;
