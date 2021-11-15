import { useLocation, useNavigate } from "react-router-dom";
import { useQueryURL } from "../hooks/use-query-url";
import { Books } from "../interfaces";

export const Book = ({ props, index }: { props: Books; index: number }) => {
  const location = useLocation();
  const history = useNavigate();
  const query = useQueryURL();
  return (
    <tr
      onClick={() => {
        query.set("book_id", props.maso);
        history(`${location.pathname}?${query}`);
      }}
      className="cursor-pointer"
    >
      <td className="border border-blue-600 text-center">{index}</td>
      <td className="border border-blue-600 text-center">{props.name}</td>
      <td className="border border-blue-600 text-center">{props.maso}</td>
      <td className="border border-blue-600 text-center">
        <div className="w-full min-h-80 lg:h-80 flex justify-center items-center">
          <img
            src={props.image}
            alt="Front of men&#039;s Basic Tee in black."
            className="w-full h-full object-center object-contain"
          />
        </div>
      </td>
    </tr>
  );
};
