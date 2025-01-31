import { Torders, TUser } from "./user.interface";
import { User } from "./user.model";

export const createUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData);
  return result;
};
export const getAllUsersFromDB = async () => {
  const result = await User.find({ isDeleted: false });
  return result;
};
export const getOneUserFromDB = async (userId: number) => {
  const result = await User.findOne({ userId }, { isDeleted: false });
  return result;
};
export const updateOneUserFromDB = async (userId: number, userData: TUser) => {
  const result = await User.updateOne({ userId }, userData);
  return result;
};
export const deleteOneUserFromDB = async (userId: number) => {
  const result = await User.updateOne({ userId }, { isDeleted: true });
  return result;
};
export const updateOneOrderFromDB = async (
  userId: number,
  orderData: Torders,
) => {
  const user = await User.findOne({ userId });
  if (!user) {
    throw new Error(`User with userId ${userId} not found.`);
  }
  if (!Array.isArray(user.orders)) {
    user.orders = [];
  }
  user.orders.push(orderData);
  await user.save();

  return user;
};
export const getOneOrderFromDB = async (userId: number) => {
  const user = await User.findOne({ userId }).select("orders");
  if (!user) {
    throw new Error(`User with userId ${userId} not found.`);
  }
  return user.orders;
};
export const getOneTotalPriceFromDB = async (userId: number) => {
  const user = await User.findOne({ userId }).select("orders");
  if (!user) {
    throw new Error(`User with userId ${userId} not found.`);
  }

  if (!user.orders || !Array.isArray(user.orders) || user.orders.length === 0) {
    throw new Error("User orders are not found.");
  }

  const totalPrice = user.orders.reduce(
    (total, order) => total + (order.price || 0) * (order.quantity || 0),
    0,
  );
  return parseFloat(totalPrice.toFixed(2));
};
