import useAuth from "../../hooks/useAuth";


const Overview = () => {
    const {user} =useAuth()
    return(
        <div className="flex items-center justify-center w-full">
             <h3 className="text-4xl font-bold text-center">{user.email}</h3>

        </div>
    )}
    
export default Overview;