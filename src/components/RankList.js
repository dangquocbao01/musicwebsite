import { React, useState, useEffect } from "react";
import ListItem from "./ListItem";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import path from "../ultis/path";
const RankList = ({
  data,
  number,
  link,
  isWeekChart,
  isHideAlbum,
  isHideBtn,
}) => {
  const [isShowFull, setIsShowFull] = useState(false);
  const [songs, setSongs] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isShowFull) {
      setSongs(data?.filter((item, index) => index < number));
    } else {
      setSongs(data);
    }
  }, [isShowFull, data]);
  return (
    <div className="w-full">
      {songs?.map((item, index) => (
        <ListItem
          songData={item}
          key={item.encodeId}
          isHideNode
          // isWeekChart={isWeekChart}
          isHideAlbum={isHideAlbum}
          order={index + 1}
          addBtn
        />
      ))}
      <div className="flex w-full justify-center items-center mb-8">
        {!isHideBtn && (
          <button
            onClick={() =>
              link ? navigate(link.split(".")[0]) : setIsShowFull(!isShowFull)
            }
            type="button"
            className="px-4 py-2 border border-[#0E8080] rounded-l-full rounded-r-full text-sm text-main-500 hover:text-white hover:bg-main-500"
          >
            {isShowFull ? "Ẩn bớt" : "Xem tất cả"}
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(RankList);
