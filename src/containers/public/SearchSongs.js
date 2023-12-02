import { React, useEffect } from "react";
import { ListSongs, ListItem, songs } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import Scrollbars from "react-custom-scrollbars-2";
const SearchSongs = () => {
  const { searchData } = useSelector((state) => state.music);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getSearchSongs(searchData?.top?.id));
  }, [searchData]);

  return (
    <div className="w-full px-[10px] lg:px-[60px] ">
      <ListSongs isHideTime />
    </div>
  );
};

export default SearchSongs;
