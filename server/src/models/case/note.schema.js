"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteSchema = void 0;
const database_1 = require("../database");
const noteSchema = new database_1.Schema({
    text: { type: String, required: true },
    timeStamp: { type: Date, required: true },
});
exports.noteSchema = noteSchema;
