"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResearcherModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const addressSchema = new mongoose_1.Schema({
    city: { type: String, required: true },
    homeTown: { type: String, required: true },
    presentAddress: { type: String, required: true },
}, { _id: false });
const researchPaperSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    url: { type: String },
    pdfFile: { type: String },
}, { _id: false });
const researcherSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    number: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: addressSchema, required: true },
    expertise: { type: String, required: true },
    experience: { type: String, required: true },
    skill: { type: [String], required: true, },
    bsc: { type: String, required: true },
    msc: { type: String },
    phd: { type: String },
    currentlyWorkingAt: { type: String },
    bio: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    profileImg: { type: String },
    researchArea: { type: String },
    researchPaper: [researchPaperSchema],
}, { timestamps: true });
exports.ResearcherModel = mongoose_1.default.model("Researcher", researcherSchema);
