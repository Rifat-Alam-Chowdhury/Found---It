import React from "react";
import { Link } from "react-router";

function SignUp() {
  return (
    <section className="text-black bg-gray-100">
      <div className=" flex justify-between lg:gap-15 p-10 w-10/12 mx-auto items-center">
        <div>
          <button className="btn text-black bg-transparent border-none hover:text-purple-500 hover:shadow-md shadow-md hover:shadow-purple-700">
            Found It
          </button>
        </div>
        <div className="flex lg:gap-20 md:gap-16 ">
          <Link className="hover:text-purple-600 " to={"/"}>
            <button className="btn text-black bg-transparent border-none hover:text-purple-500 hover:shadow-md shadow-md hover:shadow-purple-700">
              Home
            </button>
          </Link>
          <Link className="hover:text-purple-600 " to={"/login"}>
            <button className="btn text-black bg-transparent border-none hover:text-purple-500 hover:shadow-md shadow-md hover:shadow-purple-700">
              Login
            </button>
          </Link>
        </div>
      </div>

      <div className="  lg:flex w-10/12 mx-auto lg:p-10 justify-around gap-5 ">
        {/* form */}

        <div className="lg:w-1/2 card bg-white shadow-sm">
          <figure>
            <img
              src="https://cdn-icons-png.flaticon.com/512/5087/5087633.png"
              alt="Signup Illustration"
              className="h-35 object-contain "
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title  justify-center text-2xl mb-4">
              Create Your Account
            </h2>

            <form onSubmit={"HandleSignup"}>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="input input-bordered w-full bg-white border-2 border-gray-100 mt-2"
                  required
                  name="name"
                />
              </div>

              <div className="form-control w-full mt-4">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="input input-bordered w-full bg-white border-2 border-gray-100 mt-2"
                  required
                  name="email"
                />
              </div>

              <div className="form-control w-full mt-4">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="tel"
                  placeholder="+1 234 567 890"
                  className="input input-bordered w-full bg-white border-2 border-gray-100 mt-2"
                  pattern="[+]{0,1}[0-9]{7,15}"
                  required
                  name="phone"
                />
              </div>

              <div className="form-control w-full mt-4">
                <label className="label">
                  <span className="label-text">Profile Image</span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  accept="image/*"
                  name="image"
                />
              </div>

              <div className="form-control w-full mt-4">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full bg-white border-2 border-gray-100 mt-2"
                  required
                  name="password"
                />
              </div>

              <div className="form-control w-full mt-4">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full bg-white border-2 border-gray-100 mt-2"
                  required
                  name="confirmPassword"
                />
              </div>

              <div className="card-actions flex-col mt-6">
                <button
                  type="submit"
                  className="btn bg-purple-100 hover:bg-purple-500 hover:text-white text-black w-full"
                >
                  Create Account
                </button>

                <div className="divider">OR</div>

                <button
                  type="button"
                  onClick={"HandleGoogleLogIn"}
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
              Already have an account?{" "}
              <Link to="/login" className="link text-purple-500">
                Login here
              </Link>
            </p>
          </div>
        </div>
        {/*     form */}
        <div className="lg:w-1/2 text-purple-950 lg:p-8 text-center lg:text-6xl lg:my-auto text-2xl mb-5">
          <h1>Welcome back to Found It</h1>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
