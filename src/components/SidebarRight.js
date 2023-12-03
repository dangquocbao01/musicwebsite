import { React, useState, useEffect } from "react";
import icons from "../ultis/icons";
import { useDispatch, useSelector } from "react-redux";
import SongItem from "./SongItem";
import { apiGetDetailPlaylist } from "../apis";
import { Scrollbars } from "react-custom-scrollbars-2";

import * as actions from "../store/actions";
const { BsTrash } = icons;
const SidebarRight = () => {
  const [isRecent, setIsRecent] = useState(false);
  const [playlist, setPlaylist] = useState();
  const dispatch = useDispatch();
  const {
    currentSongData,
    currentAlbumId,
    isPlaying,
    recentSongs,
    currentSongId,
  } = useSelector((state) => state.music);
  // console.log(currentSongData);
  const fetchDetailPlaylist = async () => {
    const response = await apiGetDetailPlaylist(currentAlbumId);
    if (response.data?.err === 0) setPlaylist(response.data.data?.song?.items);
  };
  useEffect(() => {
    currentAlbumId && fetchDetailPlaylist();
  }, []);
  useEffect(() => {
    if (currentAlbumId && isPlaying) fetchDetailPlaylist();
  }, [currentAlbumId, isPlaying]);

  useEffect(() => {
    isPlaying && setIsRecent(false);
  }, [isPlaying, currentSongId]);

  return (
    <div className="bg-[#DDE4E4] w-full flex flex-col text-xs h-full">
      <div className="h-[70px] w-full flex-none py-[14px] gap-4 items-center justify-between  flex px-2">
        <div className="flex flex-auto  justify-center bg-main-300  rounded-l-full rounded-r-full py-[6px] px-[6px] cursor-pointer">
          <span
            onClick={() => setIsRecent((prev) => !prev)}
            className={`${
              !isRecent && "bg-main-200"
            } py-[4px]  flex-1 flex justify-center rounded-l-full rounded-r-full items-center`}
          >
            Danh sách phát
          </span>
          <span
            onClick={() => setIsRecent((prev) => !prev)}
            className={`${
              isRecent && "bg-main-200"
            } py-[4px]  flex-1 flex justify-center rounded-l-full rounded-r-full items-center`}
          >
            Nghe gần đây
          </span>
        </div>

        <span
          onClick={() => dispatch(actions.setRemoveRecent())}
          className="p-1 rounded-full hover:bg-main-100 cursor-pointer"
        >
          <BsTrash size={18} />
        </span>
      </div>
      {isRecent ? (
        <div className=" w-full  flex flex-col flex-auto px-2">
          <Scrollbars style={{ with: "100%", height: "100%" }}>
            {recentSongs && (
              <div>
                {recentSongs?.map((item) => (
                  <SongItem
                    key={item?.sid}
                    thumbnail={item?.thumbnail}
                    title={item?.title}
                    artists={item?.artists}
                    sid={item?.sid}
                    size="w-[40px] h-[40px]"
                  />
                ))}
              </div>
            )}
          </Scrollbars>
        </div>
      ) : (
        <div className=" w-full  flex flex-col flex-auto px-2">
          {currentSongData && (
            <SongItem
              key={currentSongData?.encodeId}
              thumbnail={currentSongData?.thumbnail}
              title={currentSongData?.title}
              artists={currentSongData?.artistsNames}
              sid={currentSongData?.encodeId}
              size="w-[40px] h-[40px]"
              style="bg-main-500 text-white"
            />
          )}

          <div className="flex flex-col text-black pt-[15px] px-2 pb-[5px]">
            <span className=" text-sm font-bold ">Tiếp theo</span>
            <span className="opacity-70 text-xs flex gap-1">
              <span>Từ playlist:</span>
              <span className="font-bold text-main-500">
                {currentSongData?.album?.title.length > 30
                  ? `${currentSongData?.album?.title.slice(0, 30)}...`
                  : currentSongData?.album?.title}
              </span>
            </span>
          </div>

          {playlist && (
            <Scrollbars style={{ with: "100%", height: "100%" }}>
              <div className="flex flex-col">
                {playlist?.map((item) => (
                  <SongItem
                    key={item?.encodeId}
                    thumbnail={item?.thumbnail}
                    title={item?.title}
                    artists={item?.artistsNames}
                    sid={item?.encodeId}
                    size={"w-[40px] h-[40px]"}
                  />
                ))}
              </div>
            </Scrollbars>
          )}
        </div>
      )}

      <div className="w-full h-[90px]"></div>
    </div>
  );
};

export default SidebarRight;
