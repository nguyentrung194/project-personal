import { useFormik } from "formik";
import React from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useQueryURL } from "../../hooks/use-query-url";
export const Search = () => {
    const location = useLocation();
    const history = useNavigate();
    const query = useQueryURL();

    const [search, setSearch] = React.useState(query.get("search") || "");
    // const { setBooks } = useContext(UserContext);

    const { addToast } = useToasts();
    const formik = useFormik({
        initialValues: {
            name: "",
        },
        onSubmit: async (values) => {
            try {
                formik.setSubmitting(true);
                // await axios({
                //     url: environment.api + 'books',
                //     method: 'GET',
                //     headers: {
                //         'Content-type': 'application/json'
                //     },
                //     data: {
                //         ...values
                //     }
                // }).then((res) => {
                //     setBooks({ ...res.data.data })
                // })
                // code there
                formik.setSubmitting(false);
            } catch (error) {
                addToast("Let try again!", {
                    appearance: 'error',
                    autoDismiss: true,
                });
                console.log(error);
                formik.setSubmitting(false);
            }
        },
    });

    return (
        <form
            onSubmit={(e: any) => {
                e.preventDefault();
                query.delete("page");
                query.set("search", search);
                history(`/admin/?${query}`);
            }}
            className="w-full max-w-sm bg-blue-100">
            <div className="flex items-center">
                <input
                    name="search"
                    type="text"
                    value={search}
                    onChange={(e: any) => {
                        setSearch(e.target.value);
                        if (!e.target.value) {
                            query.delete("search");
                            history(`${location.pathname}?${query}`);
                        }
                    }}
                    className="appearance-none bg-transparent border-none w-full px-2 leading-tight focus:outline-none"
                    placeholder="Search..." />
                <button className="flex-shrink-0 px-2"
                    type="button">
                    Search Icon
                </button>
            </div>
        </form>
    )
}