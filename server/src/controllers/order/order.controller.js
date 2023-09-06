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
exports.getPlan = exports.setUpOrder = void 0;
const sessionManagement_1 = require("../../middlewares/sessionManagement");
const order_query_1 = require("../../models/order/order.query");
const setUpOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bicycleParts, deliveryAddress, contactNumber, note, slot, totalPrice } = req.body;
        const newOrder = {
            bicycleParts,
            deliveryAddress,
            contactNumber,
            note,
            slot,
            totalPrice,
        };
        const createdOrder = yield (0, order_query_1.createOrder)(newOrder);
        const token = req.cookies.accessToken;
        const session = (0, sessionManagement_1.getSession)(token);
        if (session) {
            const orderId = createdOrder._id;
            yield (0, order_query_1.addOrder)(session.userEmail, orderId);
            res.status(201).send(createdOrder);
        }
    }
    catch (error) {
        console.error('Creating order failed!');
        res.status(500).send('Server Error!');
    }
});
exports.setUpOrder = setUpOrder;
const getPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.accessToken;
        const session = (0, sessionManagement_1.getSession)(token);
        if (session) {
            const plan = yield (0, order_query_1.fetchCyclistPlan)(session.userEmail);
            if (!plan) {
                res.status(401).send('Not able to find plan!');
                return;
            }
            res.status(200).send(plan);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Server Error!');
    }
});
exports.getPlan = getPlan;
