import React from "react";
import { memo } from "react";
import moment from "moment";
import "moment/locale/vi";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
const SongItem = ({
  thumbnail,
  title,
  artists,
  sid,
  releaseDate,
  order,
  percent,
  style,
  size,
}) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(actions.setCurrentSongId(sid));
        dispatch(actions.play(true));
        dispatch(actions.setRecent({ thumbnail, title, artists, sid }));
      }}
      className={`w-full flex gap-3 justify-between items-center p-[10px]  rounded-md cursor-pointer ${
        style || "text-black hover:bg-main-200"
      }`}
    >
      <div className="flex gap-4 ">
        {order && (
          <span
            className={`${
              order === 1
                ? "text-shadow-no1"
                : order === 2
                ? "text-shadow-no2"
                : "text-shadow-no3"
            } text-[32px] text-[rgba(77,34,104,0.7)] flex items-center`}
          >
            {order}
          </span>
        )}
        <img
          src={thumbnail}
          alt="thumbnail"
          className={`${size || "w-[60px] h-[60px]"} object-cover rounded-md`}
        />

        <div className="flex flex-col ">
          <span className="text-sm font-semibold">
            {title?.length > 30 ? `${title.slice(0, 30)}...` : title}
          </span>
          <span className="text-xs opacity-70">
            {artists?.length > 30 ? `${title.slice(0, 30)}...` : artists}
          </span>
          {releaseDate && (
            <span className={`text-xs opacity-70`}>
              {moment(releaseDate * 1000).fromNow()}
            </span>
          )}
        </div>
      </div>
      {percent && <span className="font-bold">{`${percent}%`}</span>}
    </div>
  );
};

export default memo(SongItem);
