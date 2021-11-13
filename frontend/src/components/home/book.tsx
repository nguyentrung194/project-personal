import { imgSrc } from "../../common/img";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryURL } from "../../hooks/use-query-url";

export const Book = ({ id }: { id: any }) => {
    const location = useLocation();
    const history = useNavigate();
    const query = useQueryURL();
    return (
        <tr onClick={() => {
            query.delete("page");
            query.set("id", id);
            history(`${location.pathname}?${query}`);
        }}>
            <td className="border border-blue-600 text-center">1</td>
            <td className="border border-blue-600 text-center">Phap luat dai cuong</td>
            <td className="border border-blue-600 text-center">PLDC_01</td>
            <td className="border border-blue-600 text-center">
                <div className="w-full min-h-80 lg:h-80 flex justify-center items-center">
                    <img src={imgSrc}
                        alt="Front of men&#039;s Basic Tee in black."
                        className="w-full h-full object-center object-contain" />
                </div>
            </td>
        </tr>
    )
}