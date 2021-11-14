export interface Books {
    id: any,
    name: string,
    maso: string,
    image: any,
}

export interface UserState {
    user_id?: any;
    books: any[];
    isLogin: boolean;
    name: string;
    mssv: string;
    email: string;
    login?: any;
    register?: any;
    logout?: any;
    setBooks?:any;
}