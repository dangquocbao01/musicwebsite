import React, { memo } from "react";
import icons from "../ultis/icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";

const { BsMusicNoteBeamed } = icons;

const ListItem = ({
  songData,
  isHideAlbum,
  isHideNode,
  order,
  isWeekChart,
}) => {
  const dispatch = useDispatch();

  return (
    <div
      className="flex justify-between items-center p-[10px] border-t border-[rgba(0,0,0,0.05)] hover:bg-[#DDE4E4] cursor-pointer"
      onClick={() => {
        dispatch(actions.setCurrentSongId(songData?.encodeId));
        dispatch(actions.play(true));
        dispatch(actions.playAlbum(true));
        dispatch(
          actions.setRecent({
            thumbnail: songData?.thumbnail,
            title: songData?.title,
            artists: songData?.artistsNames,
            sid: songData?.encodeId,
          })
        );
      }}
    >
      <div
        className={`${
          isHideAlbum ? "flex-auto" : " flex-1"
        } flex items-center gap-3`}
      >
        {order && (
          <div
            className={`${
              order === 1
                ? "text-shadow-no1"
                : order === 2
                ? "text-shadow-no2"
                : order === 3
                ? "text-shadow-no3"
                : "text-shadow-rest"
            } text-[32px] text-main-300 justify-center items-center flex flex-none w-[10%]`}
          >
            {order}
          </div>
        )}
        {!isHideNode && (
          <span>
            <BsMusicNoteBeamed />
          </span>
        )}
        <img
          src={songData?.thumbnail}
          alt="thumbnail"
          className="w-10 h-[40px] object-cover rounded-md"
        />
        <span className="flex flex-col w-full">
          <span className="text-sm font-semibold ">
            {songData?.title?.length > 30
              ? `${songData?.title?.slice(0, 30)}...`
              : songData?.title}
          </span>

          <span className="text-xs opacity-70 ">{songData?.artistsNames}</span>
        </span>
      </div>
      {!isHideAlbum && (
        <div className="flex flex-1 items-center justify-center text-xs">
          {songData?.album?.title?.length > 30
            ? `${songData?.album?.title?.slice(0, 30)}...`
            : songData?.album?.title}
          {}
        </div>
      )}
      <div className="flex flex-1 justify-end group relative text-xs">
        <span className="visible group-hover:invisible">
          {/* <span className=""> */}
          {moment.utc(songData?.duration * 1000).format("mm:ss")}
        </span>
        <span className=" absolute invisible group-hover:visible">Add</span>
      </div>
    </div>
  );
};

export default memo(ListItem);
