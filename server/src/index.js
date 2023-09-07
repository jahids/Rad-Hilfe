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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const router_1 = require("./routers/router");
const dotenv = __importStar(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv.config({ path: __dirname + '/.env' });
// dotenv.config();
console.clear();
console.log(`Time : ${new Date().toLocaleTimeString()}`);
const app = (0, express_1.default)();
const corsConfig = {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://192.168.68.60:5173/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};
app.use((0, cors_1.default)(corsConfig));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(router_1.router);
try {
    mongoose_1.default.connection.on('open', () => console.log('🍁 Connected to Database'));
    app.listen(process.env.SERVER_PORT, () => {
        console.log(`🚀 Server is listening on port http://localhost:${process.env.SERVER_PORT}`);
    });
}
catch (error) {
    console.log(error);
}
