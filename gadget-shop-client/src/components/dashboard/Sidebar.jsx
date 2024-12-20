import { NavLink } from "react-router-dom";
import { GrOverview } from "react-icons/gr";
import { IoHomeOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import useUserData from "../../hooks/useUserData";
import { MdOutlineInventory2 } from "react-icons/md";
import { MdAddBusiness } from "react-icons/md";
import useAuth from "../../hooks/useAuth";


const sellerRoutes = [
  { 
    id: 1, 
    route: "/dashboard/products",
    title:"My Products",
    icon: <MdOutlineInventory2 /> 
  }, 
  { 
    id: 1, 
    route: "/dashboard/add-products", 
    title:"Add Products",
    icon: <MdAddBusiness /> 
  },
];

const Sidebar = () => {
  const userData = useUserData();

  const {Logout} = useAuth()

  return (
    <div className="bg-gray-200 border-r border-black min-h-screen px-8 py-16">
      <h2 className="text-3xl font-bold mb-8">Gadget shop</h2>
      <ul className="flex flex-col gap-2 ">
        <li className="p-2 border border-black rounded-md">
          <NavLink to="/dashboard/overview" className="flex gap-2 items-center">
            <GrOverview />
            <p>Overview</p>
          </NavLink>
        </li>
    {
      userData.role === "seller" &&  sellerRoutes.map((route)=>(
        <li key={route.id} className="p-2 border border-black rounded-md">
        <NavLink to={route.route} className="flex gap-2 items-center">
         <>{route.icon}
         </>
          <p>{route.title}</p>
        </NavLink>
      </li>
      ))
    }

<li className="p-2 border border-black rounded-md">
          <NavLink to="/" className="flex gap-2 items-center">
          <IoHomeOutline />
            <p>Home</p>
          </NavLink>
        </li>
     

        <li onClick={()=>Logout()} className="p-2 border border-black rounded-md">
          <NavLink to="/dashboard/overview" className="flex gap-2 items-center">
            <LuLogOut />
            <p>Logout</p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
