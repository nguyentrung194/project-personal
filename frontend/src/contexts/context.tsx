export interface UserState {
    user_id?: any;
    isLogin: boolean;
    name: string;
    email: string;
    time: any;
    login?: any;
    register?: any;
    logout?: any;
    books: any[];
    setBooks?:any;
}

export const UserReducer = (state: UserState, action: any) => {
    switch (action.type) {
        case "SET_BOOKS":
            return {
                ...state,
                books: action.payload.books,
            };
        case "LOGIN":
            return {
                ...state,
                isLogin: true,
                name: action.payload.name,
                email: action.payload.email,
                user_id: action.payload.user_id,
                time: new Date(),
            };
        case "REGISTER":
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
            };
        case "LOGOUT":
            return {
                isLogin: false,
                name: '',
                email: '',
                time: null,
                user_id: "",
                books: [],
            };
        default:
            return state;
    }
};