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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const sendEmail = (to, html) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // ✅ Create a transporter for Gmail
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 465, // Use 587 if 465 doesn't work
            secure: true, // true for 465, false for 587
            auth: {
                user: config_1.default.email_user, // Use environment variable
                pass: config_1.default.email_pass, // Use App Password (not regular password)
            },
        });
        yield transporter.sendMail({
            from: `"Sizzad Hosen" <${config_1.default.email_user}>`, // Sender email
            to, // Recipient email
            subject: "Please change your password", // Subject
            text: "Hello world?", // Plain text
            html, // HTML content
        });
        console.log("✅ Email sent successfully");
    }
    catch (error) {
        console.error("❌ Error sending email:", error);
    }
});
exports.sendEmail = sendEmail;
