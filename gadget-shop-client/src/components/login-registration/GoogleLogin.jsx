import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth"; // Correctly import useAuth hook
import { FcGoogle } from "react-icons/fc";

const GoogleLogin = () => {
  const { GoogleLogin: handleGoogleLogin } = useAuth(); // Correctly invoke the hook to get the function
  const navigate = useNavigate();

  const handleGoogleLoginClick = () => {
    handleGoogleLogin() // Call the GoogleLogin function from useAuth hook
      .then(() => {
        navigate("/"); // Navigate to home page after successful login
      })
      .catch((error) => {
        console.error("Google login error: ", error);
      });
  };

  return (
    <div>
      <div className="divider">OR</div>
      <div>
        <button onClick={handleGoogleLoginClick} className="btn btn-primary btn-outline">
          <FcGoogle />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default GoogleLogin;
