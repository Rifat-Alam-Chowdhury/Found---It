import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import SpotlightCard from "../../components/SpotlightCard";
import StarBorder from "../../components/StarBorder";
import Community from "../../components/Community";
import About from "../About/About";

function Home() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const [posts, setPosts] = useState([]);

  const categories = [
    { name: "Electronics", icon: "📱" },
    { name: "Personal Accessories & Documents", icon: "💼" },
    { name: "Bags & Backpacks", icon: "🎒" },
    { name: "Clothing & Accessories", icon: "👕" },
    { name: "Jewelry & Watches", icon: "⌚" },
    { name: "Miscellaneous Items", icon: "📦" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/Banner.json");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(posts);

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
                <SpotlightCard className="bg-white border-none">
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center p-4  rounded-lg  cursor-pointer "
                  >
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
            <div className=" lg:grid lg:grid-cols-3 gap-3">
              {posts?.map((recent, index) => (
                <>
                  <div
                    key={index}
                    className=" lg:hidden   flex items-center p-2 mb-2 border-b border-gray-400"
                  >
                    <div className="flex-1">
                      <h1 className="mb-1">{recent.name}</h1>{" "}
                      <p>{recent.item}</p>
                    </div>

                    <div className="flex-shrink-0 ml-4">
                      <img
                        src={recent.img}
                        alt={recent.item}
                        className="w-16 h-16 object-cover rounded-2xl"
                      />
                    </div>
                  </div>

                  <SpotlightCard className="hidden border-none  lg:block bg-white relative overflow-hidden">
                    <figure className="relative w-full  ">
                      <img
                        src={recent.img}
                        alt={recent.item}
                        className=" h-40 w-full object-cover rounded-md"
                      />
                    </figure>
                    <div className=" p-4 h-1/2 flex flex-col">
                      <h2 className="card-title text-lg">{recent.name}</h2>
                      <p className="text-sm line-clamp-3 mb-2">{recent.item}</p>
                      <div className="card-actions mt-auto">
                        <button className=" border-b-2  px-2 text-color hover:bg-purple-300 hover:text-white transition-all duration-300 ease-in-out rounded-md">
                          View more
                        </button>
                      </div>
                    </div>
                  </SpotlightCard>
                </>
              ))}
            </div>
            <div className="text-center cursor-pointer  hover:scale-125 bg-purple-100 rounded-xl  w-25 mx-auto border-b px-2 transition-transform duration-300 ease-in-out">
              View More
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
