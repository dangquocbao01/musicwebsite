import Search from "./Search";
import React from "react";
import icons from "../ultis/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const { AiOutlineRight, AiOutlineLeft, AiOutlineSearch } = icons;

const Header = () => {
  const navigate = useNavigate();
  const { singer } = useParams();
  return (
    <div className="flex  items-center justify-between w-full ]">
      <div className="flex items-center gap-6 w-full">
        <div
          className={`flex gap-6 ${
            singer ? "text-gray-200" : "text-gray-400"
          } cursor-pointer`}
        >
          <span onClick={() => navigate(-1)}>
            <AiOutlineLeft size={24} />
          </span>
          <span onClick={() => navigate(1)}>
            <AiOutlineRight size={24} />
          </span>
        </div>

        <div className="w-1/2">
          <Search />
        </div>
      </div>

      <div>login</div>
    </div>
  );
};

export default Header;
