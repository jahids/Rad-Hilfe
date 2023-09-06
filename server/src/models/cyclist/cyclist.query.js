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
exports.addBicycle = exports.addCyclistPlan = exports.addCyclistAddress = exports.updateCyclistPassword = exports.findCyclistByEmail = exports.createCyclist = void 0;
const cyclist_model_1 = require("./cyclist.model");
const createCyclist = (cyclistDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield cyclist_model_1.CyclistModel.create(cyclistDetails);
    }
    catch (error) {
        console.log(error);
    }
});
exports.createCyclist = createCyclist;
const findCyclistByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield cyclist_model_1.CyclistModel.findOne({ email: email });
    }
    catch (error) {
        console.log(error);
    }
});
exports.findCyclistByEmail = findCyclistByEmail;
const updateCyclistPassword = (email, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield cyclist_model_1.CyclistModel.findOneAndUpdate({ email: email }, { password: newPassword });
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateCyclistPassword = updateCyclistPassword;
const addCyclistAddress = (email, homeAddress, workAddress) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield cyclist_model_1.CyclistModel.findOneAndUpdate({ email: email }, { homeAddress: homeAddress, workAddress: workAddress });
    }
    catch (error) {
        console.log(error);
    }
});
exports.addCyclistAddress = addCyclistAddress;
const addCyclistPlan = (email, plan) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield cyclist_model_1.CyclistModel.findOneAndUpdate({ email: email }, { plan: plan });
    }
    catch (error) {
        console.log(error);
    }
});
exports.addCyclistPlan = addCyclistPlan;
const addBicycle = (email, bicycleId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield cyclist_model_1.CyclistModel.findOneAndUpdate({ email: email }, { bicycle: bicycleId });
    }
    catch (error) {
        console.log(error);
    }
});
exports.addBicycle = addBicycle;
