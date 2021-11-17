import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/reducer";
import { useQueryURL } from "../../hooks/use-query-url";
import { Books } from "../../interfaces";
import { Book } from "../../common/book";
import { BookUp } from "./pupup-register";
import axios from "axios";
import environment from "../../config";

export const Home = () => {
  const query = useQueryURL();
  const id = query.get("book_id");
  const { books, setBooks } = useContext(UserContext);
  useEffect(() => {
    const getBooks = async () => {
      await axios({
        url: `${environment.api}books`,
        method: "GET",
      }).then((res) => {
        console.log(res);
        setBooks({
          books: [...res.data.data].filter((el) => {
            return el.user_id === "";
          }),
        });
      });
    };
    getBooks();
  }, []);

  return (
    <div className="m-2">
      <BookUp id={id} />
      <h1 className="my-5 text-4xl text-center">Danh sach</h1>
      <p className="my-5 text-center">Nhan chon de dang ky</p>
      <div className="flex justify-center items-center w-full">
        <table className="border-separate border border-blue-800 w-full">
          <thead className="bg-blue-400">
            <tr>
              <th className="border border-blue-600 text-center">STT</th>
              <th className="border border-blue-600 text-center">Ten</th>
              <th className="border border-blue-600 text-center">Ma so</th>
              <th className="border border-blue-600 text-center">Hinh anh</th>
            </tr>
          </thead>
          <tbody>
            {books.map((el: Books, index: number) => {
              return <Book key={el._id} props={el} index={index + 1} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
