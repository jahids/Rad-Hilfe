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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payment = void 0;
const paypal_rest_sdk_1 = __importDefault(require("paypal-rest-sdk"));
paypal_rest_sdk_1.default.configure({
    mode: 'sandbox',
    client_id: 'ARJU9bN9kdvuJGc89inQmwDhWBsBnHSfrqcjgz7eabP2iwEpCyFVbgQ4cYVpWnIjLi2elAQb4LPBVmrr',
    client_secret: 'EN8Mn0y35178MBrGnBPV6MBBx7MO1RvhysBlbz5EisB1yW7EI9Bu9xva_3a4WmpV-bhL-T7XWbGs5l18',
});
const payment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { totalPrice, supportTime, orderId, note, firstCall } = req.body;
    const partsNote = note.split(' ').join('+');
    const [supportTimeStart, supportTimeEnd] = supportTime.split(' - ');
    const paymentDetails = {
        intent: 'sale',
        payer: { payment_method: 'paypal' },
        transactions: [
            {
                amount: {
                    total: totalPrice ? JSON.stringify(totalPrice) : '10.00',
                    currency: 'USD',
                },
                description: 'Purchase Description',
            },
        ],
        redirect_urls: {
            return_url: `http://localhost:5173/thankyou?orderId=${orderId}&supportTimeStart=${supportTimeStart}&supportTimeEnd=${supportTimeEnd}&note=${partsNote}&firstCall=${firstCall}`,
            cancel_url: 'http://localhost:3001/cancel',
        },
    };
    paypal_rest_sdk_1.default.payment.create(paymentDetails, (error, payment) => {
        if (error) {
            console.log(error.response.details);
            res
                .status(500)
                .json({ error: 'An error occurred while creating the payment.' });
        }
        else {
            res.json({ approval_url: payment.links[1].href });
        }
    });
});
exports.payment = payment;
