import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as apis from "../apis";
import icons from "../ultis/icons";
import * as actions from "../store/actions";
import { toast } from "react-toastify";
import moment from "moment";
import LoadingSong from "./LoadingSong";
const {
  SlVolume1,
  SlVolume2,
  SlVolumeOff,
  BsMusicNoteList,
  AiFillHeart,
  AiOutlineHeart,
  BsThreeDots,
  MdSkipNext,
  MdSkipPrevious,
  CiRepeat,
  CiShuffle,
  BsPauseFill,
  BsFillPlayFill,
  TbRepeatOnce,
} = icons;
var intervalId;
const Player = ({ setIsShowRightSidebar }) => {
  const [audio, setAudio] = useState(new Audio());
  const { currentSongId, isPlaying, songs, recentSongs } = useSelector(
    (state) => state.music
  );
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLoadedSource, setIsLoadedSource] = useState(true);
  const [repeatMode, setRepeatMode] = useState(0);
  const [songInfo, setSongInfo] = useState(null);
  const [curSeconds, setCurSeconds] = useState(0);
  const thumbRef = useRef();
  const trackRef = useRef();
  const volumeRef = useRef();
  const dispatch = useDispatch();
  const [volume, setVolume] = useState(100);
  const [isHoverVolume, setIsHoverVolume] = useState(false);

  useEffect(() => {
    const fetchDetailSong = async () => {
      //giai đoạn loading detail song
      setIsLoadedSource(false);
      const [res1, res2] = await Promise.all([
        apis.apiGetDetailSong(currentSongId),
        apis.apiGetSong(currentSongId),
      ]);
      //Kết thúc loading detail song và get dc response
      setIsLoadedSource(true);
      if (res1.data.err === 0) {
        setSongInfo(res1.data.data);
        dispatch(actions.setCurrentSongData(res1.data.data));
      }
      if (res2.data.err === 0) {
        audio.pause();
        setAudio(new Audio(res2.data.data["128"]));
      } else {
        audio.pause();
        setAudio(new Audio());
        dispatch(actions.play(false));
        toast.warn(res2.data.msg);
        setCurSeconds(0);
        thumbRef.current.style.cssText = `right: 100%`;
      }
    };

    fetchDetailSong();
  }, [currentSongId]);

  // const play = async () => {
  //   await audio.play();
  // };
  useEffect(() => {
    intervalId && clearInterval(intervalId);
    audio.pause();
    audio.load();
    if (isPlaying && thumbRef.current) {
      audio.play();
      // const thumbEl = document.getElementById("thumb-progress");
      intervalId = setInterval(() => {
        let percent =
          Math.round((audio.currentTime * 10000) / songInfo.duration) / 100;
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        setCurSeconds(Math.round(audio.currentTime));
      }, 200);
    }
  }, [audio]);

  useEffect(() => {
    const handleEnded = () => {
      if (isShuffle) {
        handleShuffle();
      } else if (repeatMode) {
        repeatMode === 1 ? handleRepeatOne() : handleNextSong();
      } else {
        audio.pause();
        dispatch(actions.play(false));
      }
    };
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audio, isShuffle, repeatMode]);
  useEffect(() => {
    audio.volume = volume / 100;
  }, [volume]);
  useEffect(() => {
    if (volumeRef.current) {
      volumeRef.current.style.cssText = `right:${100 - volume}%`;
    }
  }, [volume]);
  const handleTogglePlayMusic = async () => {
    if (isPlaying) {
      audio.pause();
      dispatch(actions.play(false));
    } else {
      audio.play();
      dispatch(actions.play(true));
    }
  };
  const handleClickProgressBar = (e) => {
    const trackRect = trackRef.current.getBoundingClientRect();
    const percent =
      Math.round(((e.clientX - trackRect.left) * 10000) / trackRect.width) /
      100;
    thumbRef.current.style.cssText = `right: ${100 - percent}%`;
    audio.currentTime = (percent * songInfo.duration) / 100;
    setCurSeconds(Math.round((percent * songInfo.duration) / 100));
  };

  const handleNextSong = () => {
    if (songs) {
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item.encodeId === currentSongId) currentSongIndex = index;
      });
      dispatch(actions.setCurrentSongId(songs[currentSongIndex + 1].encodeId));
      dispatch(actions.play(true));
    }
    // if (recentSongs) {
    //   let recentSongIndex;
    //   recentSongs?.forEach((item, index) => {
    //     if (item.sid === currentSongId) recentSongIndex = index;
    //   });
    //   dispatch(actions.setCurrentSongId(recentSongs[recentSongIndex + 1].sid));
    //   dispatch(actions.play(true));
    // }
  };
  const handlePrevSong = () => {
    if (songs) {
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item.encodeId === currentSongId) currentSongIndex = index;
      });
      dispatch(actions.setCurrentSongId(songs[currentSongIndex - 1].encodeId));
      dispatch(actions.play(true));
    }
  };

  const handleShuffle = () => {
    const randomIndex = Math.round(Math.random() * songs?.length - 1);
    dispatch(actions.setCurrentSongId(songs[randomIndex].encodeId));
    dispatch(actions.play(true));
  };

  const handleRepeatOne = () => {
    audio.play();
  };

  return (
    <div className="bg-main-400 px-2 md:px-5 h-full flex ">
      {/* first div */}
      <div className=" w-[70%] md:w-[30%] gap-4 flex flex-auto  items-center ">
        <img
          src={songInfo?.thumbnail}
          alt="thumbnail"
          className="w-16 h-16 object-cover rounded-md"
        />
        <div className="flex flex-col gap-2">
          <span className=" font-semibold text-gray-700 text-sm">
            {songInfo?.title}
          </span>
          <span className="text-sm text-gray-500">
            {songInfo?.artistsNames}
          </span>
        </div>

        <div className="flex gap-4 pl-2">
          <span>
            <AiOutlineHeart size={16} />
          </span>
          <span className="hidden md:flex">
            <BsThreeDots />
          </span>
        </div>
      </div>
      {/* second div */}
      <div className="w-[50%] md:w-[40%] flex flex-col items-center  justify-center flex-auto   py-2 gap-2 ">
        <div className="flex gap-8 justify-center items-center">
          <span
            onClick={() => setIsShuffle((prev) => !prev)}
            className={`cursor-pointer hidden md:flex ${
              isShuffle ? "text-purple-600" : "text-black"
            }`}
            title="Bật phát ngẫu nhiên"
          >
            <CiShuffle size={24} />
          </span>
          <span
            onClick={handlePrevSong}
            className={`${!songs ? "text-gray-500" : "cursor-pointer"}`}
          >
            <MdSkipPrevious size={24} />
          </span>
          <span
            className="p-1 border border-gray-700 cursor-pointer hover:text-main-500 rounded-full"
            onClick={handleTogglePlayMusic}
          >
            {!isLoadedSource ? (
              <LoadingSong />
            ) : isPlaying ? (
              <BsPauseFill size={30} />
            ) : (
              <BsFillPlayFill size={30} />
            )}
          </span>
          <span
            onClick={handleNextSong}
            className={`${!songs ? "text-gray-500" : "cursor-pointer"}`}
          >
            <MdSkipNext size={24} />
          </span>

          <span
            onClick={() => setRepeatMode((prev) => (prev === 2 ? 0 : prev + 1))}
            className={`cursor-pointer ${
              repeatMode && "text-purple-600"
            } hidden md:flex`}
            title="Bật phát lại tất cả"
          >
            {repeatMode === 1 ? (
              <TbRepeatOnce size={24} />
            ) : (
              <CiRepeat size={24} />
            )}
          </span>
        </div>
        <div className="w-full hidden md:flex justify-center items-center gap-3 text-xs">
          <span className="">
            {moment.utc(curSeconds * 1000).format("mm:ss")}
          </span>
          <div
            ref={trackRef}
            onClick={handleClickProgressBar}
            className="bg-[rgba(0,0,0,0.1)] relative  h-[3px] w-4/5 rounded-l-full rounded-r-full hover:h-[6px] cursor-pointer"
          >
            <div
              ref={thumbRef}
              id="thumb-progress"
              className="bg-[#0e8080]  absolute bottom-0 top-0 left-0  rounded-l-full rounded-r-full"
            ></div>
          </div>
          <span> {moment.utc(songInfo?.duration * 1000).format("mm:ss")}</span>
        </div>
      </div>
      {/* third div */}
      <div className="w-[30%] hidden  flex-auto min-[840px]:flex items-center justify-end gap-4   ">
        <div
          onMouseEnter={() => setIsHoverVolume(true)}
          onMouseLeave={() => setIsHoverVolume(false)}
          className="flex gap-2 items-center"
        >
          <span onClick={() => setVolume((prev) => (+prev === 0 ? 70 : 0))}>
            {/* Thêm dấu cộng để biến value volume từ chuỗi thành số để compare với số */}
            {+volume >= 50 ? (
              <SlVolume2 />
            ) : +volume === 0 ? (
              <SlVolumeOff />
            ) : (
              <SlVolume1 />
            )}
          </span>

          <div
            className={`w-[130px] h-1 bg-white rounded-l-full rounded-r-full ${
              isHoverVolume ? "hidden" : "relative"
            }`}
          >
            <div
              ref={volumeRef}
              className="absolute left-0  bottom-0 top-0 bg-main-500 rounded-l-full rounded-r-full"
            ></div>
          </div>

          <input
            type="range"
            step={1}
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className={`w-[130px]  ${isHoverVolume ? "flex" : "hidden"}`}
          />
        </div>
        <span
          onClick={() => setIsShowRightSidebar((prev) => !prev)}
          className="p-1 rounded-sm cursor-pointer bg-main-500 opacity-90 hover:opacity-100"
        >
          <BsMusicNoteList size={20} />
        </span>
      </div>
    </div>
  );
};

export default Player;
