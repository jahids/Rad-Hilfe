"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bicyclePartsSchema = void 0;
const database_1 = require("../database");
const bicyclePartsSchema = new database_1.Schema({
    subpart: {
        type: database_1.Types.ObjectId,
        ref: 'Subpart',
    },
    health: {
        type: Number,
        default: 100,
    },
    lastMaintained: {
        type: Date,
        default: Date.now,
    },
});
exports.bicyclePartsSchema = bicyclePartsSchema;
