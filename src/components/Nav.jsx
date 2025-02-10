import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AUthfirebase } from "../Auth/AuthApi";
import Skeleton from "react-loading-skeleton";

function Nav() {
  const { GoogleLogIN, user, SignOutUser, isloading } =
    useContext(AUthfirebase);
  console.log(user);

  const routes = (
    <>
      <Link to="/">Home</Link>
      <Link to="/Find">Find</Link>
      <Link to="/post">Post</Link>
      <Link to="/DasBoard">DasBoard</Link>
      <Link to="/about">About</Link>
    </>
  );
  return (
    <>
      <nav className="bg-white shadow-sm">
        <div className="navbar w-11/12 mx-auto border-2">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
              >
                {routes}
              </ul>
            </div>
            <Link
              to={"/"}
              className="btn border-none bg-transparent shadow-none text-xl"
            >
              Found It
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 flex justify-between gap-15">
              {routes}
            </ul>
          </div>

          <div className="navbar-end">
            {isloading ? (
              <div className="skeleton h-10 w-10 rounded-full bg-gray-100 p-2" />
            ) : user ? (
              <button onClick={SignOutUser} className="btn bg-transparent">
                Logout
              </button>
            ) : (
              <Link to={"/login"}>
                <button className="btn bg-transparent">Login</button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
