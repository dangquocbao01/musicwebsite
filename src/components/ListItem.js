import React, { memo } from "react";
import icons from "../ultis/icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { TiDeleteOutline } from "react-icons/ti";
import { toast } from "react-toastify";
const { BsMusicNoteBeamed } = icons;

const ListItem = ({
  songData,
  isHideAlbum,
  isHideNode,
  order,
  albumPersonal,
  addBtn,
}) => {
  const dispatch = useDispatch();

  const { currentWidth } = useSelector((state) => state.app);

  return (
    <div className="flex group justify-between items-center p-[10px] border-t border-[rgba(0,0,0,0.05)] hover:bg-[#DDE4E4] ">
      <div
        className={`${
          isHideAlbum ? "flex-auto" : " md:flex-1"
        } flex items-center gap-3 flex-auto`}
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
          src={songData?.thumbnail}
          alt="thumbnail"
          className="w-10 h-[40px] object-cover rounded-md cursor-pointer"
        />
        <span className="flex flex-col w-full ">
          <span className="text-sm font-semibold  ">
            {songData?.title?.length > 30
              ? `${songData?.title?.slice(0, 30)}...`
              : songData?.title}
          </span>

          {/* <Link
            to={songData?.artists && songData?.artists[0]?.link}
            // to={songData?.artists?.forEach((item) => item.link)}
            className="text-xs opacity-70 cursor-pointer "
          >
            {songData?.artistsNames}
          </Link> */}
          <span className="text-xs opacity-70 cursor-pointer ">
            {songData?.artists?.map((item) => (
              <Link to={item?.link} key={item?.id}>
                {`${item?.name} .`}
              </Link>
            ))}
          </span>
        </span>
      </div>
      {/* {!isHideAlbum && (
        <div className="hidden lg:flex  flex-1 items-center justify-center text-xs">
          {songData?.album?.title?.length > 30
            ? `${songData?.album?.title?.slice(0, 30)}...`
            : songData?.album?.title}
          {}
        </div>
      )} */}

      {!isHideAlbum && songData?.album ? (
        <div className="hidden lg:flex  flex-1 items-center justify-center text-xs">
          {songData?.album?.title?.length > 30
            ? `${songData?.album?.title?.slice(0, 30)}...`
            : songData?.album?.title}
          {}
        </div>
      ) : albumPersonal ? (
        <div className="hidden lg:flex  flex-1 items-center justify-center text-xs">
          {songData?.title?.length > 30
            ? `${songData?.title?.slice(0, 30)}...`
            : songData?.title}
        </div>
      ) : (
        !isHideAlbum && (
          <div className="hidden lg:flex  flex-1 items-center justify-center text-xs">
            {songData?.album?.title?.length > 30
              ? `${songData?.album?.title?.slice(0, 30)}...`
              : songData?.album?.title}
            {}
          </div>
        )
      )}
      {/* {albumPersonal && (
        <div className="hidden lg:flex  flex-1 items-center justify-center text-xs">
          {songData?.title?.length > 30
            ? `${songData?.title?.slice(0, 30)}...`
            : songData?.title}
          {}
        </div>
      )} */}
      <div className="flex flex-1  justify-end  relative text-xs items-center">
        <span className="visible group-hover:invisible">
          {/* <span className=""> */}
          {songData?.duration &&
            moment.utc(songData?.duration * 1000).format("mm:ss")}
        </span>
        {addBtn ? (
          <span
            onClick={() => {
              toast.success("Đã thêm vào 'Nhạc cá nhân' ");
              dispatch(
                actions.setPersonalSong({
                  thumbnail: songData?.thumbnail,
                  title: songData?.title,
                  artistsNames: songData?.artistsNames,
                  encodeId: songData?.encodeId,
                  duration: songData?.duration,
                  artists: songData?.artists,
                })
              );
            }}
            className=" absolute invisible group-hover:visible cursor-pointer  justify-end text-3xl hover:text-green-700"
          >
            <CiCirclePlus />
          </span>
        ) : (
          <span
            onClick={() => {
              toast.error("Đã xoá bài hát khỏi 'Nhạc cá nhân'");

              dispatch(
                actions.setDeletePersonalSong({ encodeId: songData?.encodeId })
              );
            }}
            className=" absolute invisible group-hover:visible cursor-pointer  justify-end text-3xl hover:text-red-500"
          >
            <TiDeleteOutline />
          </span>
        )}
      </div>
    </div>
  );
};

export default memo(ListItem);
