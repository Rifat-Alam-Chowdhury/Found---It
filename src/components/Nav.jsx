import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AUthfirebase } from "../Auth/AuthApi";

function Nav() {
  const { user, SignOutUser, isloading } = useContext(AUthfirebase);
  console.log(user);

  const routes = (
    <>
      <Link
        className="text-color   lg:mb-0 mb-5 hover:bg-purple-200 lg:hover:scale-125 font-semibold lg:hover:bg-transparent rounded-2xl hover:text-white "
        to="/"
      >
        Home
      </Link>
      <Link
        to={"/find"}
        className="text-color   lg:mb-0 mb-5 hover:bg-purple-200 lg:hover:scale-125 font-semibold lg:hover:bg-transparent rounded-2xl hover:text-white "
      >
        Find
      </Link>

      {user && (
        <>
          <Link
            to={"/post"}
            className="text-color   lg:mb-0 mb-5 hover:bg-purple-200 lg:hover:scale-125 font-semibold lg:hover:bg-transparent rounded-2xl hover:text-white "
          >
            Post
          </Link>
          <Link
            className="text-color  lg:mb-0 mb-9 hover:bg-purple-200 lg:hover:scale-125 font-semibold lg:hover:bg-transparent rounded-2xl hover:text-white "
            to="/Profile"
          >
            Profile
          </Link>
        </>
      )}

      <Link
        className="text-color   lg:mb-0 mb-5 hover:bg-purple-200 lg:hover:scale-125 font-semibold lg:hover:bg-transparent rounded-2xl hover:text-white "
        to="/about"
      >
        About
      </Link>
    </>
  );
  return (
    <>
      <nav
        className={`${
          isloading ? "animate-pluse" : ""
        } bg-white text-color shadow-sm`}
      >
        <div className="navbar  w-11/12 mx-auto ">
          <div className="navbar-start z-100">
            {/* drawer */}
            <div className="drawer lg:hidden">
              <input
                id="my-drawer-2"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content flex flex-col items-center justify-center">
                <label
                  htmlFor="my-drawer-2"
                  className="btn bg-transparent text-color shadow-none border-none drawer-button lg:hidden"
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
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </label>
              </div>

              {/* Sidebar */}
              <div className="drawer-side ">
                <label
                  htmlFor="my-drawer-2"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>

                <div className=" w-7/12 min-h-full bg-white text-color rounded-tr-2xl">
                  <div className=" flex justify-center mt-10">
                    {user ? (
                      <>
                        <div className="grid gap-2 p-2 text-center font-extrabold items-center justify-between">
                          <figure className=" flex justify-center">
                            <img
                              src={user?.photoURL}
                              alt="Login Illustration"
                              className="h-30 w-30 rounded-full object-cover border-2 "
                            />
                          </figure>
                          <h1>{user?.displayName}</h1>
                          <h1>{user?.email}</h1>
                        </div>
                      </>
                    ) : (
                      <figure>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
                          alt="Login Illustration"
                          className="h-30 object-contain"
                        />
                      </figure>
                    )}
                  </div>

                  <div className="menu w-full text-center text-2xl  p-4 ">
                    {routes}
                  </div>
                </div>
              </div>
            </div>

            {/* drawer end */}

            <Link
              to={"/"}
              className="btn border-none bg-transparent shadow-none text-xl hover:text-purple-600 text-color"
            >
              Found It
            </Link>
          </div>
          <div className="navbar-center  hidden lg:flex">
            <ul className="menu menu-horizontal px-1 flex justify-between gap-15 text-color bg-white ">
              {routes}
            </ul>
          </div>

          <div className="navbar-end">
            {isloading ? (
              <div className="skeleton h-10 w-10 rounded-full bg-gray-100 p-2" />
            ) : user ? (
              <>
                <div className="dropdown hidden lg:block dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn w-14  btn-ghost btn-circle avatar"
                  >
                    <div className="w-20 rounded-full">
                      <img alt={user?.displayName} src={user?.photoURL} />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm text-center  dropdown-content bg-gray-50 rounded-box z-10 mt-3 mr-4  w-52 p-4 shadow-2xs "
                  >
                    <Link
                      to={"/profile"}
                      className="hover:bg-purple-200  font-semibold px-2 py-1 rounded-xl"
                    >
                      {" "}
                      Profile
                    </Link>
                    <button
                      onClick={SignOutUser}
                      className="hover:bg-purple-200  font-semibold px-2 py-1 rounded-xl"
                    >
                      Log Out
                    </button>
                  </ul>
                </div>
                <button
                  onClick={SignOutUser}
                  className="btn lg:hidden   bg-transparent text-color "
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link to={"/login"}>
                <button className="btn bg-transparent text-color ">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
