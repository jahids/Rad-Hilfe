"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotSchema = void 0;
const database_1 = require("../database");
exports.slotSchema = new database_1.Schema({
    slotTime: {
        type: String,
        require: true,
    },
    slotName: {
        type: String,
        require: true,
    },
});
