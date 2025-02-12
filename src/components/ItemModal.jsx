import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  FiX,
  FiMapPin,
  FiClock,
  FiTag,
  FiInfo,
  FiArrowLeft,
} from "react-icons/fi";

function ItemModal() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}items/${id}`
        );
        setItem(response.data);
        setMainImage(response.data?.img?.[0]);
        setLoading(false);
      } catch (err) {
        setError("Item not found or failed to load");
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 bg-white p-2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md text-center">
          <h2 className="text-2xl text-red-600 mb-4">{error}</h2>
          <Link to="/find" className="text-purple-600 hover:underline">
            Return to Listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 overflow-y-auto py-8">
      <div className="bg-white rounded-2xl shadow-xl relative max-w-4xl w-full mx-4 transform transition-all duration-300 scale-95 hover:scale-100">
        {/* Close Button */}
        <Link
          to="/find"
          className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg hover:bg-purple-100 transition-colors z-50"
        >
          <FiX className="w-6 h-6 text-purple-600" />
        </Link>

        <div className="p-6 md:p-8">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="relative group">
              <div className="relative mb-4 overflow-hidden rounded-xl">
                <img
                  src={mainImage || item.img?.[0]}
                  alt={item.title}
                  className="w-full h-64 md:h-80 object-cover transform transition-transform duration-300 group-hover:scale-105"
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
                {item.img.map((img, index) => (
                  <div
                    key={index}
                    className="relative cursor-pointer group"
                    onClick={() => setMainImage(img)}
                  >
                    <img
                      src={img}
                      alt={`Preview ${index}`}
                      className="w-full h-24 object-cover rounded-md border-2 border-purple-100 transition-all duration-300 group-hover:border-purple-300"
                    />
                    <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-20 transition-opacity rounded-md" />
                  </div>
                ))}
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-800">{item.title}</h1>

              <div className="space-y-4">
                <DetailItem
                  icon={<FiTag />}
                  title="Category"
                  value={item.category}
                />
                <DetailItem
                  icon={<FiMapPin />}
                  title="Location"
                  value={item.location}
                />
                <DetailItem
                  icon={<FiClock />}
                  title="Date & Time"
                  value={`${new Date(item.date).toLocaleDateString()} • ${
                    item.time
                  }`}
                />
                <DetailItem
                  icon={<FiInfo />}
                  title="Description"
                  value={item.description}
                  isDescription
                />
              </div>

              <div className="pt-4 border-t border-purple-100">
                <button className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-purple-600 transition-all transform hover:-translate-y-0.5">
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

const DetailItem = ({ icon, title, value, isDescription = false }) => (
  <div className="flex items-start">
    <span className="text-purple-500 mr-2 mt-1">{icon}</span>
    <div>
      <h3 className="font-semibold text-gray-700">{title}</h3>
      <p
        className={`text-gray-600 ${
          isDescription ? "whitespace-pre-line" : ""
        }`}
      >
        {value}
      </p>
    </div>
  </div>
);

export default ItemModal;
