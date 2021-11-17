export interface Books {
  _id: any;
  name: string;
  maso: string;
  image: any;
  available?: boolean;
  user_id?: string;
}

export interface UserState {
  user_id?: any;
  books: any[];
  book: Books;
  isLogin: boolean;
  name: string;
  mssv: string;
  email: string;
  login?: any;
  register?: any;
  logout?: any;
  setBooks?: any;
  setBook?: any;
}
