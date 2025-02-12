import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import SpotlightCard from "../../components/SpotlightCard";
import Community from "../../components/Community";
import About from "../About/About";
import { Link } from "react-router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function Home() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  // const [posts, setPosts] = useState([]);
  // const [categories, setcategories] = useState([]);
  // console.log(posts);

  const {
    data: posts = [],
    isLoading: postsLoading,
    error: postsError,
  } = useQuery({
    queryKey: "all data",
    queryFn: async () => {
      const data = await axios.get(`${import.meta.env.VITE_URL}All-data-api`);
      return data.data;
    },
  });
  console.log(posts);

  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch("/categories.json");
      return response.data;
    },
  });
  if (posts.message) {
    return (
      <>
        <div>{posts.message}</div>
      </>
    );
  }

  return (
    <>
      <div className="  bg-transparent    w-11/12  mx-auto">
        {/* banner */}
        <div className="mt-5">
          <h1 className="text-xl ml-6 font-bold mb-1 text-color">
            Top Priority
          </h1>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="mySwiper  rounded-lg"
            style={{
              height: "500px",
            }}
          >
            {posts?.map((data, index) => (
              <SwiperSlide
                key={index}
                className="flex items-center justify-center bg-white relative"
              >
                <div className="w-full h-full relative">
                  <img
                    src={data.img}
                    alt={data.item}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 text-white  
                lg:top-0 lg:bottom-0 lg:right-0 lg:left-auto 
                lg:flex lg:flex-col lg:justify-center lg:p-20"
                  >
                    <h3 className="font-bold text-lg">{data.name}</h3>
                    <p className="text-sm">{data.item}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            <div className="autoplay-progress" slot="container-end">
              <svg viewBox="0 0 48 48" ref={progressCircle}>
                <circle cx="24" cy="24" r="20"></circle>
              </svg>
              <span ref={progressContent}></span>
            </div>
          </Swiper>
        </div>
        {/* banner */}
        {/* ******************************************8
        8
        8
        ****
        8
        8
        8
        *
        *
        * 8
        * 8
        * 8
        * 8
        *  */}

        {/* cetegory */}
        <section className="text-color  mt-5">
          <div className="">
            <h2 className="text-2xl font-bold text-center mb-6">
              Browser By Categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((category, index) => (
                <SpotlightCard key={index} className="bg-white border-none">
                  <div className="flex flex-col items-center justify-center p-4  rounded-lg  cursor-pointer ">
                    <span className="text-4xl">{category.icon}</span>
                    <h3 className="mt-2 text-lg font-medium text-center">
                      {category.name}
                    </h3>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>
        {/* cetegory */}

        {/* ***********
         *
         *
         * *
         * *
         * *
         * *
         * **
         * * */}

        {/* recenlost */}
        <section className=" text-color mt-4">
          <div className=" p-2 rounded-md bg-white">
            <h1 className="font-semibold ml-2">Just Now</h1>
            <div className="lg:grid lg:grid-cols-3 gap-3">
              {posts?.map((recent, index) => (
                <React.Fragment key={index}>
                  <div className="lg:hidden flex items-center p-2 mb-2 border-b border-gray-400">
                    <div className="flex-1">
                      <h1 className="mb-1">{recent.user}</h1>
                      <p>{recent.title}</p>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <img
                        src={recent.img}
                        alt={recent.item}
                        className="w-16 h-16 object-cover rounded-2xl"
                      />
                    </div>
                  </div>
                  <SpotlightCard className="hidden border-none lg:block bg-white relative overflow-hidden">
                    <figure className="relative w-full">
                      <img
                        src={recent.img}
                        alt={recent.title}
                        className="h-40 w-full object-cover rounded-md"
                      />
                    </figure>
                    <div className="p-4 h-1/2 flex flex-col">
                      <h2 className="card-title text-lg">{recent.user}</h2>
                      <p className="text-sm line-clamp-3 mb-2">
                        {recent.category}
                      </p>
                      <div className="card-actions mt-auto">
                        <Link
                          to={`/find`}
                          className="border-b-2 px-2 text-color hover:bg-purple-300 hover:text-white transition-all duration-300 ease-in-out rounded-md"
                        >
                          View more
                        </Link>
                      </div>
                    </div>
                  </SpotlightCard>
                </React.Fragment>
              ))}
            </div>

            <div className="flex justify-center mt-5">
              <Link
                to={`/find`}
                className="border-b-2 px-2 text-color hover:bg-purple-300 hover:text-white transition-all duration-300 ease-in-out rounded-md  "
              >
                View more
              </Link>
            </div>
          </div>
        </section>
        {/* recenlost */}

        {/* ***************************************************************
         *******************************************************************
         *****************************************************************
         *********************************************************************/}
        {/* Community Heroes */}
        <section className="text-color   mt-4">
          <div className=" p-2 rounded-md bg-white">
            <Community />
          </div>
        </section>
        {/* Community Heroes */}
        {/* ***************************************************************
         *******************************************************************
         *****************************************************************
         *********************************************************************/}
        {/* ***************************************************************
         *******************************************************************
         *****************************************************************
         *********************************************************************/}
        {/* About us */}
        <section className="text-color   mt-4">
          <About />
        </section>
        {/* About us */}
        {/* ***************************************************************
         *******************************************************************
         *****************************************************************
         *********************************************************************/}
      </div>
    </>
  );
}

export default Home;
