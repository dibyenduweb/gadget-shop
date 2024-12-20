import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const UserDropdown = () => {
 const {user,Logout} = useAuth();

const handleLogout = ()=> {
    Logout();
}

    return(
        <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button">
        <div className="avatar">
  <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
    <img src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/3541/3541871.png"} />

  </div>
</div>
        </div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li>
            <Link to='/dashboard/overview'>Dashboard</Link>
          </li>
          <li>
            <button onClick={handleLogout} className="btn btn-primary btn-sm">Logout</button>
          </li>
        </ul>
      </div>
    )}
export default UserDropdown;