import React, { useEffect } from "react";
import { Sliders, Section, NewRelease, ChartSection } from "../../components";
import * as apis from "../../apis";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const {
    chill,
    lovelyDay,
    remix,
    top100,
    sadSong,
    albumHot,
    popularArtist,
    weekChart,
  } = useSelector((state) => state.app);

  return (
    <div className="overflow-y-auto w-full ">
      <div className="w-full h-[70px]"></div>
      <Sliders />
      {chill && <Section data={chill} number={4} />}
      {lovelyDay && <Section data={lovelyDay} number={4} />}
      {remix && <Section data={remix} number={4} />}
      {NewRelease && <NewRelease />}
      {ChartSection && <ChartSection />}
      {
        <div className="flex items-center px-[44px] w-full mt-12">
          {weekChart?.map((item) => (
            <Link
              to={item?.link?.split(".")[0]}
              key={item.link}
              className="flex-1 px-4"
            >
              <img
                src={item.cover}
                alt="cover"
                className="w-full obj rounded-md"
              />
            </Link>
          ))}
        </div>
      }

      {top100 && <Section data={top100} number={4} />}
      {sadSong && <Section data={sadSong} number={4} />}
      {albumHot && <Section data={albumHot} number={4} />}

      <div className="w-full h-[500px]"></div>
    </div>
  );
};

export default Home;
