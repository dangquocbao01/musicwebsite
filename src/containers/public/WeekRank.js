import { React, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { RankList } from "../../components";
const notActiveStyle =
  "text-[22px] text-main-500 font-semi-bold py-[15px] uppercase";
const activeStyle =
  "text-[22px] text-main-500 font-semi-bold py-[15px] uppercase border-b-2 border-[#0E8080]";
const WeekRank = ({ weekChart }) => {
  const { pid } = useParams();
  console.log(weekChart);
  useEffect(() => {}, [pid]);

  return (
    <div>
      <div className="w-full"></div>
      <div className="relative">
        <div className="absolute top-0 bottom-1/2 left-0 right-0 flex  px-[60px] flex flex-col gap-4">
          <h3 className="font-bold text-[40px] mt-[90px] text-main-500">
            #Chart
          </h3>
          <div className="flex gap-8">
            {weekChart?.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeStyle : notActiveStyle
                }
                to={item?.link?.split(".")[0]}
                key={item?.chartId}
              >
                {item?.country === "vn"
                  ? "Việt Nam"
                  : item?.country === "us"
                  ? "US-UK"
                  : item?.country === "korea"
                  ? "K-Pop"
                  : ""}
              </NavLink>
            ))}
          </div>
          <div className="w-full pb-[100px]">
            <RankList
              data={
                weekChart?.find((item, index) => item?.link?.includes(pid))
                  ?.items
              }
              number={100}
              isHideBtn
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekRank;
