"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BicycleModel = void 0;
const database_1 = require("../database");
const dailyCommute_schema_1 = require("./dailyCommute.schema");
const recreationalCommute_schema_1 = require("./recreationalCommute.schema");
const bicyclePart_schema_1 = require("./bicyclePart.schema");
const bicycleSchema = new database_1.Schema({
    brand: { type: String, required: false },
    model: { type: String, required: true },
    serialNumber: { type: Number, required: true },
    purchaseMonth: { type: Number, required: true },
    purchaseYear: { type: Number, required: true },
    isRevised: { type: Boolean, required: true },
    revisionMonth: { type: Number },
    revisionYear: { type: Number },
    dailyCommute: dailyCommute_schema_1.dailyCommuteSchema,
    recreationalCommute: recreationalCommute_schema_1.recreationalCommuteSchema,
    bicycleParts: {
        type: [bicyclePart_schema_1.bicyclePartsSchema],
    },
    totalHealth: { type: Number, default: 100, required: true },
});
const BicycleModel = (0, database_1.model)('Bicycle', bicycleSchema);
exports.BicycleModel = BicycleModel;
