"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join((process.cwd(), '.env')) });
exports.default = {
    port: process.env.PORT,
    node_env: process.env.NODE_ENV,
    database_url: process.env.DB_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    default_password: process.env.DEFAULT_PASSS,
    super_admin_pass: process.env.SUPER_ADMIN_PASS,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRED_IN,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRED_IN,
    jwt_refresh_secret: (_a = process.env.JWT_REFRESH_SECRET) !== null && _a !== void 0 ? _a : "",
    reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
    email_user: process.env.EMAIL_USER,
    email_pass: process.env.EMAIL_PASS
};
