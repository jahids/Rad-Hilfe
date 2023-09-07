"use strict";
// import { Request, Response } from 'express';
// import bcrypt from 'bcrypt';
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
exports.selectPlan = exports.cyclistName = exports.weatherData = exports.setUpAddressEdit = exports.setUpAddress = exports.signOut = exports.profile = exports.resetPassword = exports.forgotPassword = exports.signIn = exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const sessionManagement_1 = require("../../middlewares/sessionManagement");
const mailer_controller_1 = require("./mailer.controller");
const cyclist_query_1 = require("../../models/cyclist/cyclist.query");
const weather_apis_1 = require("../../apis/weather.apis");
let storedOTP = null;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, phone, role = "cyclist", plan = "Basic", homeAddress = "", workAddress = "", } = req.body;
        if (yield (0, cyclist_query_1.findCyclistByEmail)(email)) {
            return res.status(401).send("Email already exists!");
        }
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        const newCyclist = yield (0, cyclist_query_1.createCyclist)({
            name,
            email,
            password: hashedPassword,
            phone,
            role,
            plan,
            homeAddress,
            workAddress,
        });
        res.status(200).send(newCyclist);
    }
    catch (error) {
        res.status(500).send("Server Error!");
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const cyclist = yield (0, cyclist_query_1.findCyclistByEmail)(email);
        if (!cyclist) {
            res.status(400).send("There is no user with that email!");
            return;
        }
        const isCredentialsOk = yield bcrypt_1.default.compare(password, cyclist.password);
        if (!isCredentialsOk) {
            res.status(401).send("Invalid password!");
            return;
        }
        const token = (0, sessionManagement_1.createSession)(email);
        const THIRTY_DAYS = 30 * 24 * 3600000;
        res.cookie("accessToken", token, {
            // httpOnly: false,
            // secure: false,
            // sameSite: "strict",
            httpOnly: true,
            maxAge: THIRTY_DAYS
        });
        res.status(200).send({ accessToken: token });
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error!");
    }
});
exports.signIn = signIn;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const cyclist = yield (0, cyclist_query_1.findCyclistByEmail)(email);
        if (!cyclist) {
            res.status(400).send("There is no user with that email!");
            return;
        }
        const otp = Math.floor(Math.random() * 10000).toString();
        storedOTP = { email, otp };
        const { name } = cyclist;
        yield (0, mailer_controller_1.sendOTP)(name, email, otp);
        res.status(200).send("OTP has been sent to your email!");
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error!");
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, newPassword, otp } = req.body;
        if (!storedOTP || storedOTP.email !== email || storedOTP.otp !== otp) {
            res.status(400).send("Invalid OTP or email!");
            return;
        }
        const cyclist = yield (0, cyclist_query_1.findCyclistByEmail)(email);
        if (!cyclist) {
            res.status(400).send("There is no user with that email!");
            return;
        }
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(newPassword, saltRounds);
        if (yield (0, cyclist_query_1.updateCyclistPassword)(email, hashedPassword)) {
            storedOTP = null;
            res.status(200).send("Password has been reset successfully!");
            return;
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error!");
    }
});
exports.resetPassword = resetPassword;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.accessToken;
        const session = (0, sessionManagement_1.getSession)(token);
        if (session) {
            const cyclist = yield (0, cyclist_query_1.findCyclistByEmail)(session.userEmail);
            res.status(200).send(cyclist);
            return;
        }
        res.status(401).send("Session is invalid.");
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error!");
    }
});
exports.profile = profile;
const signOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.accessToken;
        if (!(0, sessionManagement_1.destroySession)(token)) {
            res.status(400).send("No session to logout.");
            return;
        }
        res.status(200).send("successfully logged out!");
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error!");
    }
});
exports.signOut = signOut;
const setUpAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { homeAddress, workAddress } = req.body;
        const token = req.cookies.accessToken;
        const session = (0, sessionManagement_1.getSession)(token);
        if (session) {
            yield (0, cyclist_query_1.addCyclistAddress)(session.userEmail, homeAddress, workAddress);
            res.status(200).send("Home address and work address added");
            return;
        }
        res.status(401).send("Session is invalid.");
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error!");
    }
});
exports.setUpAddress = setUpAddress;
const setUpAddressEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { homeAddress, workAddress } = req.body;
        const token = req.cookies.accessToken;
        const session = (0, sessionManagement_1.getSession)(token);
        if (session) {
            if (yield (0, cyclist_query_1.addCyclistAddress)(session.userEmail, homeAddress, workAddress)) {
                res.status(200).send({ homeAddress, workAddress });
                return;
            }
        }
        res.status(401).send("Session is invalid.");
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error!");
    }
});
exports.setUpAddressEdit = setUpAddressEdit;
const weatherData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { longitude, latitude } = req.body;
        const weatherData = yield (0, weather_apis_1.getWeatherData)(Number(longitude), Number(latitude));
        res.status(200).send(weatherData);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error!");
    }
});
exports.weatherData = weatherData;
const cyclistName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.accessToken;
        const session = (0, sessionManagement_1.getSession)(token);
        if (session) {
            const cyclist = yield (0, cyclist_query_1.findCyclistByEmail)(session.userEmail);
            cyclist && res.status(200).send({ name: cyclist.name });
            return;
        }
        res.status(401).send("Session is invalid.");
    }
    catch (error) {
        console.log(error);
    }
});
exports.cyclistName = cyclistName;
const selectPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const { plan } = req.body;
        const token = req.cookies.accessToken;
        const session = (0, sessionManagement_1.getSession)(token);
        if (session && (yield (0, cyclist_query_1.addCyclistPlan)(session.userEmail, plan))) {
            res.status(200).send({ plan });
            return;
        }
        res.status(401).send("Session is invalid.");
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error!");
    }
});
exports.selectPlan = selectPlan;
