import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import * as actions from "../store/actions";
import SongItem from "./SongItem";
const NewRelease = () => {
  const { newRelease } = useSelector((state) => state.app);
  const { songs } = useSelector((state) => state.music);
  const [isActived, setIsActived] = useState(0);
  const [newReleaseSongs, setNewReleaseSongs] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.setPlaylist(newRelease?.items?.vPop));
    isActived
      ? setNewReleaseSongs(newRelease?.items?.others)
      : setNewReleaseSongs(newRelease?.items?.vPop);
  }, [isActived, newRelease]);

  return (
    <div className="mt-12 px-[10px] md:px-[60px] flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-5 font-bold">{newRelease?.title}</h3>
        {/* <span className="text-xs uppercase ">Tất cả</span> */}
      </div>

      <div className="flex items-center gap-5 text-xs">
        <button
          type="button"
          onClick={() => {
            setIsActived(0);
            dispatch(actions.setPlaylist(newRelease?.items?.vPop));
          }}
          className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400  ${
            isActived === 0 && "bg-[#0E8080] text-white"
          }`}
        >
          VIỆT NAM
        </button>

        <button
          type="button"
          onClick={() => {
            setIsActived(1);
            dispatch(actions.setPlaylist(newRelease?.items?.others));
          }}
          className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400  ${
            isActived === 1 && "bg-[#0E8080] text-white"
          }`}
        >
          QUỐC TẾ
        </button>
      </div>
      <div className="flex flex-wrap w-full ">
        {newReleaseSongs?.map((item) => (
          <div key={item.encodeId} className="w-[100%] md:w-[50%] lg:w-[30%]">
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
