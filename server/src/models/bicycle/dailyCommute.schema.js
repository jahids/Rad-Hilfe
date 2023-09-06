"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dailyCommuteSchema = void 0;
const database_1 = require("../database");
const dailyCommuteSchema = new database_1.Schema({
    days: {
        type: [String],
        required: true,
    },
    unpavedRoad: { type: Number, required: true },
    totalDistance: { type: Number, required: true },
});
exports.dailyCommuteSchema = dailyCommuteSchema;
