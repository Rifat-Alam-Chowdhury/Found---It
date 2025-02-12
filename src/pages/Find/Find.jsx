import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiSearch, FiMapPin, FiTag, FiClock } from "react-icons/fi";
import { Link } from "react-router";

function Find() {
  const {
    data: posts = [],
    isLoading: postsLoading,
    error: postsError,
  } = useQuery({
    queryKey: ["finddata"],
    queryFn: async () => {
      const data = await axios.get(`${import.meta.env.VITE_URL}All-data-api`);
      return data.data;
    },
  });

  console.log(posts);

  return (
    <div className="min-h-screen bg-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-600 mb-6">
          Find Lost & Found Items
        </h1>

        {/* Search Bar */}
        <div className="bg-white border-none rounded-xl shadow-sm p-4 mb-8 flex items-center">
          <FiSearch className="text-purple-500 mr-3 text-xl" />
          <input
            type="text"
            placeholder="Search items (e.g., 'black wallet', 'gold bracelet')"
            className="w-full outline-none text-gray-600 placeholder-gray-400"
          />
        </div>

        {/* Category  */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            "All",
            "Electronics",
            "Documents",
            "Jewelry",
            "Clothing",
            "Pets",
          ].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg transition ${
                category === "All"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-purple-600 hover:bg-purple-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4"
            >
              <div className="relative">
                <img
                  src={post.img[0]}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <span
                  className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm ${
                    post.postType === "Lost Item"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {post.postType.toUpperCase()}
                </span>
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {post.title}
              </h2>

              <div className="flex items-center text-gray-600 mb-2">
                <FiTag className="mr-2 text-purple-500" />
                <span className="font-medium">{post.category}</span>
              </div>

              <div className="flex items-center text-gray-600 mb-2">
                <FiMapPin className="mr-2 text-purple-500" />
                <span>{post.location}</span>
              </div>

              <div className="flex items-center text-gray-600 mb-3">
                <FiClock className="mr-2 text-purple-500" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>

              <p className="text-gray-600 text-sm">{post.description}</p>

              <div className="flex justify-end ">
                <Link
                  to={`/Iteamdetails/${post._id}`}
                  className="btn bg-purple-500 "
                >
                  view
                </Link>
              </div>
            </div>
          ))}
        </div>

        <button className="fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-transform hover:scale-105">
          Report Found Item
        </button>
      </div>
    </div>
  );
}

export default Find;
