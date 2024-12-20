import { useEffect, useState } from "react";
import axios from "axios";

import useAuth from "./useAuth";

const useUserData = () => {
  const { user, loading } = useAuth();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      
        const res = await axios.get(`http://localhost:5000/user/${user.email}`);
        setUserData(res.data);
    };
    if (user?.email && !loading) {
      fetchUserData();
    }
  }, [user, loading]);

  return userData;
};
export default useUserData;
