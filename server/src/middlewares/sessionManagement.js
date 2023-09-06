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
exports.destroySession = exports.getSession = exports.createSession = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: path_1.default.join(__dirname, '../.env') });
const SECRET_KEY = process.env.SECRET_KEY || 'HELLO WORLD';
const blockedList = [];
const createSession = (userEmail) => {
    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + 1);
    const newSession = {
        expiresAt: expiry.valueOf(),
        userEmail: userEmail,
    };
    return jsonwebtoken_1.default.sign(newSession, SECRET_KEY);
};
exports.createSession = createSession;
const getSession = (token) => {
    try {
        if (blockedList.includes(token))
            return undefined;
        const sessionData = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        if (sessionData.expiresAt < Date.now()) {
            console.log('Token has expired.');
            return undefined;
        }
        return sessionData;
    }
    catch (error) {
        console.error('Error verifying token:', error);
        return undefined;
    }
};
exports.getSession = getSession;
const destroySession = (token) => {
    blockedList.push(token);
    return true;
};
exports.destroySession = destroySession;
