import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router";
import { AUthfirebase } from "../Auth/AuthApi";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function SignUp() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const { GoogleLogIN, CreateUser } = useContext(AUthfirebase);

  const handleFileChange = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;
    const phone = form.phone.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");

      return;
    }

    if (!selectedFile) {
      toast.error("Please select an Img!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_API}`,
        { method: "POST", body: formData }
      );

      const data = await response.json();
      if (!data.success) toast.error("Image upload failed");

      const user = await CreateUser(email, password, name, data?.data?.url);
      if (user) toast.success("Log In successfully");

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const HandleGoogleLogIn = () => {
    GoogleLogIN().then(() => {
      navigate("/");
    });
  };
  return (
    <section className="text-black bg-gray-100">
      <Toaster />
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

      <div className="  min-h-screen lg:flex w-10/12 mx-auto lg:p-10 justify-around gap-5 ">
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

            {/* form */}
            <form onSubmit={handleFileChange}>
              {/* name */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Re Chowdhury"
                  className="input input-bordered w-full bg-white border-2 border-gray-100 mt-2"
                  required
                  name="name"
                />
              </div>
              {/* name */}
              {/* email */}{" "}
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
              {/* email */}
              {/* phone number */}{" "}
              <div className="form-control w-full mt-4">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="tel"
                  placeholder="+880 "
                  className="input input-bordered w-full bg-white border-2 border-gray-100 mt-2"
                  pattern="[+]{0,1}[0-9]{7,15}"
                  required
                  name="phone"
                />
              </div>
              {/* phone number */}
              {/* img */}
              <div className="form-control w-full mt-4">
                <label className="label">
                  <span className="label-text">Profile Image</span>
                </label>

                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors${
                    isDragActive
                      ? "border-purple-500 bg-purple-50"
                      : "border-base-300 hover:border-purple-300"
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragActive(true);
                  }}
                  onDragLeave={() => setIsDragActive(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragActive(false);
                    const file = e.dataTransfer.files[0];
                    if (file && file.type.startsWith("image/")) {
                      setSelectedFile(file);
                    }
                  }}
                >
                  <input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) setSelectedFile(file);
                    }}
                  />

                  <div className="flex flex-col items-center justify-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12 text-purple-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>

                    <div className="space-y-1">
                      <p className="font-medium">
                        {selectedFile
                          ? selectedFile.name
                          : "Drag and drop your photo here"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {selectedFile
                          ? "Click to change photo"
                          : "or click to browse (JPEG, PNG, WEBP)"}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="btn btn-sm btn-outline border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
                      onClick={() => {
                        const fileInput =
                          document.getElementById("file-upload");
                        if (fileInput) fileInput.click();
                      }}
                    >
                      Choose File
                    </button>
                  </div>

                  {selectedFile && (
                    <div className="mt-4">
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Preview"
                        className="mx-auto h-32 w-32 rounded-full object-cover border-2 border-purple-200"
                      />
                    </div>
                  )}
                </div>
              </div>
              {/* img */}
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
                  onClick={HandleGoogleLogIn}
                  type="button"
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
        <div className="lg:w-1/2 text-purple-950 lg:p-8 text-center lg:text-6xl lg:my-20 p-2">
          <h1>Join Us in Reuniting Lost Items with Their Owners!</h1>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
