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
exports.availableSupportTime = exports.findSubpartExpart = exports.editProfile = exports.setUpTechnician = exports.signOut = exports.profile = exports.resetPassword = exports.forgotPassword = exports.signIn = exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const sessionManagement_1 = require("../../middlewares/sessionManagement");
const mailer_controller_1 = require("./mailer.controller");
const technician_query_1 = require("../../models/technician/technician.query");
const cyclist_query_1 = require("../../models/cyclist/cyclist.query");
const technician_model_1 = require("../../models/technician/technician.model");
let storedOTP = null;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role = 'technician' } = req.body;
        if (yield (0, technician_query_1.findTechnicianByEmail)(email)) {
            return res.status(401).send('Email already exists!');
        }
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        const newTechnician = yield (0, technician_query_1.createTechnician)({
            name,
            email,
            password: hashedPassword,
            role,
        });
        res.status(200).send(newTechnician);
    }
    catch (error) {
        res.status(500).send('Server Error!');
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const technician = yield (0, technician_query_1.findTechnicianByEmail)(email);
        if (!technician) {
            res.status(400).send('There is no Technician with that email!');
            return;
        }
        const isCredentialsOk = yield bcrypt_1.default.compare(password, technician.password);
        if (!isCredentialsOk) {
            res.status(401).send('Invalid password!');
            return;
        }
        const token = (0, sessionManagement_1.createSession)(email);
        res.cookie('accessToken', token, {
            httpOnly: false,
            secure: false,
            sameSite: 'strict',
        });
        res.status(200).send({ accessToken: token });
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Server Error!');
    }
});
exports.signIn = signIn;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const technician = yield (0, technician_query_1.findTechnicianByEmail)(email);
        if (!technician) {
            res.status(400).send('There is no Technician with that email!');
            return;
        }
        const otp = Math.floor(Math.random() * 10000).toString();
        storedOTP = { email, otp };
        const { name } = technician;
        yield (0, mailer_controller_1.sendOTP)(name, email, otp);
        res.status(200).send('OTP has been sent to your email!');
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Server Error!');
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, newPassword, otp } = req.body;
        if (!storedOTP || storedOTP.email !== email || storedOTP.otp !== otp) {
            res.status(400).send('Invalid OTP or email!');
            return;
        }
        const technician = yield (0, technician_query_1.findTechnicianByEmail)(email);
        if (!technician) {
            res.status(400).send('There is no Technician with that email!');
            return;
        }
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(newPassword, saltRounds);
        yield (0, technician_query_1.updateTechnicianPassword)(email, hashedPassword);
        storedOTP = null;
        res.status(200).send('Password has been reset successfully!');
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Server Error!');
    }
});
exports.resetPassword = resetPassword;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.accessToken;
        const session = (0, sessionManagement_1.getSession)(token);
        if (session) {
            const technician = yield (0, technician_query_1.findTechnicianByEmail)(session.userEmail);
            res.status(200).send(technician);
            return;
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Server Error!');
    }
});
exports.profile = profile;
const signOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.accessToken;
        if (!(0, sessionManagement_1.destroySession)(token)) {
            res.status(400).send('No session to logout.');
            return;
        }
        res.status(200).send('successfully logged out!');
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Server Error!');
    }
});
exports.signOut = signOut;
const setUpTechnician = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { imageUrl, address, phone, brandsExpertise, subpartExpertise, workingDays, workingSlots, } = req.body;
        const setTechnician = {
            imageUrl,
            address,
            phone,
            brandsExpertise,
            subpartExpertise,
            workingDays,
            workingSlots,
        };
        const token = req.cookies.accessToken;
        const session = (0, sessionManagement_1.getSession)(token);
        if (session) {
            const newTechnician = yield (0, technician_query_1.addTechnicianDetails)(session.userEmail, setTechnician);
            if (!newTechnician)
                res.status(401).send('Setting up technician failed!');
            res.status(201).send(newTechnician);
            return;
        }
        res.status(401).send('Technician not Found!');
    }
    catch (error) {
        console.error('Could not set up technician!');
        res.status(500).send('Server Error !');
    }
});
exports.setUpTechnician = setUpTechnician;
const editProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { imageUrl, address, phone, brandsExpertise, subpartExpertise, workingDays, workingSlots, } = req.body;
        const technician = {
            imageUrl,
            address,
            phone,
            brandsExpertise,
            subpartExpertise,
            workingDays,
            workingSlots,
        };
        const token = req.cookies.accessToken;
        const session = (0, sessionManagement_1.getSession)(token);
        if (session) {
            const updatedTechnician = yield (0, technician_query_1.addTechnicianDetails)(session.userEmail, technician);
            if (!updatedTechnician) {
                res.status(401).send('Setting up technician failed!');
                return;
            }
            res.status(201).send(updatedTechnician);
            return;
        }
    }
    catch (error) {
        console.error('Failed to edit technician!');
        res.status(500).send('Server Error !');
    }
});
exports.editProfile = editProfile;
const findSubpartExpart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subparts } = req.body;
        const technicians = yield (0, technician_query_1.findSubpartTechnician)(subparts);
        if (technicians) {
            res.status(200).send(technicians);
            return;
        }
    }
    catch (error) {
        console.error('Failed to get subpart technician!');
        res.status(500).send('Server Error !');
    }
});
exports.findSubpartExpart = findSubpartExpart;
const availableSupportTime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subparts } = req.body;
        const token = req.cookies.accessToken;
        const session = (0, sessionManagement_1.getSession)(token);
        if (session) {
            const cyclist = yield (0, cyclist_query_1.findCyclistByEmail)(session.userEmail);
            if (!cyclist) {
                return res.status(404).send('Cyclist not found.');
            }
            const technician = yield (0, technician_query_1.findSubpartTechnician)(subparts);
            if ((technician === null || technician === void 0 ? void 0 : technician._id) && technician) {
                const slots = yield (0, technician_query_1.findAvailableSupportTimeForCyclist)(String(technician._id));
                res.status(200).send({ technician: technician, slots });
                return;
            }
            else {
                const technician = yield technician_model_1.TechnicianModel.find({});
                if (technician[0]) {
                    const slots = yield (0, technician_query_1.findAvailableSupportTimeForCyclist)(String(technician[0]._id));
                    res.status(200).send({ technician: technician[0], slots });
                    return;
                }
                else {
                    res.status(200).send('No technician found');
                    return;
                }
            }
        }
        return res.status(401).send('Unauthorized');
    }
    catch (error) {
        console.error('Server Error!', error);
        res.status(501).send('Server Error!');
    }
});
exports.availableSupportTime = availableSupportTime;
