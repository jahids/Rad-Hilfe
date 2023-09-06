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
exports.findCaseById = exports.findAllCases = exports.createNewCase = void 0;
const case_model_1 = require("./case.model");
const cyclist_query_1 = require("../cyclist/cyclist.query");
const technician_query_1 = require("../technician/technician.query");
const createNewCase = (item) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lastCase = yield case_model_1.CaseModel.findOne({}, {}, { sort: { caseNumber: -1 } });
        const newCase = yield case_model_1.CaseModel.create(Object.assign(Object.assign({}, item), { caseNumber: lastCase && lastCase.caseNumber ? lastCase.caseNumber : 1 }));
        if (newCase) {
            const updatedCase = yield case_model_1.CaseModel.findByIdAndUpdate({ _id: newCase._id }, {
                $inc: {
                    caseNumber: 1,
                },
            }, { new: true });
            return updatedCase;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.createNewCase = createNewCase;
const findAllCases = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cyclist = yield (0, cyclist_query_1.findCyclistByEmail)(email);
        const technician = yield (0, technician_query_1.findTechnicianByEmail)(email);
        if (cyclist && cyclist.role === 'cyclist') {
            return yield case_model_1.CaseModel.find({ cyclist: cyclist === null || cyclist === void 0 ? void 0 : cyclist._id }).populate({
                path: 'order',
                populate: 'bicycleParts',
            });
        }
        else {
            return yield case_model_1.CaseModel.find({ technician: technician === null || technician === void 0 ? void 0 : technician._id }).populate('cyclist').populate({ path: 'bicycle', populate: 'totalHealth' }).populate({
                path: 'order',
                populate: 'bicycleParts',
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.findAllCases = findAllCases;
const findCaseById = (caseId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield case_model_1.CaseModel.find({ _id: caseId }).populate('cyclist').populate('technician').populate({ path: 'bicycle', populate: 'bicycleParts.subpart' }).populate({
        path: 'order',
        populate: 'bicycleParts',
    });
});
exports.findCaseById = findCaseById;
