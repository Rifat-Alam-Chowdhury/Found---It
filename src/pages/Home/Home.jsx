import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

function Home() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const [posts, setPosts] = useState([]);

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
        <div className="">
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
            className="mySwiper border-2 rounded-lg"
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
      </div>
    </>
  );
}

export default Home;
