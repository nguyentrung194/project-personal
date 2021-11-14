import { useContext } from "react";
import { UserContext } from "../../contexts/reducer";
import { useQueryURL } from "../../hooks/use-query-url";
import { Books } from "../../interfaces";
import { Book } from "../../common/book";
import { BookUp } from "./pupup-register";

export const Home = () => {
    const query = useQueryURL();
    const id = query.get("book_id");
    const { books } = useContext(UserContext);

    return (
        <div className="m-2">
            <BookUp id={id} />
            <h1 className="my-5 text-4xl text-center">Danh sach</h1>
            <p className="my-5 text-center">Nhan chon de dang ky</p>
            <div className="flex justify-center items-center w-full">
                <table className="border-separate border border-blue-800 w-full">
                    <thead className="bg-blue-400">
                        <tr>
                            <th className="border border-blue-600 text-center">ID</th>
                            <th className="border border-blue-600 text-center">Ten</th>
                            <th className="border border-blue-600 text-center">Ma so</th>
                            <th className="border border-blue-600 text-center">Hinh anh</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((el: Books) => {
                            return <Book key={el.id} props={el} />
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}