"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payment1 = void 0;
const paypal_rest_sdk_1 = __importDefault(require("paypal-rest-sdk"));
exports.payment1 = paypal_rest_sdk_1.default.configure({
    mode: 'sandbox',
    client_id: 'ARJU9bN9kdvuJGc89inQmwDhWBsBnHSfrqcjgz7eabP2iwEpCyFVbgQ4cYVpWnIjLi2elAQb4LPBVmrr',
    client_secret: 'EN8Mn0y35178MBrGnBPV6MBBx7MO1RvhysBlbz5EisB1yW7EI9Bu9xva_3a4WmpV-bhL-T7XWbGs5l18',
});
