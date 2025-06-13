"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploder = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const cloudinary_1 = require("cloudinary");
// Configuration
cloudinary_1.v2.config({
    cloud_name: 'dpuortjah',
    api_key: '936846526666599',
    api_secret: 'qtRpOHG1umf2XZwis67NLrJzkfo' // Click 'View API Keys' above to copy your API secret
});
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(process.cwd(), "uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
const uploadToCloudinary = (file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield cloudinary_1.v2.uploader
            .upload(file.path, {
            public_id: file.filename,
        })
            .then((result) => {
            console.log(result);
            fs_1.default.unlinkSync(file.path);
            return result;
        })
            .catch((error) => {
            console.log(error);
            fs_1.default.unlinkSync(file.path);
            throw error;
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.fileUploder = {
    upload,
    uploadToCloudinary
};
