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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticator = void 0;
const sessionManagement_1 = require("./sessionManagement");
const authenticator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.accessToken;
    if (!token) {
        res.status(400).send('Token not found!');
        return;
    }
    const existingSession = (0, sessionManagement_1.getSession)(token);
    if (!existingSession) {
        res.status(400).send('Session does not exist!  1');
        return;
    }
    next();
});
exports.authenticator = authenticator;
