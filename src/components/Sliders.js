import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getArrSlider } from "../ultis/fn";
import * as actions from "../store/actions";
import "./sliders.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
// import required modules
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectFade,
  EffectCoverflow,
} from "swiper/modules";

const Sliders = () => {
  const { banner } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentWidth } = useSelector((state) => state.app);
  const handleClickBanner = (item) => {
    if (item?.type === 1) {
      dispatch(actions.setCurrentSongId(item.encodeId));
      dispatch(actions.play(true));
      dispatch(actions.setPlaylist(null));
    } else if (item?.type === 4) {
      const albumPath = item?.link?.split(".")[0];
      navigate(albumPath);
    } else {
      dispatch(actions.setPlaylist(null));
    }
  };
  return (
    <div className=" w-full rounded-sm  gap-4  overflow-hidden px-[10px] md:px-[60px] py-2 md:py-8">
      {/* {banner?.map((item, index) => (
        <img
          key={item.encodeId}
          src={item.banner}
          className={`slider-item flex=1 object-contain w-1/3 rounded-lg  ${
            index <= 2 ? "block" : "hidden"
          }`}
        />
      ))} */}
      <Swiper
        effect={"coverflow"}
        grabCursor={false}
        centeredSlides={false}
        slidesPerView={currentWidth < 500 ? 1 : currentWidth < 800 ? 2 : 3}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {banner?.map((item, index) => (
          <SwiperSlide key={`${item.encodeId}-${index}`}>
            <div>
              <img
                src={item.banner}
                onClick={() => handleClickBanner(item)}
                className="rounded-sm  "
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Sliders;
