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
exports.generator = void 0;
const bicycleHealth_algorithm_1 = require("../utilities/bicycleHealth.algorithm");
const generator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Time = ${new Date().toLocaleTimeString()}`);
    yield (0, bicycleHealth_algorithm_1.bicycleHealthAlgorithm)();
    next();
});
exports.generator = generator;
