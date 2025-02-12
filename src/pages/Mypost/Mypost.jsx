import React, { useContext, useEffect, useState } from "react";
import { FiClock, FiMapPin, FiTag, FiInfo } from "react-icons/fi";
import { AUthfirebase } from "../../Auth/AuthApi";
import axios from "axios";
import PostModal from "../../components/PostModal";
import toast, { Toaster } from "react-hot-toast";

function Mypost() {
  const { user } = useContext(AUthfirebase);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_URL}My-data-api`,
          { displayName: user?.displayName }
        );

        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSave = async (updatedPost) => {
    console.log(updatedPost);

    const EditPost = await axios.post(
      `${import.meta.env.VITE_URL}Edit-Post-Api`,
      updatedPost
    );
    if (EditPost) {
      toast.success("updated");
    }

    setPosts(
      posts.map((post) => (post._id === updatedPost._id ? updatedPost : post))
    );
    setSelectedPost(null);
  };

  const handleDelete = (postId) => {
    setPosts(posts.filter((post) => post._id !== postId));
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen bg-purple-50 p-6">
      <Toaster />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-600 mb-8">My Posts</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4"
            >
              {/* Image Thumbnail */}
              {post.img.length > 0 && (
                <div className="relative mb-4">
                  <img
                    src={post.img[0]}
                    alt="Post"
                    className="w-full h-48 object-cover rounded-lg border-2 border-purple-100"
                  />
                  <span
                    className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm ${
                      post.postType === "Lost Item"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {post.postType}
                  </span>
                </div>
              )}

              {/* Card Content */}
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-gray-800">
                  {post.title}
                </h2>

                <div className="flex items-center text-gray-600">
                  <FiTag className="mr-2 text-purple-500" />
                  <span>{post.category}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <FiMapPin className="mr-2 text-purple-500" />
                  <span className="truncate">{post.location}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <FiClock className="mr-2 text-purple-500" />
                  <span>
                    {new Date(post.date).toLocaleDateString()} • {post.time}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedPost(post)}
                  className="w-full mt-4 bg-purple-100 text-purple-600 py-2 rounded-lg hover:bg-purple-200 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
        {selectedPost && (
          <PostModal
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
            onSave={handleSave}
            onDelete={() => handleDelete(selectedPost._id)}
          />
        )}
      </div>
    </div>
  );
}

export default Mypost;
