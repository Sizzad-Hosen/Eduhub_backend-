"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (payload, secret, expiresIn) => {
    if (!secret) {
        throw new Error("JWT secret not provided");
    }
    // expiresIn should be part of options with correct typing
    const options = { expiresIn };
    return jsonwebtoken_1.default.sign(payload, secret, options);
};
exports.createToken = createToken;
const verifyToken = (token, secret) => {
    if (!secret) {
        throw new Error("JWT secret not provided");
    }
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyToken = verifyToken;
