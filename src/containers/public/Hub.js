import React, { useEffect } from "react";
import { Sliders, Section, NewRelease, ChartSection } from "../../components";
import * as apis from "../../apis";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Hub = () => {
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
    <div className="w-full">
      <div className="w-full h-[50px] md:h-[90px] "></div>
      {chill && <Section data={chill} number={100} HideBtn />}
      {lovelyDay && <Section data={lovelyDay} number={100} HideBtn />}
      {remix && <Section data={remix} number={100} HideBtn />}

      {top100 && <Section data={top100} number={100} HideBtn />}
      {sadSong && <Section data={sadSong} number={100} HideBtn />}
      {albumHot && <Section data={albumHot} number={100} HideBtn />}
    </div>
  );
};

export default Hub;
