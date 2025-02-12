import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft, FiMapPin, FiClock, FiTag, FiInfo } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";

function Iteamdetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [mainImage, setMainImage] = useState(null);

  const {
    data: posts = [],
    isLoading: postsLoading,
    error: postsError,
  } = useQuery({
    queryKey: ["deatils"],
    queryFn: async () => {
      const data = await axios.get(`${import.meta.env.VITE_URL}items/${id}`);
      return setItem(data.data);
    },
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm">
          <h2 className="text-2xl text-red-600 mb-4">{error}</h2>
          <a href="/find" className="text-purple-600 hover:underline">
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  // Ensure item is available
  if (!item) {
    return null;
  }

  return (
    <div className="min-h-screen bg-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/find"
          className="mb-6 inline-flex items-center text-purple-600 hover:text-purple-700"
        >
          <FiArrowLeft className="mr-2" /> Back to Listings
        </Link>

        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div>
              <div className="relative mb-4">
                <img
                  src={mainImage || item.img?.[0]}
                  alt={item.title}
                  className="w-full h-96 object-cover rounded-lg border-2 border-purple-100"
                />
                <span
                  className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm ${
                    item.postType === "Lost Item"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {item.postType}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {item.img &&
                  item.img.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Preview ${index}`}
                      className="w-full h-24 object-cover rounded-md border-2 border-purple-100 cursor-pointer hover:border-purple-300"
                      onClick={() => setMainImage(img)}
                    />
                  ))}
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-800">{item.title}</h1>

              <div className="space-y-4">
                <div className="flex items-start">
                  <FiTag className="text-purple-500 mr-2 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-700">Category</h3>
                    <p className="text-gray-600">{item.category}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FiMapPin className="text-purple-500 mr-2 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-700">Location</h3>
                    <p className="text-gray-600">{item.location}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FiClock className="text-purple-500 mr-2 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-700">Date & Time</h3>
                    <p className="text-gray-600">
                      {new Date(item.date).toLocaleDateString()} • {item.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FiInfo className="text-purple-500 mr-2 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-700">Description</h3>
                    <p className="text-gray-600 whitespace-pre-line">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-purple-100">
                <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition">
                  Contact Finder/Owner
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Iteamdetails;
