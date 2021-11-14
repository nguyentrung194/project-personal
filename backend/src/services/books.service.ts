import bcrypt from 'bcrypt';
import { CreateBookDto } from '@dtos/books.dto';
import { HttpException } from '@exceptions/HttpException';
import { Book } from '@interfaces/books.interface';
import bookModel from '@models/books.model';
import { isEmpty } from '@utils/util';

class BookService {
  public books = bookModel;

  public async findAllBook(): Promise<Book[]> {
    const books: Book[] = await this.books.find();
    return books;
  }

  public async findBookById(bookId: string): Promise<Book> {
    if (isEmpty(bookId)) throw new HttpException(400, "It's not bookId");

    const findBook: Book = await this.books.findOne({ _id: bookId });
    if (!findBook) throw new HttpException(409, "It's not Book");

    return findBook;
  }

  public async createBook(bookData: CreateBookDto): Promise<Book> {
    if (isEmpty(bookData)) throw new HttpException(400, "It's not bookData");

    const findBook: Book = await this.books.findOne({ maso: bookData.maso });
    if (findBook) throw new HttpException(409, `It's maso ${bookData.maso} already exists`);

    const createBookData: Book = await this.books.create({ ...bookData });

    return createBookData;
  }

  public async updateBook(bookId: string, bookData: CreateBookDto): Promise<Book> {
    if (isEmpty(bookData)) throw new HttpException(400, "It's not bookData");

    if (bookData.maso) {
      const findBook: Book = await this.books.findOne({ maso: bookData.maso });
      if (findBook && findBook._id != bookId) throw new HttpException(409, `It's maso ${bookData.maso} already exists`);
    }

    const updateBookById: Book = await this.books.findByIdAndUpdate(bookId, { bookData });
    if (!updateBookById) throw new HttpException(409, "It's not Book");

    return updateBookById;
  }

  public async deleteBook(bookId: string): Promise<Book> {
    const deleteBookById: Book = await this.books.findByIdAndDelete(bookId);
    if (!deleteBookById) throw new HttpException(409, "It's not Book");

    return deleteBookById;
  }
}

export default BookService;
