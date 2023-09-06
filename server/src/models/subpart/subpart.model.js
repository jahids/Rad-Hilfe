"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubpartModel = void 0;
const database_1 = require("../database");
const subpartSchema = new database_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    depreciationRate: { type: Number, required: true },
    category: { type: String, required: true },
    plan: { type: [String], default: [] },
});
const SubpartModel = (0, database_1.model)('Subpart', subpartSchema);
exports.SubpartModel = SubpartModel;
