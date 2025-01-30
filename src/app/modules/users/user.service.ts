import { TUser } from "./user.interface";
import { User } from "./user.model";

export const createUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData);
  return result;
};
export const getAllUsersFromDB = async()=> {
    const result = await User.find();
    return result;
}
