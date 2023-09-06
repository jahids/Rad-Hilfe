"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interventionDetailsSchema = void 0;
const database_1 = require("../../models/database");
const interventionDetailsSchema = new database_1.Schema({
    firstCall: {
        type: database_1.Schema.Types.Mixed,
    },
    followUpCall: { type: database_1.Schema.Types.Mixed },
    supportQuality: { type: Number },
});
exports.interventionDetailsSchema = interventionDetailsSchema;
