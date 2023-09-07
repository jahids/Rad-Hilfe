"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CyclistModel = void 0;
const database_1 = require("../database");
const cyclistSchema = new database_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    role: { type: String, required: true },
    homeAddress: { type: String, required: false },
    workAddress: { type: String, required: false },
    phone: { type: String, required: false },
    bicycle: { type: database_1.Types.ObjectId, ref: "BicycleModel" },
    plan: {
        type: String,
        enum: ["Basic", "Qover", "Slipstream"],
        required: true,
    },
    orders: [{ type: database_1.Types.ObjectId, ref: "OrderModel" }],
    cases: [{ type: database_1.Types.ObjectId, ref: "CaseModel" }],
    imageUrl: { type: String },
});
const CyclistModel = (0, database_1.model)("Cyclist", cyclistSchema);
exports.CyclistModel = CyclistModel;
