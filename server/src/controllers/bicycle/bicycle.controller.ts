import { Request, Response } from "express";
import { Types } from "../../models/database";
import moment from "moment";
moment().format();

import {
	createBicycle,
	findBicycleHealthById,
	getAllDamagedParts,
	getBicycleById,
	updateBicycle,
} from "../../models/bicycle/bicycle.query";
import { getSession } from "../../middlewares/sessionManagement";
import { SessionData } from "../../interfaces/session.interface";
import { addBicycle } from "../../models/cyclist/cyclist.query";

import Subparts from "../../models/bicycle/subparts.json";

const setUpBicycle = async (req: Request, res: Response) => {


	// console.log(`********************************** i am here `);

	// return res.send("nigga")
	try {
		const {
			brand,
			model,
			serialNumber,
			purchaseMonth,
			purchaseYear,
			isRevised,
			revisionMonth,
			revisionYear,
			dailyCommute,
			recreationalCommute,
		} = req.body;

		const newBicycle = {
			brand,
			model,
			serialNumber,
			purchaseMonth,
			purchaseYear,
			isRevised,
			revisionMonth,
			revisionYear,
			dailyCommute,
			recreationalCommute,
			totalHealth: 100,
		};

		let lastRevisionMonth: number = purchaseMonth;
		let lastRevisionYear: number = purchaseYear;

		if (isRevised) {
			revisionMonth && (lastRevisionMonth = revisionMonth);
			revisionYear && (lastRevisionYear = revisionYear);
		}

		const lastRevisionDate = moment([
			lastRevisionYear,
			lastRevisionMonth - 1,
		]);

		const createdBicycle = await createBicycle(
			newBicycle,
			lastRevisionDate
		);

		const token = req.cookies.accessToken;
		// console.log("fr token", token);

		const session: SessionData | undefined = getSession(token);

		

		if (session && createdBicycle) {
			const bicycleId = new Types.ObjectId(createdBicycle!._id);
			await addBicycle(session.userEmail, bicycleId);
			res.status(201).send(createdBicycle);
			return;
		}

		res.status(401).send("Session Unavailable!+");
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error!");
	}
};

const getBicycle = async (req: Request, res: Response) => {
	try {
		const bicycleId = req.params.id;
		const bicycle = await getBicycleById(new Types.ObjectId(bicycleId));
		if (!bicycle) {
			return res.status(401).send("Failed to find bicycle!");
		}

		res.status(200).send(bicycle);
	} catch (error) {
		res.status(500).send(error);
	}
};

const getBicycleHealth = async (req: Request, res: Response) => {
	try {
		const bicycleId: string = req.params.id;
		const bicycle = await findBicycleHealthById(
			new Types.ObjectId(bicycleId)
		);
		if (!bicycle) {
			res.status(401).send("Failed to find bicycle!");
			return;
		}

		res.status(200).send(bicycle);
	} catch (error) {
		console.error(error);
		res.status(500).send("Server Error!");
	}
};

const setUpBicycleEdit = async (req: Request, res: Response) => {
	try {
		const bicycleId = req.params.id;
		if (!bicycleId) res.status(401).send("Failed to find bicycle!");
		const {
			brand,
			model,
			serialNumber,
			purchaseMonth,
			purchaseYear,
			isRevised,
			revisionMonth,
			revisionYear,
			dailyCommute,
			recreationalCommute,
		} = req.body;

		const newBicycle = {
			brand,
			model,
			serialNumber,
			purchaseMonth,
			purchaseYear,
			isRevised,
			revisionMonth,
			revisionYear,
			dailyCommute,
			recreationalCommute,
		};

		let lastRevisionMonth: number = purchaseMonth;
		let lastRevisionYear: number = purchaseYear;

		if (isRevised) {
			revisionMonth && (lastRevisionMonth = revisionMonth);
			revisionYear && (lastRevisionYear = revisionYear);
		}

		const lastRevisionDate = moment([
			lastRevisionYear,
			lastRevisionMonth - 1,
		]);

		const updatedBicycle = await updateBicycle(
			new Types.ObjectId(bicycleId),
			newBicycle,
			lastRevisionDate
		);

		const token = req.cookies.accessToken;
		const session: SessionData | undefined = getSession(token);
		if (session) {
			res.status(201).send(updatedBicycle);
			return;
		}

		res.status(401).send("Session Unavailable!");
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error!");
	}
};

const bicycleDamagedPart = async (req: Request, res: Response) => {
	try {
		let bicycleId = req.params.id;
		console.log(bicycleId);
		if (!bicycleId) {
			res.status(401).send("Failed to find bicycle!");
			return;
		}

		const damagedParts = await getAllDamagedParts(
			new Types.ObjectId(bicycleId)
		);

		if (damagedParts) {
			const updatedDamagePartsInfo = damagedParts.map((part) => {
				const info = Subparts.filter(
					(subpart) => subpart._id === String(part.subpart)
				);

				const newInfo = {
					_id: part.subpart,
					name: info[0].name,
					price: info[0].price,
					category: info[0].category,
					plan: info[0].plan,
					health: part.health,
					lastMaintained: part.lastMaintained,
				};

				return newInfo;
			});

			const newDamagedParts = updatedDamagePartsInfo.filter(
				(part) => part.health < 30
			);

			res.status(200).send(newDamagedParts);
			return;
		}
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error!");
	}
};

export {
	setUpBicycle,
	getBicycle,
	getBicycleHealth,
	setUpBicycleEdit,
	bicycleDamagedPart,
};
