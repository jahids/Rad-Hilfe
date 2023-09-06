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
exports.getAllDamagedParts = exports.bicycleHealthUpgration = exports.getAllBicycle = exports.updateBicycle = exports.findBicycleHealthById = exports.getBicycleById = exports.createBicycle = void 0;
const bicycle_model_1 = require("./bicycle.model");
const moment_1 = __importDefault(require("moment"));
const subpart_query_1 = require("../subpart/subpart.query");
(0, moment_1.default)().format();
const createBicycle = (bicycle, lastMaintained) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bicycleSubparts = yield (0, subpart_query_1.getAllSubpart)();
        if (bicycleSubparts) {
            const BicycleParts = bicycleSubparts.map((subpart) => ({
                subpart: subpart._id,
                health: 100,
                lastMaintained: lastMaintained,
            }));
            bicycle.bicycleParts = BicycleParts;
            return yield bicycle_model_1.BicycleModel.create(bicycle);
        }
        return null;
    }
    catch (error) {
        console.error(error);
    }
});
exports.createBicycle = createBicycle;
const getBicycleById = (bicycleId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bicycle = yield bicycle_model_1.BicycleModel.findById({ _id: bicycleId }).populate('bicycleParts.subpart');
        if (bicycle) {
            return bicycle;
        }
        return null;
    }
    catch (error) {
        console.error(error);
    }
});
exports.getBicycleById = getBicycleById;
const findBicycleHealthById = (bicycleId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bicycle = yield bicycle_model_1.BicycleModel.findById({ _id: bicycleId }, { totalHealth: 1 });
        if (bicycle)
            return bicycle;
        return null;
    }
    catch (error) {
        console.error(error);
    }
});
exports.findBicycleHealthById = findBicycleHealthById;
const updateBicycle = (bicycleId, bicycle, lastMaintained) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bicycleSubparts = yield (0, subpart_query_1.getAllSubpart)();
        if (bicycleSubparts) {
            const BicycleParts = bicycleSubparts.map((subpart) => ({
                subpart: subpart._id,
                health: 100,
                lastMaintained: lastMaintained,
            }));
            bicycle.bicycleParts = BicycleParts;
            const updatedBicycle = yield bicycle_model_1.BicycleModel.findOneAndUpdate({ _id: bicycleId }, { $set: bicycle }, { new: true }).exec();
            return updatedBicycle;
        }
        return null;
    }
    catch (error) {
        console.error(error);
    }
});
exports.updateBicycle = updateBicycle;
const getAllBicycle = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBicycle = yield bicycle_model_1.BicycleModel.find({});
        return allBicycle;
    }
    catch (error) {
        console.error(error);
    }
});
exports.getAllBicycle = getAllBicycle;
const bicycleHealthUpgration = (bicycleId, bicycle) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedBicycle = yield bicycle_model_1.BicycleModel.findOneAndUpdate({ _id: bicycleId }, { $set: bicycle }, { new: true });
        if (!updatedBicycle) {
            throw new Error('Bicycle not found!');
        }
        return updatedBicycle;
    }
    catch (error) {
        console.error(error);
    }
});
exports.bicycleHealthUpgration = bicycleHealthUpgration;
const getAllDamagedParts = (bicycleId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bicycle = yield bicycle_model_1.BicycleModel.find({ _id: bicycleId }, { bicycleParts: 1 });
        if (bicycle) {
            return bicycle[0].bicycleParts;
        }
        return null;
    }
    catch (error) {
        console.error(error);
    }
});
exports.getAllDamagedParts = getAllDamagedParts;
