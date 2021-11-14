import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  mssv: {
    type: String,
    required: true,
  },
  books: {
    type: Array(String),
    required: false,
    default: [],
  },
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
