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
const cors_1 = __importDefault(require("cors"));
const app_1 = __importDefault(require("../src/app"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./app/config"));
// import seedSuperAdmin from './app/DB'
let server;
// Middleware
app_1.default.use(express_1.default.json());
app_1.default.use((0, cors_1.default)());
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to MongoDB
            yield mongoose_1.default.connect(config_1.default.database_url);
            // seedSuperAdmin();
            console.log('Database connected successfully');
            // Start the Express server
            server = app_1.default.listen(config_1.default.port, () => {
                console.log(`Example app listening on port ${config_1.default.port}`);
            });
        }
        catch (error) {
            console.error('Error connecting to the database or starting the server:', error);
        }
    });
}
// Start the application
main();
process.on('unhandledRejection', (reason) => {
    console.error('😈 Unhandled Rejection:', reason);
    // Optional: Close DB, Server, etc.
    process.exit(1);
});
process.on('uncaughtException', () => {
    console.log(`😈 uncaughtException is detected , shutting down ...`);
    process.exit(1);
});
