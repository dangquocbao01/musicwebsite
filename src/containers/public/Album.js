import { React, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import * as apis from "../../apis";
import moment from "moment";
import { ListSongs, AudioLoading } from "../../components";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import icons from "../../ultis/icons";
import axios from "axios";
const { BsFillPlayFill } = icons;
const Album = () => {
  const location = useLocation();
  const { pid } = useParams();
  const { isPlaying } = useSelector((state) => state.music);
  const [playlistData, setPlaylistData] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.setCurrentAlbumId(pid));
    const fetchDetailPlaylist = async () => {
      dispatch(actions.loading(true));
      const response = await apis.apiGetDetailPlaylist(pid);
      // console.log(response);

      dispatch(actions.loading(false));
      if (response?.data.err === 0) {
        setPlaylistData(response.data?.data);
        dispatch(actions.setPlaylist(response?.data?.data?.song?.items));
      }
    };

    fetchDetailPlaylist();
  }, [pid]);

  useEffect(() => {
    if (location.state?.playAlbum) {
      const randomSong =
        Math.round(Math.random() * playlistData?.song?.items.length) - 1;
      dispatch(
        actions.setCurrentSongId(
          playlistData?.song?.items[randomSong]?.encodeId
        )
      );
      dispatch(actions.play(true));
    }
  }, [pid, playlistData]);

  return (
    <>
      <div className="w-full h-[50px] md:h-[90px]"></div>
      <div className=" flex-col lg:flex-row flex gap-8 relative px-[10px] md:px-[60px] w-full h-full animate-scale-up-center">
        <div className="flex-none w-[100%]  self-center md:w-[50%] lg:w-1/4 lg:self-start  flex flex-col  items-center shadow-lg gap-1">
          <div className="w-full relative  ">
            <img
              src={playlistData?.thumbnailM}
              alt="thumbnail"
              className={`w-full object-contain shadow-md ${
                isPlaying
                  ? "rounded-full animate-rotate-center"
                  : "rounded-md animate-rotate-center-pause"
              }`}
            />
            <div
              className={` flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 hover:bg-overlay-30 ${
                isPlaying && "rounded-full"
              } text-white`}
            >
              <span className="p-3 border border-white rounded-full">
                {isPlaying ? <AudioLoading /> : <BsFillPlayFill size={30} />}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 ">
            <h3 className="text-[20px] font-bold text-gray-600">
              {playlistData?.title}
            </h3>
            <span className="flex gap-2 items-center text-gray-500 text-xs ">
              <span>Cập nhật</span>
              <span>
                {moment
                  .unix(playlistData?.contentLastUpdate)
                  .format("DD/MM/YYYY")}
              </span>
            </span>
            <span className="flex gap-2 items-center text-gray-500 text-xs text-center">
              {playlistData?.artistsNames}
            </span>
            <span className="flex gap-2 items-center text-gray-500 text-xs ">
              {`${Math.round(playlistData?.like / 1000)}K người yêu thích`}
            </span>
          </div>
        </div>

        <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
          <div className="flex-auto  mb-40 ">
            <span className="text-sm ">
              <span className="text-gray-600">Lời tựa: </span>
              <span className="text-base">{playlistData?.sortDescription}</span>
            </span>

            <ListSongs
              songs={playlistData?.song?.items}
              totalDuration={playlistData?.song?.totalDuration}
            />
          </div>
        </Scrollbars>
      </div>
    </>
  );
};

export default Album;
