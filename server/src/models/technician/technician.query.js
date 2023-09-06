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
exports.findAvailableSupportTimeForCyclist = exports.findSubpartTechnician = exports.addTechnicianDetails = exports.updateTechnicianPassword = exports.findTechnicianById = exports.findTechnicianByEmail = exports.createTechnician = void 0;
const case_model_1 = require("../case/case.model");
const database_1 = require("../database");
const technician_model_1 = require("./technician.model");
const createTechnician = (TechnicianDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield technician_model_1.TechnicianModel.create(TechnicianDetails);
    }
    catch (error) {
        console.log(error);
    }
});
exports.createTechnician = createTechnician;
const findTechnicianByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield technician_model_1.TechnicianModel.findOne({ email: email });
    }
    catch (error) {
        console.log(error);
    }
});
exports.findTechnicianByEmail = findTechnicianByEmail;
const updateTechnicianPassword = (email, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield technician_model_1.TechnicianModel.findOneAndUpdate({ email: email }, { password: newPassword });
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateTechnicianPassword = updateTechnicianPassword;
const findTechnicianById = (technicianId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield technician_model_1.TechnicianModel.findOne({ _id: technicianId });
    }
    catch (error) {
        console.log(error);
    }
});
exports.findTechnicianById = findTechnicianById;
const addTechnicianDetails = (email, setTechnician) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield technician_model_1.TechnicianModel.findOneAndUpdate({ email: email }, {
            $set: {
                imageUrl: setTechnician.imageUrl,
                address: setTechnician.address,
                phone: setTechnician.phone,
            },
            $push: {
                brandsExpertise: { $each: setTechnician.brandsExpertise },
                subpartExpertise: { $each: setTechnician.subpartExpertise },
                workingDays: { $each: setTechnician.workingDays },
                workingSlots: { $each: setTechnician.workingSlots },
            },
        }, { new: true });
    }
    catch (error) {
        console.log(error);
    }
});
exports.addTechnicianDetails = addTechnicianDetails;
const findSubpartTechnician = (subparts) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const technicians = yield technician_model_1.TechnicianModel.find({ subpartExpertise: { $in: subparts } });
        if (technicians) {
            const techniciansWithMatches = technicians.map((technician) => technician.subpartExpertise && {
                technician,
                matchCount: technician.subpartExpertise.filter((subpart) => subparts.includes(subpart))
                    .length,
            });
            techniciansWithMatches.sort((a, b) => b.matchCount - a.matchCount);
            const sortedTechnicians = techniciansWithMatches.map((entry) => entry.technician);
            return sortedTechnicians[0];
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.findSubpartTechnician = findSubpartTechnician;
const findAvailableSupportTimeForCyclist = (technicianId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const cases = yield case_model_1.CaseModel.find({ technician: technicianId });
    let allSupportTime;
    if (cases) {
        allSupportTime = cases
            .map((oneCase) => {
            return oneCase.supportTime;
        })
            .filter((oneCase) => {
            return oneCase;
        });
    }
    const Day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const technician = yield findTechnicianById(new database_1.Types.ObjectId(technicianId));
    if (technician) {
        const availableSupportTime = [];
        for (let day = 0; day < 7; day++) {
            const checkingDay = new Date();
            checkingDay.setDate(new Date().getDate() + day + 2);
            if ((_a = technician.workingDays) === null || _a === void 0 ? void 0 : _a.includes(Day[checkingDay.getDay()])) {
                if (allSupportTime === undefined || allSupportTime.length == 0) {
                    const dateSlotTime = {
                        date: checkingDay,
                        slots: (_b = technician.workingSlots) === null || _b === void 0 ? void 0 : _b.filter((slot) => slot),
                    };
                    availableSupportTime.push(dateSlotTime);
                }
                else {
                    const checkSlotsOfDay = allSupportTime.reduce((accumulator, supportTime) => {
                        const supportDate = supportTime.timeStamp;
                        if (supportDate.getDate === checkingDay.getDate &&
                            supportDate.getMonth === checkingDay.getMonth &&
                            supportDate.getFullYear === supportDate.getFullYear) {
                            accumulator.push(supportTime.slotTime);
                        }
                        return accumulator;
                    }, []);
                    availableSupportTime.push({
                        date: checkingDay,
                        slots: (_c = technician.workingSlots) === null || _c === void 0 ? void 0 : _c.filter((slot) => !checkSlotsOfDay.includes(slot.slotTime)),
                    });
                }
            }
        }
        return availableSupportTime;
    }
});
exports.findAvailableSupportTimeForCyclist = findAvailableSupportTimeForCyclist;
