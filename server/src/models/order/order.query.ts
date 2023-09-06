import { Order } from '../../interfaces/order.interface';
import { findCyclistByEmail } from '../cyclist/cyclist.query';
import { Types } from '../database';
import { OrderModel } from './order.model';

const createOrder = async (order: Order) => {
  try {
    return await OrderModel.create(order);
  } catch (error) {
    console.log(error);
  }
};

const addOrder = async (email: string, orderId: Types.ObjectId) => {
  try {
    const cyclist = await findCyclistByEmail(email);
    cyclist?.orders?.push(orderId);
    await cyclist?.save();
  } catch (error) {
    console.log(error);
  }
};

const findOrderById = async (orderId: Types.ObjectId) => {
  try {
    return await OrderModel.findOne({ _id: orderId });
  } catch (error) {
    console.log(error);
  }
};

const fetchCyclistPlan = async (email: string) => {
  const cyclist = await findCyclistByEmail(email);
  return cyclist?.plan;
};

export { addOrder, createOrder, findOrderById, fetchCyclistPlan };
