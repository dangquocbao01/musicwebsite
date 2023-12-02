import React, { useEffect } from "react";
import { Sliders, Section, NewRelease, ChartSection } from "../../components";
import * as apis from "../../apis";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

const Home = () => {
  const { chill, lovelyDay, remix, top100, sadSong, albumHot, weekChart } =
    useSelector((state) => state.app);

  return (
    <>
      {chill ? (
        <div className="overflow-y-auto w-full ">
          <div className="w-full h-[40px] md:h-[70px]"></div>
          <Sliders />
          {chill && <Section data={chill} number={4} />}
          {lovelyDay && <Section data={lovelyDay} number={4} />}
          {remix && <Section data={remix} number={4} />}
          {NewRelease && (
            <div>
              <NewRelease />
            </div>
          )}
          {ChartSection && (
            <div className="">
              <ChartSection />
            </div>
          )}
          {
            <div className=" flex flex-col md:flex-row gap-4 px-[10px] md:px-[60px] w-full  mt-6 md:mt-12 ">
              {weekChart?.map((item) => (
                <Link
                  to={item?.link?.split(".")[0]}
                  key={item.link}
                  className="  "
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
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Loading />
        </div>
      )}
    </>
  );
};

export default Home;
