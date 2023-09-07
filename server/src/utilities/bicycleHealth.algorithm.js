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
exports.bicycleHealthAlgorithm = void 0;
const moment_1 = __importDefault(require("moment"));
const bicycle_query_1 = require("../models/bicycle/bicycle.query");
const bicyclePartsDependency_json_1 = __importDefault(require("./bicyclePartsDependency.json"));
(0, moment_1.default)().format();
const damageCalculateForOnePart = (subpart, dependencyPart, pavedDistance, unpavedDistance, bicycleSubParts) => {
    const k = 217.147240952;
    const damage = Math.E ** ((dependencyPart.roadConditionFactor * (1.2 * unpavedDistance + pavedDistance)) / k);
    if (dependencyPart.dependentPartId === '') {
        subpart.health = Math.max(100 - damage, 0);
    }
    else {
        const dependencySubpart = bicycleSubParts.filter((bicycleSubPart) => {
            return String(bicycleSubPart.subpart._id) === dependencyPart.dependentPartId;
        });
        let CoefficientOfDamageOfFactorComponent = 1;
        if (dependencySubpart[0].health < 70 && dependencySubpart[0].health >= 40) {
            CoefficientOfDamageOfFactorComponent = 1.2;
        }
        else if (dependencySubpart[0].health < 40 && dependencySubpart[0].health >= 20) {
            CoefficientOfDamageOfFactorComponent = 1.4;
        }
        else {
            CoefficientOfDamageOfFactorComponent = 1.5;
        }
        subpart.health = Math.max(100 - CoefficientOfDamageOfFactorComponent * damage, 0);
    }
};
const calculatePartsHealth = (bicycleSubParts, dailyCommuteDays, dailyCommutetotalDistance, dailyCommutedUnpavedRoad, isRecreational, recreationalCommuteDays, recreationalCommutetotalDistance, recreationalCommutedActivityType) => {
    bicyclePartsDependency_json_1.default.forEach((dependencyPart) => {
        const subpart = bicycleSubParts.filter((bicycleSubPart) => {
            return String(bicycleSubPart.subpart._id) === dependencyPart._id;
        });
        if (subpart.length === 0)
            return;
        const lastRevisionDate = (0, moment_1.default)(subpart[0].lastMaintained);
        const totalDailyCommutedPavedDistance = getDistance(2, lastRevisionDate, dailyCommuteDays, dailyCommutetotalDistance, 1 - dailyCommutedUnpavedRoad / 100);
        const totalDailyCommutedUnpavedDistance = getDistance(2, lastRevisionDate, dailyCommuteDays, dailyCommutetotalDistance, dailyCommutedUnpavedRoad / 100);
        let totalRecreationalCommutedPavedDistance = 0;
        let totalRecreationalCommutedUnpavedDistance = 0;
        let unpavedRoadFactor = 0;
        if (isRecreational) {
            if (recreationalCommutedActivityType.includes('off-road')) {
                unpavedRoadFactor = getRecreationalCommuteUnpavedFactor(recreationalCommutedActivityType.length);
            }
            totalRecreationalCommutedPavedDistance = getDistance(1, lastRevisionDate, recreationalCommuteDays, recreationalCommutetotalDistance, 1 - unpavedRoadFactor);
            totalRecreationalCommutedPavedDistance = getDistance(1, lastRevisionDate, recreationalCommuteDays, recreationalCommutetotalDistance, unpavedRoadFactor);
        }
        const totalPavedDistance = totalDailyCommutedPavedDistance + totalRecreationalCommutedPavedDistance;
        const totalUnpavedDistance = totalDailyCommutedUnpavedDistance + totalRecreationalCommutedUnpavedDistance;
        damageCalculateForOnePart(subpart[0], dependencyPart, totalPavedDistance, totalUnpavedDistance, bicycleSubParts);
    });
};
const getRecreationalCommuteUnpavedFactor = (activityTypeLength) => {
    return 1 / activityTypeLength;
};
const getDistance = (way, lastMaintainedDate, rodeDay, rodeDistance, rideFactor) => {
    return way * (0, moment_1.default)().diff(lastMaintainedDate, 'week') * rodeDay * rodeDistance * rideFactor;
};
const bicycleHealthAlgorithm = () => __awaiter(void 0, void 0, void 0, function* () {
    const allBicycle = yield (0, bicycle_query_1.getAllBicycle)();
    // return 0;
    allBicycle &&
        allBicycle.forEach((bicycle) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            let lastRevisionMonth = bicycle.purchaseMonth;
            let lastRevisionYear = bicycle.purchaseYear;
            if (bicycle.isRevised) {
                bicycle.revisionMonth && (lastRevisionMonth = bicycle.revisionMonth);
                bicycle.revisionYear && (lastRevisionYear = bicycle.revisionYear);
            }
            console.log(`all bicycle list 1=`, allBicycle === null || allBicycle === void 0 ? void 0 : allBicycle.length);
            bicycle.bicycleParts &&
                calculatePartsHealth(bicycle.bicycleParts, (_a = bicycle.dailyCommute) === null || _a === void 0 ? void 0 : _a.days.length, (_b = bicycle.dailyCommute) === null || _b === void 0 ? void 0 : _b.totalDistance, (_c = bicycle.dailyCommute) === null || _c === void 0 ? void 0 : _c.unpavedRoad, !!bicycle.recreationalCommute, (_d = bicycle.recreationalCommute) === null || _d === void 0 ? void 0 : _d.days.length, (_e = bicycle.recreationalCommute) === null || _e === void 0 ? void 0 : _e.lengthOfRide, (_f = bicycle.recreationalCommute) === null || _f === void 0 ? void 0 : _f.activityType);
            let totalSubpartHealth = 0;
            (_g = bicycle.bicycleParts) === null || _g === void 0 ? void 0 : _g.forEach((part) => {
                totalSubpartHealth += part === null || part === void 0 ? void 0 : part.health;
            });
            bicycle.totalHealth = totalSubpartHealth / ((_h = bicycle === null || bicycle === void 0 ? void 0 : bicycle.bicycleParts) === null || _h === void 0 ? void 0 : _h.length);
            (0, bicycle_query_1.bicycleHealthUpgration)(bicycle === null || bicycle === void 0 ? void 0 : bicycle._id, bicycle);
        });
});
exports.bicycleHealthAlgorithm = bicycleHealthAlgorithm;
