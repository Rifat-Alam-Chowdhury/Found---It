import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AUthfirebase } from "../Auth/AuthApi";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const { GoogleLogIN, LogIn } = useContext(AUthfirebase);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const HandelLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    LogIn(email, password)
      .then((userCredential) => {
        toast.success("Log in successfully");
        navigate("/");
      })
      .catch((err) => toast.error(err.message));
  };
  const HandleGoogleLogIn = () => {
    GoogleLogIN().then(() => {
      toast.success("Log in successfully");
      navigate("/");
    });
  };
  const handleRecruiterAutoFill = () => {
    toast.success("Hello");
    setEmail("rifatalamtabs@gmail.com");
    setPassword("Re*1010*1#");
  };
  return (
    <>
      <section className="text-black bg-gray-100">
        <Toaster />
        <div className=" flex justify-between lg:gap-15 p-10 w-10/12 mx-auto items-center">
          <div>
            <Link to={"/"}>
              {" "}
              <button className="btn text-black bg-transparent border-none hover:text-purple-600 hover:shadow-md hover:shadow-purple-700">
                Found It
              </button>
            </Link>
          </div>
          <div className="flex lg:gap-20 md:gap-16 ">
            <Link className="hover:text-purple-600 " to={"/"}>
              <button className="btn text-black bg-transparent border-none hover:text-purple-600 hover:shadow-md hover:shadow-purple-700">
                Home
              </button>
            </Link>
            <Link className="hover:text-purple-600 " to={"/signUp"}>
              <button className="btn text-black bg-transparent border-none hover:text-purple-600 hover:shadow-md hover:shadow-purple-700">
                SignUp
              </button>
            </Link>
          </div>
        </div>

        <div className="   lg:flex w-10/12 mx-auto lg:p-10 justify-around gap-5">
          <div className="lg:w-1/2 text-purple-950 lg:p-8 text-center lg:text-6xl lg:my-auto text-2xl mb-5">
            <h1>Welcome back to Found It</h1>
          </div>

          <div className="lg:w-1/2 card bg-white shadow-sm  ">
            <figure>
              <img
                src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
                alt="Login Illustration"
                className="h-30 object-contain"
              />
            </figure>
            <button
              onClick={handleRecruiterAutoFill}
              className="btn btn-xs w-7/12 mx-auto p-2 bg-black text-white rounded-xl"
            >
              Only if you are a requiter click here
            </button>
            <div className="card-body">
              <h2 className="card-title justify-center text-2xl mb-4">
                Login to Your Account
              </h2>

              <form onSubmit={HandelLogin}>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="input input-bordered w-full bg-white border-2 border-gray-100"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-control w-full mt-4">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="input input-bordered w-full  bg-white border-2 border-gray-100"
                    required
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="card-actions flex-col mt-6">
                  <button
                    type="submit"
                    className="btn bg-purple-200 hover:bg-purple-400 hover:text-white text-black w-full"
                  >
                    Login
                  </button>

                  <div className="divider">OR</div>

                  <button
                    type="button"
                    onClick={HandleGoogleLogIn}
                    className="btn btn-outline w-full gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 488 512"
                      className="w-5 h-5"
                    >
                      <path
                        fill="#EA4335"
                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                      />
                    </svg>
                    Continue with Google
                  </button>
                </div>
              </form>

              <p className="text-center mt-4 font-bold">
                Don't have an account?{" "}
                <Link to="/signup" className="link text-purple-500">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
