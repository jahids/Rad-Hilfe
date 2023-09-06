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
exports.bicycleDamagedPart = exports.setUpBicycleEdit = exports.getBicycleHealth = exports.getBicycle = exports.setUpBicycle = void 0;
const database_1 = require("../../models/database");
const moment_1 = __importDefault(require("moment"));
(0, moment_1.default)().format();
const bicycle_query_1 = require("../../models/bicycle/bicycle.query");
const sessionManagement_1 = require("../../middlewares/sessionManagement");
const cyclist_query_1 = require("../../models/cyclist/cyclist.query");
const subparts_json_1 = __importDefault(require("../../models/bicycle/subparts.json"));
const setUpBicycle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { brand, model, serialNumber, purchaseMonth, purchaseYear, isRevised, revisionMonth, revisionYear, dailyCommute, recreationalCommute, } = req.body;
        const newBicycle = {
            brand,
            model,
            serialNumber,
            purchaseMonth,
            purchaseYear,
            isRevised,
            revisionMonth,
            revisionYear,
            dailyCommute,
            recreationalCommute,
            totalHealth: 100,
        };
        let lastRevisionMonth = purchaseMonth;
        let lastRevisionYear = purchaseYear;
        if (isRevised) {
            revisionMonth && (lastRevisionMonth = revisionMonth);
            revisionYear && (lastRevisionYear = revisionYear);
        }
        const lastRevisionDate = (0, moment_1.default)([lastRevisionYear, lastRevisionMonth - 1]);
        const createdBicycle = yield (0, bicycle_query_1.createBicycle)(newBicycle, lastRevisionDate);
        const token = req.cookies.accessToken;
        const session = (0, sessionManagement_1.getSession)(token);
        if (session && createdBicycle) {
            const bicycleId = new database_1.Types.ObjectId(createdBicycle._id);
            yield (0, cyclist_query_1.addBicycle)(session.userEmail, bicycleId);
            res.status(201).send(createdBicycle);
            return;
        }
        res.status(401).send('Session Unavailable!');
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Server Error!');
    }
});
exports.setUpBicycle = setUpBicycle;
const getBicycle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bicycleId = req.params.id;
        const bicycle = yield (0, bicycle_query_1.getBicycleById)(new database_1.Types.ObjectId(bicycleId));
        if (!bicycle) {
            return res.status(401).send('Failed to find bicycle!');
        }
        res.status(200).send(bicycle);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getBicycle = getBicycle;
const getBicycleHealth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bicycleId = req.params.id;
        const bicycle = yield (0, bicycle_query_1.findBicycleHealthById)(new database_1.Types.ObjectId(bicycleId));
        if (!bicycle) {
            res.status(401).send('Failed to find bicycle!');
            return;
        }
        res.status(200).send(bicycle);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server Error!');
    }
});
exports.getBicycleHealth = getBicycleHealth;
const setUpBicycleEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bicycleId = req.params.id;
        if (!bicycleId)
            res.status(401).send('Failed to find bicycle!');
        const { brand, model, serialNumber, purchaseMonth, purchaseYear, isRevised, revisionMonth, revisionYear, dailyCommute, recreationalCommute, } = req.body;
        const newBicycle = {
            brand,
            model,
            serialNumber,
            purchaseMonth,
            purchaseYear,
            isRevised,
            revisionMonth,
            revisionYear,
            dailyCommute,
            recreationalCommute,
        };
        let lastRevisionMonth = purchaseMonth;
        let lastRevisionYear = purchaseYear;
        if (isRevised) {
            revisionMonth && (lastRevisionMonth = revisionMonth);
            revisionYear && (lastRevisionYear = revisionYear);
        }
        const lastRevisionDate = (0, moment_1.default)([lastRevisionYear, lastRevisionMonth - 1]);
        const updatedBicycle = yield (0, bicycle_query_1.updateBicycle)(new database_1.Types.ObjectId(bicycleId), newBicycle, lastRevisionDate);
        const token = req.cookies.accessToken;
        const session = (0, sessionManagement_1.getSession)(token);
        if (session) {
            res.status(201).send(updatedBicycle);
            return;
        }
        res.status(401).send('Session Unavailable!');
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Server Error!');
    }
});
exports.setUpBicycleEdit = setUpBicycleEdit;
const bicycleDamagedPart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let bicycleId = req.params.id;
        console.log(bicycleId);
        if (!bicycleId) {
            res.status(401).send('Failed to find bicycle!');
            return;
        }
        const damagedParts = yield (0, bicycle_query_1.getAllDamagedParts)(new database_1.Types.ObjectId(bicycleId));
        if (damagedParts) {
            const updatedDamagePartsInfo = damagedParts.map((part) => {
                const info = subparts_json_1.default.filter((subpart) => subpart._id === String(part.subpart));
                const newInfo = {
                    _id: part.subpart,
                    name: info[0].name,
                    price: info[0].price,
                    category: info[0].category,
                    plan: info[0].plan,
                    health: part.health,
                    lastMaintained: part.lastMaintained,
                };
                return newInfo;
            });
            const newDamagedParts = updatedDamagePartsInfo.filter((part) => part.health < 30);
            res.status(200).send(newDamagedParts);
            return;
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Server Error!');
    }
});
exports.bicycleDamagedPart = bicycleDamagedPart;
