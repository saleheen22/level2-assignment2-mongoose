import { Model } from "mongoose";

export type TfullName = {
  firstName: string;
  lastName: string;
};
export type Taddress = {
  street: string;
  city: string;
  country: string;
};
export type Torders = {
  productName: string;
  price: number;
  quantity: number;
};
export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TfullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: Taddress;
  orders: Torders;
  isDeleted: boolean;
};

export interface UserModel extends Model<TUser> {}
