import { useFormik } from "formik";
import { useContext } from "react";
import { useToasts } from "react-toast-notifications";
import { UserContext } from "../../contexts/reducer";
import { useQueryURL } from "../../hooks/use-query-url";
import { Books } from "../../interfaces";
import { Book } from "../../common/book";
import { BookUpAdmin } from "./pupup";
export const Admin = () => {
  const { addToast } = useToasts();
  const { books } = useContext(UserContext);
  const query = useQueryURL();
  const id = query.get("book_id");

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: async (values) => {
      try {
        formik.setSubmitting(true);

        // code there

        addToast("Add success!", {
          appearance: "success",
          autoDismiss: true,
        });
        formik.setSubmitting(false);
      } catch (error) {
        addToast("Let try again!", {
          appearance: "error",
          autoDismiss: true,
        });
        console.log(error);
        formik.setSubmitting(false);
      }
    },
  });

  return (
    <div className="m-2">
      <BookUpAdmin id={id} />
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
              return <Book key={el.id} props={el} index={index + 1} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
