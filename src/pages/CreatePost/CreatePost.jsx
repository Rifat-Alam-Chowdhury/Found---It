import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiCamera, FiMapPin, FiCalendar, FiTag } from "react-icons/fi";
import { AUthfirebase } from "../../Auth/AuthApi";
import axios from "axios";

function CreatePost() {
  const { user } = useContext(AUthfirebase);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    user: user?.displayName,
    postType: "Lost Item",
    title: "",
    category: "",
    location: "",
    date: "",
    time: "",
    description: "",
    images: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/categories.json")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePostTypeChange = (type) => {
    setFormData({ ...formData, postType: type });
  };

  const handleFileSelection = (file) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setFormData((prevData) => ({ ...prevData, images: [file] }));
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.images.length === 0) {
        console.log("No images to upload for item.");
        setLoading(false);
        return;
      }

      const uploadImages = async () => {
        const uploadedImageURLs = [];
        for (const image of formData.images) {
          if (typeof image === "string") {
            uploadedImageURLs.push(image);
            continue;
          }

          const formDataImg = new FormData();
          formDataImg.append("image", image);

          try {
            const response = await fetch(
              `https://api.imgbb.com/1/upload?key=${
                import.meta.env.VITE_IMG_API
              }`,
              { method: "POST", body: formDataImg }
            );

            if (!response.ok) {
              setLoading(false);
              toast.error("Image upload failed:", await response.json());
              continue;
            }

            const result = await response.json();
            uploadedImageURLs.push(result.data?.url);
          } catch (error) {
            setLoading(false);
            toast.error("Error uploading image:", error);
            throw error;
          }
        }
        return uploadedImageURLs;
      };

      const imageUrls = await uploadImages();
      if (imageUrls) {
        console.log(formData, imageUrls);

        setFormData((prev) => ({ ...prev, images: imageUrls }));
        const post = await axios.post(
          `${import.meta.env.VITE_URL}create-Post-api`,
          {
            formData: formData,
            img: imageUrls,
          }
        );
      }
    } catch (error) {
      setLoading(false);
      toast.error("Submission failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-purple-50 to-white py-8 px-4">
      <Toaster />
      <div className="w-11/12 mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-purple-600 mb-2">
            Report a Lost or Found Item
          </h1>
          <p className="text-gray-600">
            Help reunite lost items with their owners
          </p>
        </div>

        {/* Form  */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Post Type  */}
            <div className="mb-8 p-4 rounded-lg">
              <label className="block text-gray-700 text-sm font-medium mb-3">
                Post Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handlePostTypeChange("Lost Item")}
                  className={`p-4 rounded-xl flex items-center justify-center font-medium transition border-2 ${
                    formData.postType === "Lost Item"
                      ? "border-purple-600 text-purple-600 bg-purple-50"
                      : "border-purple-100 text-gray-600 hover:border-purple-200"
                  }`}
                >
                  <FiTag className="mr-2" />
                  Lost Item
                </button>
                <button
                  type="button"
                  onClick={() => handlePostTypeChange("Found Item")}
                  className={`p-4 rounded-xl flex items-center justify-center font-medium transition border-2 ${
                    formData.postType === "Found Item"
                      ? "border-purple-600 text-purple-600 bg-purple-50"
                      : "border-purple-100 text-gray-600 hover:border-purple-200"
                  }`}
                >
                  <FiTag className="mr-2" />
                  Found Item
                </button>
              </div>
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Category
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, category: category.name })
                    }
                    className={`p-3 text-sm rounded-lg transition border ${
                      formData.category === category.name
                        ? "border-purple-600 text-purple-600 bg-purple-50"
                        : "border-purple-100 text-gray-600 hover:border-purple-200"
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Item Title */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Item Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g. 'Black Leather Wallet Found'"
                className="w-full p-4 border border-purple-100 rounded-xl focus:ring-2 focus:ring-purple-200"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            {/* Location & Date */}
            <div className="">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  <FiMapPin className="inline mr-1" />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Where was it found/lost?"
                  className="w-full p-4 border border-purple-100 rounded-xl focus:ring-2 focus:ring-purple-200"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              <div className=" ">
                <label className=" text-gray-700 text-sm font-medium mb-2">
                  <FiCalendar className="inline mr-1" />
                  Date & Time
                </label>
                <div className="grid grid-cols-1 lg:grid-cols-2  gap-3">
                  <input
                    type="date"
                    name="date"
                    className="p-3 border text-color border-purple-100 rounded-xl w-full"
                    value={formData.date}
                    onChange={handleChange}
                  />
                  <input
                    type="time"
                    name="time"
                    className="p-3 border border-purple-100 rounded-xl w-full"
                    value={formData.time}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Detailed Description */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Detailed Description
              </label>
              <textarea
                name="description"
                rows="4"
                placeholder="Describe the item in detail..."
                className="w-full p-4 border border-purple-100 rounded-xl focus:ring-2 focus:ring-purple-200"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/*  Image  */}
            <div className="form-control w-full mt-4">
              <label className="label">
                <span className="label-text">Upload Image</span>
              </label>

              <div className="border-2 border-dashed border-purple-100 rounded-lg p-6 text-center hover:border-purple-200 transition cursor-pointer min-h-[200px] flex items-center justify-center">
                <input
                  type="file"
                  className="hidden"
                  id="file-upload"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    handleFileSelection(file);
                  }}
                />

                <div className="flex flex-col items-center justify-center gap-3 w-full">
                  <button
                    type="button"
                    className="btn btn-outline border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white lg:px-4 lg:py-2"
                    onClick={() =>
                      document.getElementById("file-upload").click()
                    }
                  >
                    <FiCamera className="mr-2 text-lg" />
                    Choose File
                  </button>

                  <p className="text-sm text-gray-500 mt-2 lg:text-base">
                    {selectedFile
                      ? selectedFile.name
                      : "Supported formats: JPEG, PNG, WEBP"}
                  </p>

                  {selectedFile && (
                    <div className="mt-4 w-full flex justify-center">
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Preview"
                        className="w-32 h-32 lg:w-48 lg:h-48 object-cover rounded-lg border-2 border-purple-200"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "animate-pulse opacity-75 cursor-not-allowed" : ""
              } w-full bg-purple-600 text-white py-4 rounded-xl font-medium hover:bg-purple-700 transition transform hover:-translate-y-0.5`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Publishing...
                </div>
              ) : (
                "Publish Post"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-500 mt-6 text-sm">
          By posting, you agree to our community guidelines
        </p>
      </div>
    </div>
  );
}

export default CreatePost;
