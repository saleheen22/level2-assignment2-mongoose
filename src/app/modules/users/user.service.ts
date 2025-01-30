import { TUser } from "./user.interface";
import { User } from "./user.model";

export const createUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData);
  return result;
};
export const getAllUsersFromDB = async()=> {
    const result = await User.find({ isDeleted: false });
    return result;
}
export const updateOneUserFromDB = async(userId: number, userData: TUser)=> {
  const result = await User.updateOne({userId}, userData);
  return result;
}
export const deleteOneUserFromDB = async(userId: number)=> {
  const result = await User.updateOne({userId}, {isDeleted: true});
  return result;
}
