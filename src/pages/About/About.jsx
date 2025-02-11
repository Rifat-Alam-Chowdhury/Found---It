import React from "react";

const About = () => {
  return (
    <div className=" p-2 rounded-md bg-white">
      <section className="bg-gradient-to-r from-purple-500 to-purple-700 py-20 rounded-lg">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center ">
          <div className="md:w-1/2 text-white">
            <h2 className="text-4xl font-extrabold mb-6">About Us</h2>
            <p className="mb-6 text-lg">
              We are a community-driven platform dedicated to reuniting lost
              items with their rightful owners. Our mission is to help
              individuals find their cherished belongings by connecting them
              with a compassionate network of finders and reporters.
            </p>
            <p className="mb-6 text-lg">
              Built on trust and transparency, we believe every lost item has a
              story waiting to be reunited with its owner. Join us in creating a
              safer and more connected community.
            </p>
            <button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-full shadow hover:bg-gray-100 transition duration-300">
              Learn More
            </button>
          </div>
          {/* Image Section */}
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <img
              src="/AboutUs.jpg"
              alt="About Us"
              className="w-full max-w-md rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
