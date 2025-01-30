import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt';
import {
  Taddress,
  TfullName,
  Torders,
  TUser,
  UserModel,
} from "./user.interface";
import config from "../../config";

const fullNameSchema = new Schema<TfullName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, "This first Name is required"],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: "${VALUE} is not in uppercase format",
    },
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "The last name is required"],
  },
});
const addressSchema = new Schema<Taddress>({
  street: {
    type: String,
    required: true,
  },
  city: { type: String, required: [true, "City is required"] },
  country: { type: String, required: true },
});
const ordersSchema = new Schema<Torders>({
  productName: {
    type: String,
  },
  price: { type: Number },
  quantity: { type: Number },
});
const userSchema = new Schema<TUser, UserModel>(
  {
    userId: {
      type: Number,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: fullNameSchema,
      required: true,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    hobbies: {
      type: [String],
      required: true,
      validate: {
        validator: function (arr: string[]) {
          return arr.length > 0;
        },
        message: "You alteast need one hobby ",
      },
    },
    address: {
      type: addressSchema,
      required: true,
    },
    orders: {
      type: ordersSchema,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  {
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.password; // Remove password field
        return ret;
      }
    },
  },
);


// middleware
userSchema.pre('save', async function(next){
    const user = this;
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
    next();
})
userSchema.post('save', function(doc, next){
    doc.password = '';
    next();
})
export const User = model<TUser, UserModel>("User", userSchema);
