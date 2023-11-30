import { React, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { NavLink, useSearchParams } from "react-router-dom";
import { searchMenu } from "../../ultis/menu";
import { useSelector } from "react-redux";
const notActiveStyle = "px-4 hover:text-main-500 font-semi-bold cursor-pointer";
const activeStyle =
  "px-4 hover:text-main-500 font-semi-bold cursor-pointer border-b-2 h-[52px] border-green-900 text-main-500 flex items-center";

const Search = () => {
  const { keyword } = useSelector((state) => state.music);
  return (
    <div className="w-full ">
      <div className="w-full h-[70px]"></div>
      <div className="flex h-[70px]  mb-7 items-center text-sm border-b border-gray-400 pb-1 pl-[60px]">
        <span className="text-[24px] font-bold  pr-6 border-r border-gray-400">
          Kết quả tìm kiếm
        </span>
        <div className="flex items-center">
          {searchMenu.map((item) => (
            <NavLink
              key={item.path}
              to={`${item.path}?q=${keyword.replace(" ", "+")}`}
              className={({ isActive }) =>
                isActive ? activeStyle : notActiveStyle
              }
            >
              {item.text}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="w-full">
        <Outlet />
      </div>
      <div className="w-full h-[120px]"></div>
    </div>
  );
};

export default Search;
