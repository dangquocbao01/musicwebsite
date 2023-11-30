import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import SongItem from "./SongItem";
const NewRelease = () => {
  const { newRelease } = useSelector((state) => state.app);
  const [isActived, setIsActived] = useState(0);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    isActived
      ? setSongs(newRelease?.items?.others)
      : setSongs(newRelease?.items?.vPop);
  }, [isActived, newRelease]);

  return (
    <div className="mt-12 px-[60px] flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-5 font-bold">{newRelease?.title}</h3>
        {/* <span className="text-xs uppercase ">Tất cả</span> */}
      </div>

      <div className="flex items-center gap-5 text-xs">
        <button
          type="button"
          onClick={() => setIsActived(0)}
          className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400  ${
            isActived === 0 && "bg-[#0E8080] text-white"
          }`}
        >
          VIỆT NAM
        </button>

        <button
          type="button"
          onClick={() => setIsActived(1)}
          className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400  ${
            isActived === 1 && "bg-[#0E8080] text-white"
          }`}
        >
          QUỐC TẾ
        </button>
      </div>
      <div className="flex flex-wrap w-full ">
        {songs?.map((item) => (
          <div key={item.encodeId} className="w-[45%] min-[1024px]:w-[30%]">
            <SongItem
              key={item.encodeId}
              sid={item.encodeId}
              thumbnail={item.thumbnail}
              title={item.title}
              artists={item.artistsNames}
              releaseDate={item.releaseDate}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewRelease;
