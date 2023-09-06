"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cyclistRouter = void 0;
const express_1 = require("express");
const authenticator_1 = require("../../middlewares/authenticator");
const authorizer_1 = require("../../middlewares/authorizer");
const cyclistController = __importStar(require("../../controllers/cyclist/cyclist.controller"));
const bicycleController = __importStar(require("../../controllers/bicycle/bicycle.controller"));
const subpartController = __importStar(require("../../controllers/subpart/subpart.controller"));
const caseController = __importStar(require("../../controllers/case/case.controller"));
const orderController = __importStar(require("../../controllers/order/order.controller"));
const technicianController = __importStar(require("../../controllers/technician/technician.controller"));
const cyclistRouter = (0, express_1.Router)();
exports.cyclistRouter = cyclistRouter;
// public
cyclistRouter.post('/sign-up', cyclistController.signUp);
cyclistRouter.post('/sign-in', cyclistController.signIn);
cyclistRouter.get('/sign-out', cyclistController.signOut);
cyclistRouter.post('/forgot-password', cyclistController.forgotPassword);
cyclistRouter.post('/reset-password', cyclistController.resetPassword);
// private router
cyclistRouter.use(authenticator_1.authenticator, authorizer_1.cyclistAuthorizer);
// cyclist
cyclistRouter.get('/profile', cyclistController.profile);
cyclistRouter.post('/set-up-address', cyclistController.setUpAddress);
cyclistRouter.post('/weather-data', cyclistController.weatherData);
cyclistRouter.get('/cyclist-name', cyclistController.cyclistName);
cyclistRouter.put('/select-plan', cyclistController.selectPlan);
// bicycle
cyclistRouter.post('/set-up-bicycle', bicycleController.setUpBicycle);
cyclistRouter.put('/set-up-bicycle-edit/:id', bicycleController.setUpBicycleEdit);
cyclistRouter.get('/bicycle-health/:id', bicycleController.getBicycleHealth);
cyclistRouter.get('/bicycle/:id', bicycleController.getBicycle);
cyclistRouter.get('/bicycle-damaged-part/:id', bicycleController.bicycleDamagedPart);
// order
cyclistRouter.get('/get-plan', orderController.getPlan);
cyclistRouter.post('/create-order', orderController.setUpOrder);
// case
cyclistRouter.post('/create-case', caseController.createPassiveCase);
cyclistRouter.post('/create-chat-case', caseController.createActiveCase);
cyclistRouter.get('/get-all-cases', caseController.getAllCases);
cyclistRouter.get('/get-case-by-id/:id', caseController.getCaseById);
cyclistRouter.get('/case-number', caseController.getCaseNumber);
// subpart
cyclistRouter.post('/add-subparts', subpartController.addSubparts);
cyclistRouter.get('/all-subpart', subpartController.allSubpart);
// cyclistRouter.post('/subpartFix', subpartController.subpartFix);
// technician
cyclistRouter.post('/subpart-expert', technicianController.findSubpartExpart);
cyclistRouter.post('/available-support-time', technicianController.availableSupportTime);
