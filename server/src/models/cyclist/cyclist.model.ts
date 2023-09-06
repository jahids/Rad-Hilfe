import { Cyclist } from '../../interfaces/cyclist.interface';
import { Schema, Types, model } from '../database';

const cyclistSchema = new Schema({
<<<<<<< HEAD
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: false },
	role: { type: String, required: true },
	homeAddress: { type: String, required: false },
	workAddress: { type: String, required: false },
	phone: { type: String, required: false },
	bicycle: { type: Types.ObjectId, ref: 'BicycleModel' },
	plan: { type: String, enum: ['Basic', 'Qover', 'Slipstream'], required: true },
	orders: [{ type: Types.ObjectId, ref: 'OrderModel' }],
	cases: [{ type: Types.ObjectId, ref: 'CaseModel' }],
	imageUrl: { type: String },
=======
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
  },
  role: { type: String, required: true },
  homeAddress: { type: String, required: false },
  workAddress: { type: String, required: false },
  phone: { type: String, required: false },
  bicycle: { type: Types.ObjectId, ref: 'BicycleModel' },
  plan: { type: String, enum: ['Basic', 'Qover', 'Slipstream'], required: true },
  orders: [{ type: Types.ObjectId, ref: 'OrderModel' }],
  cases: [{ type: Types.ObjectId, ref: 'CaseModel' }],
  imageUrl: { type: String },
>>>>>>> f4150f53833e8aaea96d37085ee87cd905097831
});

const CyclistModel = model<Cyclist>('Cyclist', cyclistSchema);

export { CyclistModel };
