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
exports.getSubpartById = exports.getAllSubpart = exports.addAllSubpart = void 0;
const subpart_model_1 = require("./subpart.model");
const addAllSubpart = (subparts) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield subpart_model_1.SubpartModel.insertMany(subparts);
    }
    catch (error) {
        console.log(error);
    }
});
exports.addAllSubpart = addAllSubpart;
const getAllSubpart = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield subpart_model_1.SubpartModel.find({});
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllSubpart = getAllSubpart;
const getSubpartById = (subpartId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield subpart_model_1.SubpartModel.findById(subpartId);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getSubpartById = getSubpartById;
