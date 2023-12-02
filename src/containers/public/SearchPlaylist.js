import { React, useEffect, useState } from "react";
import { apiGetArtist } from "../../apis";
import { useSelector } from "react-redux";
import { SectionItem } from "../../components";

const SearchPlaylist = () => {
  const [playlists, setPlaylists] = useState([]);
  const { searchData } = useSelector((state) => state.music);
  useEffect(() => {
    const fetch = async () => {
      const res = await apiGetArtist(searchData?.top?.alias);
      if (res.data.err === 0) {
        setPlaylists(res.data.data.sections[1]);
      }
    };
    fetch();
  }, [searchData]);

  return (
    <div className="w-full flex-col flex gap-8  px-[20px] lg:px-[44px]">
      <h3 className="px-[16px] font-bold text-lg">Playlist/Album</h3>
      <div className="flex flex-wrap items-start justify-start">
        {/* Check xem section có item hay không */}
        {playlists &&
          playlists?.items?.length > 0 &&
          playlists.items?.map((item) => (
            <SectionItem
              link={item.link}
              thumbnailM={item.thumbnailM}
              title={item.title}
              key={item.encodeId}
            />
          ))}
      </div>
    </div>
  );
};

export default SearchPlaylist;
