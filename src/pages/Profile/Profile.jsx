import React, { useState } from "react";
import { FiMenu, FiX, FiEdit, FiPackage, FiPlus } from "react-icons/fi";
import { Link, Outlet } from "react-router-dom";
import Nav from "../../components/Nav";

function Profile() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("edit");
  const [user] = useState({
    name: "Sarah Johnson",
    email: "sarah@example.com",
    bio: "Helping reunite lost items with their owners ❤️",
    itemsPosted: 12,
  });

  const postedItems = [
    { id: 1, title: "Found: Black Leather Wallet", date: "2024-03-15" },
    { id: 2, title: "Lost: Silver Bracelet", date: "2024-03-12" },
    { id: 3, title: "Found: College ID Card", date: "2024-03-10" },
  ];

  const navLinks = [
    {
      to: "/Profile/mypost", // Path to the profile page
      icon: <FiPackage className="mr-3" />,
      label: "My Posts",
    },
    {
      to: "/Profile/CreatePost", // Path to create new post
      icon: <FiPlus className="mr-3" />,
      label: "Create New Post",
    },
    {
      to: "/Profile/edit", // Path to edit profile
      icon: <FiEdit className="mr-3" />,
      label: "Edit Profile",
    },
  ];

  return (
    <>
      <div className="flex">
        {/* big device */}
        <div className=" hidden lg:block  w-64 text-color bg-white min-h-screen">
          <ul className="space-y-2 mt-10 ">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.to}
                  className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition duration-200 text-center border-2 "
                >
                  {link.icon}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* big device */}
        <div className=" w-full  min-h-10 lg:hidden flex flex-col  text-color bg-white ">
          {/* mobile  */}
          <ul className="space-y-2  flex border-b-2  w-11/12 mx-auto">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.to}
                  className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition text-[12px] duration-200"
                >
                  {link.icon}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className=" lg:hidden min-h-screen">
            <Outlet />
          </div>
          {/* mobile  */}
        </div>
        <div className=" hidden lg:block flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Profile;
