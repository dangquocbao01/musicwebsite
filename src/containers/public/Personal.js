import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import { ListItem, ListSongs, SongItem } from "../../components";
const Personal = () => {
  const { personalSongs } = useSelector((state) => state.music);
  const { currentWidth } = useSelector((state) => state.app);
  const { isPlaying } = useSelector((state) => state.music);
  console.log(personalSongs);
  return (
    // <div className="w-full px-[60px] ">
    //   <div className="w-full h-[90px]"></div>

    //   <div className="w-full flex flex-col">
    //     <div className="flex justify-between items-center   p-[10px] font-semibold">
    //       <span className=" flex-auto font-bold text-lg ">BÀI HÁT</span>
    //       <span className="hidden lg:block flex-1 ">ALBUM</span>
    //       <span className="flex justify-end">THỜI GIAN</span>
    //     </div>
    //     <div className="flex flex-col ">
    //       {personalSongs?.map((item, index) => (
    //         <ListItem key={item.sid} songData={item} albumPersonal />
    //       ))}
    //     </div>
    //   </div>
    // </div>

    <>
      <div className="w-full h-[50px] md:h-[90px]"></div>
      <div className="w-full ">
        <img
          src="https://s3.amazonaws.com/thumbnails.venngage.com/template/21a87cb7-ef87-4c03-948a-7a2b977efbbd.png"
          alt="img"
          className="w-full"
        />
      </div>
      <div className=" flex-col  flex gap-8  px-[10px] md:px-[20px] lg:px-[60px] w-full h-full ">
        <div className="w-full flex flex-col text-xs text-gray-600  ">
          <div className="flex justify-between items-center  p-[10px] font-semibold">
            <span className={"font-bold text-lg"}>BÀI HÁT</span>
            {
              <span className="hidden lg:block                                        ">
                ALBUM
              </span>
            }
            {<span>THỜI GIAN</span>}
          </div>
          <div className="flex flex-col ">
            {personalSongs?.map((item, index) => (
              <ListItem key={item.encodeId} songData={item} albumPersonal />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Personal;
