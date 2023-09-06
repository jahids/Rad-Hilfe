"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseModel = void 0;
const database_1 = require("../database");
const interventionDetails_schema_1 = require("./interventionDetails.schema");
const note_schema_1 = require("./note.schema");
const supportTime_schema_1 = require("./supportTime.schema");
const caseSchema = new database_1.Schema({
    caseNumber: { type: Number },
    createdTime: { type: Date, default: new Date(), required: true },
    status: { type: String, required: true },
    cyclist: { type: database_1.Schema.Types.ObjectId, ref: 'Cyclist', required: true },
    technician: {
        type: database_1.Schema.Types.ObjectId,
        ref: 'Technician',
        required: false,
    },
    bicycle: { type: database_1.Schema.Types.ObjectId, ref: 'Bicycle', required: true },
    type: { type: String, required: true },
    tags: [{ type: String }],
    order: { type: database_1.Schema.Types.ObjectId, ref: 'Order' },
    note: [note_schema_1.noteSchema],
    supportTime: supportTime_schema_1.supportTimeSchema,
    interventionDetails: interventionDetails_schema_1.interventionDetailsSchema,
    videoURL: { type: String },
});
const CaseModel = (0, database_1.model)('Case', caseSchema);
exports.CaseModel = CaseModel;
