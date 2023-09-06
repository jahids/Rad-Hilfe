"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCyclistPlan = exports.findOrderById = exports.createOrder = exports.addOrder = void 0;
const cyclist_query_1 = require("../cyclist/cyclist.query");
const order_model_1 = require("./order.model");
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield order_model_1.OrderModel.create(order);
    }
    catch (error) {
        console.log(error);
    }
});
exports.createOrder = createOrder;
const addOrder = (email, orderId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const cyclist = yield (0, cyclist_query_1.findCyclistByEmail)(email);
        (_a = cyclist === null || cyclist === void 0 ? void 0 : cyclist.orders) === null || _a === void 0 ? void 0 : _a.push(orderId);
        yield (cyclist === null || cyclist === void 0 ? void 0 : cyclist.save());
    }
    catch (error) {
        console.log(error);
    }
});
exports.addOrder = addOrder;
const findOrderById = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield order_model_1.OrderModel.findOne({ _id: orderId });
    }
    catch (error) {
        console.log(error);
    }
});
exports.findOrderById = findOrderById;
const fetchCyclistPlan = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const cyclist = yield (0, cyclist_query_1.findCyclistByEmail)(email);
    return cyclist === null || cyclist === void 0 ? void 0 : cyclist.plan;
});
exports.fetchCyclistPlan = fetchCyclistPlan;
