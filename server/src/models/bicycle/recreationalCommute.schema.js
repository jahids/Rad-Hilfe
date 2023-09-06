"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recreationalCommuteSchema = void 0;
const database_1 = require("../database");
const recreationalCommuteSchema = new database_1.Schema({
    days: {
        type: [String],
        require: true,
    },
    activityType: { type: [String], required: true },
    lengthOfRide: { type: Number, required: true },
});
exports.recreationalCommuteSchema = recreationalCommuteSchema;
