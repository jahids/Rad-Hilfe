"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportTimeSchema = void 0;
const database_1 = require("../database");
const supportTimeSchema = new database_1.Schema({
    slotName: {
        type: String,
        required: true,
    },
    slotTime: {
        type: String,
        required: true,
    },
    timeStamp: {
        type: Date,
        required: true,
    },
});
exports.supportTimeSchema = supportTimeSchema;
