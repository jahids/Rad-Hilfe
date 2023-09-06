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
exports.technicianAuthorizer = exports.cyclistAuthorizer = void 0;
const sessionManagement_1 = require("./sessionManagement");
const cyclist_query_1 = require("../models/cyclist/cyclist.query");
const technician_query_1 = require("../models/technician/technician.query");
const cyclistAuthorizer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.accessToken;
    const session = (0, sessionManagement_1.getSession)(token);
    if (session) {
        const user = yield (0, cyclist_query_1.findCyclistByEmail)(session.userEmail);
        if (user && user.role === 'cyclist') {
            next();
        }
    }
    else
        res.status(404).send('You are not authorized !!!');
});
exports.cyclistAuthorizer = cyclistAuthorizer;
const technicianAuthorizer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.accessToken;
    const session = (0, sessionManagement_1.getSession)(token);
    if (session) {
        const user = yield (0, technician_query_1.findTechnicianByEmail)(session.userEmail);
        if (user && user.role === 'technician') {
            next();
        }
    }
    else
        res.status(404).send('You are not authorized !!!');
});
exports.technicianAuthorizer = technicianAuthorizer;
