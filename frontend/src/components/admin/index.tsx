import { useContext } from "react";
import { UserContext } from "../../contexts/reducer";
import { useQueryURL } from "../../hooks/use-query-url";
import { Books } from "../../interfaces";
import { Book } from "../../common/book";
import { BookUpAdmin } from "./pupup";
import { CreateBook } from "./create";
import { useLocation, useNavigate } from "react-router-dom";
export const Admin = () => {
  const { books } = useContext(UserContext);
  const query = useQueryURL();
  const add = query.get("add");
  const history = useNavigate();
  const location = useLocation();

  return (
    <div className="m-2">
      {add ? <CreateBook /> : <BookUpAdmin />}
      <h1 className="my-5 text-4xl text-center">Danh sach</h1>
      <p className="my-5 text-center">Nhan chon de dang ky</p>
      <button
        onClick={() => {
          query.delete("book_id");
          query.set("add", "true");
          history(`${location.pathname}?${query}`);
        }}
        type="button"
        className="my-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
      >
        Tao moi
      </button>
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
