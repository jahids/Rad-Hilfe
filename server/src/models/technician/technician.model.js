"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnicianModel = void 0;
const database_1 = require("../database");
const slotSchema_1 = require("./slotSchema");
const technicianSchema = new database_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
    brandsExpertise: [{ type: String }],
    subpartExpertise: [{ type: database_1.Types.ObjectId, ref: 'SubPartModel' }],
    workingDays: [{ type: String }],
    workingSlots: [slotSchema_1.slotSchema],
    cases: [{ type: database_1.Types.ObjectId, ref: 'CaseModel' }],
    wishlist: [{ type: String }],
    imageUrl: { type: String },
});
const TechnicianModel = (0, database_1.model)('Technician', technicianSchema);
exports.TechnicianModel = TechnicianModel;
