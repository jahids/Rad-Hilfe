"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const database_1 = require("../database");
const orderSchema = new database_1.Schema({
    bicycleParts: { type: [database_1.Types.ObjectId], ref: 'Subpart', required: true },
    deliveryAddress: { type: String, required: true },
    contactNumber: { type: String, required: true },
    note: { type: String },
    slot: { type: String, required: true },
    totalPrice: { type: Number, required: true },
});
const OrderModel = (0, database_1.model)('Order', orderSchema);
exports.OrderModel = OrderModel;
