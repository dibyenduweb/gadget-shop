/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // Correct import of the useAuth hook
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // For navigation after successful registration
import GoogleLogin from "../components/login-registration/GoogleLogin"; // Import GoogleLogin component
import axios from "axios";
import Swal from 'sweetalert2';


const Register = () => {
  const { createUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Function to handle form submission
  const onSubmit =  (data) => {
    const email = data.email;
    const role = data.role;
    const status = role == "buyer" ? "approved" : "pending"
    const wishlist = []

    const userData= {email, role, status, wishlist}

  createUser(data.email, data.password)
      .then(()=>{
          axios.post('http://localhost:5000/users', userData).then((res)=>{
          
            if(res.data.insertedId){
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Registration sucses full",
                showConfirmButton: false,
                timer: 1500
              });
              navigate("/");
            }
          })
      })
      navigate("/");
      console.log(userData);
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                className="input input-bordered"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords must match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <select
                className="select select-bordered w-full max-w-xs"
                {...register("role", { required: true })}
              >
                <option disabled selected>
                  Select Your Rol
                </option>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>

              {errors.role && (
                <p className="text-red-500">you must selet a role</p>
              )}
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>

            <div className="mt-6">
              <GoogleLogin /> {/* Google login button */}
            </div>

            <p className="my-4">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
