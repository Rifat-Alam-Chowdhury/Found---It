import React, { useState } from "react";
import { FiX, FiTag, FiMapPin, FiClock } from "react-icons/fi";

const PostModal = ({ post, onClose, onSave, onDelete }) => {
  const [editedPost, setEditedPost] = useState(post);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-purple-600"
        >
          <FiX className="w-6 h-6" />
        </button>

        <h3 className="text-2xl font-bold text-purple-600 mb-4">Edit Post</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              name="title"
              value={editedPost.title}
              onChange={handleChange}
              className="w-full p-3 border border-purple-100 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Category</label>
              <select
                name="category"
                value={editedPost.category}
                onChange={handleChange}
                className="w-full p-3 border border-purple-100 rounded-lg"
              >
                <option value="Electronics">Electronics</option>
                <option value="Documents">Documents</option>
                <option value="Jewelry">Jewelry</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Location</label>
              <input
                name="location"
                value={editedPost.location}
                onChange={handleChange}
                className="w-full p-3 border border-purple-100 rounded-lg"
              />
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={editedPost.date}
                onChange={handleChange}
                className="w-full p-3 border border-purple-100 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Time</label>
              <input
                type="time"
                name="time"
                value={editedPost.time}
                onChange={handleChange}
                className="w-full p-3 border border-purple-100 rounded-lg"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={editedPost.description}
              onChange={handleChange}
              className="w-full p-3 border border-purple-100 rounded-lg h-32"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={onDelete}
              className="flex-1 bg-red-100 text-red-600 py-2 rounded-lg hover:bg-red-200 transition"
            >
              Delete Post
            </button>
            <button
              onClick={() => onSave(editedPost)}
              className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
