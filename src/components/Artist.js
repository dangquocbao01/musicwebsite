import { React, useState, memo, useEffect } from "react";
import { handleNumber } from "../ultis/fn";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AiOutlineCheck } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import { forEach } from "lodash";

const Artist = ({ artistId, image, title, follower, link }) => {
  const [isHover, setIsHover] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const dispatch = useDispatch();
  const { followArtists } = useSelector((state) => state.music);

  useEffect(() => {
    followArtists.forEach((item) => {
      if (item?.artistId === artistId) {
        setIsFollow(true);
      }
    });
  }, []);

  console.log(followArtists);
  return (
    <div className="flex w-[40%] lg:w-1/5 flex-col gap-2  lg:gap-[15px]">
      <Link
        to={link}
        className="relative overflow-hidden rounded-full cursor-pointer"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <img
          src={image}
          alt="singer"
          className={`w-full object-contain rounded-full ${
            isHover ? "animate-scale-up-image" : "animate-scale-down-image"
          }`}
        />
        {isHover && (
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-overlay-30 rounded-full"></div>
        )}
      </Link>

      <div className="flex gap-1 flex-col items-center">
        <Link
          to={link}
          className="text-sm font-medium hover:underline hover:text-main-500"
        >
          {title}
        </Link>
        <span className="text-xs opacity-70">{`${handleNumber(
          follower
        )} quan tâm`}</span>
        {isFollow ? (
          <button
            onClick={() => {
              setIsFollow(!isFollow);
              dispatch(actions.setRemoveFollowArtist({ title, artistId }));
            }}
            type="button"
            className="bg-gray-500 px-2 md:px-4 md:py-1 text-white text-sm rounded-l-full rounded-r-full flex items-center justify-center gap-1"
          >
            <span>
              <AiOutlineCheck />
            </span>
            <span className="uppercase text-[8px] md:text-xs ">
              Đã quan tâm
            </span>
          </button>
        ) : (
          <button
            onClick={() => {
              setIsFollow(!isFollow);
              dispatch(actions.setFollowArtist({ title, artistId }));
            }}
            type="button"
            className="bg-main-500 px-2 md:px-4 py-1 text-white text-sm rounded-l-full rounded-r-full flex items-center justify-center gap-1"
          >
            <span>
              <AiOutlineUserAdd />
            </span>
            <span className="uppercase text-[8px] md:text-xs ">Quan tâm</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(Artist);
