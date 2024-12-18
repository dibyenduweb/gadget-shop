import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import GoogleLogin from "../components/login-registration/GoogleLogin";

const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const { Login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 const navigate = useNavigate()

  const onSubmit = (data) => {
    Login(data.email, data.password)
navigate("/")
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
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
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: "Please enter a valid email",
                  },
                })}
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
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
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>

            <div className="mt-6">
              <GoogleLogin /> {/* Google login button */}
            </div>

            {/* Register Link */}
            <p className="my-4">
              Dont have an account? <Link to="/registar">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
