import React from "react";
import ListItem from "./ListItem";
import { memo } from "react";
import icons from "../ultis/icons";
import moment from "moment";
import { useSelector } from "react-redux";
const { BsDot } = icons;

const ListSongs = ({ totalDuration, isHideTime, addBtn }) => {
  const { songs } = useSelector((state) => state.music);

  return (
    <div className="w-full flex flex-col text-xs text-gray-600  ">
      <div className="flex justify-between items-center  p-[10px] font-semibold">
        <span className={isHideTime && "font-bold text-lg"}>BÀI HÁT</span>
        {!isHideTime && (
          <span className="hidden lg:block                                        ">
            ALBUM
          </span>
        )}
        {!isHideTime && <span>THỜI GIAN</span>}
      </div>
      <div className="flex flex-col ">
        {songs?.map((item, index) => (
          <ListItem key={item.encodeId} songData={item} isHideNode addBtn />
        ))}
      </div>
      {totalDuration && (
        <span className=" flex items-center gap-1 py-[10px] border-t border-[rgba(0,0,0,0.05)]">
          <span>{`${songs?.length} bài hát`}</span>
          <BsDot size={24} />
          <span>{moment.utc(totalDuration * 1000).format("HH:mm:ss")}</span>
        </span>
      )}
    </div>
  );
};

export default memo(ListSongs);
