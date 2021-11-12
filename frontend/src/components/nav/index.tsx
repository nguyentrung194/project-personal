import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../contexts/reducer"

export const Nav = () => {
    const {isLogin, logout} = useContext(UserContext)
    return (
        <div className="bg-blue-200 flex justify-between items-center p-4">
            <div className="px-4">
                <Link to="/" >Logo</Link>
            </div>
            {!isLogin?<div className="flex justify-around items-center">
                <div className="px-4">
                    <Link to="register" >Đăng ký</Link>
                </div>
                <div className="px-4">
                    <Link to="login" >Đăng nhập</Link>
                </div>
            </div>:<div className="flex justify-around items-center">
                <div className="px-4">
                    <Link to="logout" onClick={()=>{logout()}} >Đăng xuất</Link>
                </div>
            </div>}
        </div>
    )
}