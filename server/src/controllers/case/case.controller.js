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
exports.getCaseNumber = exports.getCaseById = exports.getAllCases = exports.createActiveCase = exports.createPassiveCase = void 0;
const case_query_1 = require("../../models/case/case.query");
const sessionManagement_1 = require("../../middlewares/sessionManagement");
const cyclist_query_1 = require("../../models/cyclist/cyclist.query");
const technician_query_1 = require("../../models/technician/technician.query");
const order_query_1 = require("../../models/order/order.query");
const database_1 = require("../../models/database");
const case_model_1 = require("../../models/case/case.model");
const createPassiveCase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log(req.body);
    try {
        const { type, tags, note, supportTime, interventionDetails, orderId } = req.body;
        const token = req.cookies.accessToken;
        const session = (0, sessionManagement_1.getSession)(token);
        if (session) {
            const cyclist = yield (0, cyclist_query_1.findCyclistByEmail)(session.userEmail);
            if (!cyclist) {
                return res.status(404).send('Cyclist not found.');
            }
            const order = yield (0, order_query_1.findOrderById)(new database_1.Types.ObjectId(orderId));
            if (order) {
                const subparts = order.bicycleParts;
                const technician = yield (0, technician_query_1.findSubpartTechnician)(subparts);
                const technicianId = technician === null || technician === void 0 ? void 0 : technician._id;
                const newCase = {
                    cyclist: cyclist._id,
                    bicycle: cyclist.bicycle,
                    technician: technicianId,
                    order: orderId,
                    status: 'ongoing',
                    type,
                    tags,
                    note,
                    interventionDetails,
                    supportTime,
                };
                const createdCase = yield (0, case_query_1.createNewCase)(newCase);
                if (createdCase) {
                    (_a = cyclist.cases) === null || _a === void 0 ? void 0 : _a.push(createdCase._id);
                    yield cyclist.save();
                    (_b = technician === null || technician === void 0 ? void 0 : technician.cases) === null || _b === void 0 ? void 0 : _b.push(createdCase._id);
                    yield (technician === null || technician === void 0 ? void 0 : technician.save());
                    res.status(200).send(createdCase);
                    return;
                }
            }
            return res.status(401).send('Order Not Found!');
        }
        return res.status(401).send('Session Not Found!');
    }
    catch (error) {
        console.error('Creating case failed!', error);
        res.status(501).send('Creating case failed!');
    }
});
exports.createPassiveCase = createPassiveCase;
const createActiveCase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { type, tags, supportTime, interventionDetails, subparts } = req.body;
        const token = req.cookies.accessToken;
        const session = (0, sessionManagement_1.getSession)(token);
        if (session) {
            const cyclist = yield (0, cyclist_query_1.findCyclistByEmail)(session.userEmail);
            if (!cyclist) {
                return res.status(404).send('Cyclist not found.');
            }
            const technician = yield (0, technician_query_1.findSubpartTechnician)(subparts);
            const technicianId = technician === null || technician === void 0 ? void 0 : technician._id;
            const newCase = {
                cyclist: cyclist._id,
                bicycle: cyclist.bicycle,
                technician: technicianId,
                status: 'ongoing',
                type,
                tags,
                interventionDetails,
                supportTime,
            };
            const createdCase = yield (0, case_query_1.createNewCase)(newCase);
            if (createdCase) {
                (_c = cyclist.cases) === null || _c === void 0 ? void 0 : _c.push(createdCase._id);
                yield cyclist.save();
                res.status(200).send(createdCase);
                return;
            }
        }
        return res.status(401).send('Unauthorized');
    }
    catch (error) {
        console.error('Creating case failed!', error);
        res.status(501).send('Creating case failed!');
    }
});
exports.createActiveCase = createActiveCase;
const getAllCases = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.accessToken;
        const session = (0, sessionManagement_1.getSession)(token);
        if (session) {
            const cases = yield (0, case_query_1.findAllCases)(session.userEmail);
            res.status(200).send(cases);
        }
    }
    catch (error) {
        console.error('Could not get all cases!');
        res.status(502).send('Could not find all cases!');
    }
});
exports.getAllCases = getAllCases;
const getCaseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const caseId = req.params.id;
        if (!caseId) {
            res.status(402).send('Case id not found!');
            return;
        }
        const caseResult = yield (0, case_query_1.findCaseById)(caseId);
        res.status(200).send(caseResult);
    }
    catch (error) {
        console.error('Could not find case!');
        res.status(502).send('Could not find case!');
    }
});
exports.getCaseById = getCaseById;
const getCaseNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const caseResult = yield case_model_1.CaseModel.find({});
        res.status(200).send({ caseNumber: caseResult.length + 2 });
    }
    catch (error) {
        console.error('Could not find case!');
        res.status(502).send('Could not find case!');
    }
});
exports.getCaseNumber = getCaseNumber;
