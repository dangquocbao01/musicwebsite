import { React, useState, useEffect } from "react";
import icons from "../ultis/icons";
import { apiSearch } from "../apis";
import * as actions from "../store/actions";
import { useDispatch } from "react-redux";
import { useNavigate, createSearchParams, useParams } from "react-router-dom";
import path from "../ultis/path";
import { AiOutlineClose } from "react-icons/ai";

const { AiOutlineSearch } = icons;
const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { singer } = useParams();
  const [keyword, setKeyword] = useState("");

  const handleSearch = async (e) => {
    if (e.keyCode === 13) {
      dispatch(actions.search(keyword));
      navigate({
        pathname: `/${path.SEARCH}/${path.ALL}`,
        search: createSearchParams({
          q: keyword,
        }).toString(),
      });
    }
  };
  return (
    <div className="w-full flex-col md:flex-row relative flex items-center   ">
      {keyword && (
        <span
          onClick={() => setKeyword("")}
          className="absolute right-[10px] max-[770px]:top-[8px] md:right-[16px] cursor-pointer "
        >
          <AiOutlineClose />
        </span>
      )}

      <span
        className={` ${
          singer ? "bg-[rgba(0,0,0,0.2)] text-white" : ""
        } hidden md:flex  h-10 pl-4 flex items-center text-gray-500 bg-[#DDE4E4]  rounded-l-[20px]`}
      >
        <AiOutlineSearch size={24} />
      </span>
      <input
        type="text"
        className={` ${
          singer
            ? "bg-[rgba(0,0,0,0.2)] text-white placeholder:text-gray-100"
            : ""
        } outline-none bg-[#DDE4E4] px-4 py-2 rounded-l-[10px] rounded-r-[10px] md:rounded-l-[0px] md:rounded-r-[20px] md:h-[40px] w-full text-gray-500 text-xs   h-[30px] max-[800px]:text-center`}
        placeholder="Tìm kiếm bài hát/ nghệ sĩ tại đây"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyUp={handleSearch}
      ></input>
    </div>
  );
};

export default Search;
