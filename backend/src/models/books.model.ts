import { model, Schema, Document } from 'mongoose';
import { Book } from '@interfaces/books.interface';

const bookSchema: Schema = new Schema({
  maso: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: false,
    default: '',
  },
  available: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const bookModel = model<Book & Document>('Book', bookSchema);

export default bookModel;
