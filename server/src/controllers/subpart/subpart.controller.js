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
exports.allSubpart = exports.addSubparts = void 0;
const subpart_query_1 = require("../../models/subpart/subpart.query");
const subparts_json_1 = __importDefault(require("../../models/bicycle/subparts.json"));
const sessionManagement_1 = require("../../middlewares/sessionManagement");
const addSubparts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allSubpart = req.body;
        yield (0, subpart_query_1.addAllSubpart)(allSubpart);
        res.status(200).send('All subparts added.');
    }
    catch (error) {
        console.log(error);
    }
});
exports.addSubparts = addSubparts;
const allSubpart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.accessToken;
        const session = (0, sessionManagement_1.getSession)(token);
        if (session) {
            res.status(200).send(subparts_json_1.default);
            return;
        }
        res.status(200).send('Session not found!');
    }
    catch (error) {
        console.error('Could not get plan!');
        res.status(500).send('Server Error!');
    }
});
exports.allSubpart = allSubpart;
