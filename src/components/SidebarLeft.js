import React from "react";
import logo from "../assests/logo.svg";
import { sidebarMenu } from "../ultis/menu";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import path from "../ultis/path";
const notActiveStyle =
  "py-2 px-[25px] text-[#32323D] text-[13px] font-bold flex gap-3 items-center";
const activeStyle =
  "py-2 px-[25px] text-[#388888] text-[13px] bg-[#E7EDED] border-[#0E8080] border-l-4 font-bold flex gap-3 items-center";
const SidebarLeft = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col bg-main-200 h-full">
      <div
        onClick={() => navigate(path.HOME)}
        className="w-full h-[70px]  min-[1024px]:px-[25px] min-[1024px]:py-[15px] flex justify-start items-center cursor-pointer"
      >
        <img
          src={logo}
          alt="logo"
          className="w-[120px] h-[40px] min-[1024px]:block hidden"
        />
        <img
          src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.105/static/media/icon_zing_mp3_60.f6b51045.svg"
          alt="logo"
          className="w-[95px] h-[45px] min-[1024px]:hidden  "
        />
      </div>

      <div className="flex flex-col">
        {sidebarMenu.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            end={item.end}
            className={({ isActive }) =>
              isActive ? activeStyle : notActiveStyle
            }
          >
            {item.icons}
            <span className="min-[1024px]:inline  hidden"> {item.text}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SidebarLeft;
