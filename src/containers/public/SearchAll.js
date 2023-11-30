import React from "react";
import { useSelector } from "react-redux";
import { handleNumber } from "../../ultis/fn";
import { SongItem, ListItem, SectionItem, Artist } from "../../components";
import { Link } from "react-router-dom";
const SearchAll = () => {
  const { searchData } = useSelector((state) => state.music);

  return (
    <div className="w-full flex flex-col px-[60px] gap-[60px]">
      <div className="flex flex-col">
        <h3 className="text-lg font-bold mb-5"> Nổi bật </h3>
        <div>
          <div className=" flex gap-8">
            {searchData?.top && (
              <Link
                to={searchData.artists[0].link}
                className="flex-1 p-[10px]  cursor-pointer bg-main-200 rounded-md flex gap-8 items-center "
              >
                <img
                  src={searchData?.top?.thumbnail}
                  alt="avatar"
                  className={`w-[84px] h-[84px] object-cover ${
                    searchData?.top?.objectType === "artist" && "rounded-full"
                  }`}
                />
                <div className="flex flex-col text-xs">
                  <span className="mb-[6px]">
                    {searchData?.top?.objectType === "artist" ? "Nghệ  sĩ" : ""}
                  </span>
                  <span className="text-sm font-semibold">
                    {searchData?.top?.title || searchData?.top.name}
                  </span>
                  {searchData?.top?.objectType === "artist" && (
                    <span>
                      {handleNumber(searchData?.artists[0]?.totalFollow) +
                        ` quan tâm`}
                    </span>
                  )}
                </div>
              </Link>
            )}
            {searchData?.songs
              ?.filter((item, index) =>
                [...Array(2).keys()].some((item) => item === index)
              )
              ?.map((item) => (
                <div key={item.encodeId} className="flex-1">
                  <SongItem
                    thumbnail={item.thumbnail}
                    sid={item.encodeId}
                    title={item.title}
                    artists={item.artistsNames}
                    size="w-[84px] h-[84px]"
                    style="bg-main-200"
                  />
                </div>
              ))}
            {/* {searchData?.songs &&
              searchData?.songs?.length > 0 &&
              //filter mảng có 5 phần tử rồi mới map
              searchData?.songs
                ?.filter((item, index) => index <= 1)
                ?.map((item) => (
                  <div key={item.encodeId} className="flex-1">
                    song 1
                  </div>
                ))} */}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <h3 className="text-lg font-bold mb-5"> Bài hát </h3>
        <div className="flex justify-between flex-wrap w-full ">
          {searchData?.songs?.map((item, index) => (
            <div
              key={item.encodeId}
              className={`flex-auto w-[45%] ${
                index % 2 !== 0 ? "pl-4" : "pr-4"
              }`}
            >
              <ListItem songData={item} isHideAlbum isHideNode />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full">
        <h3 className="text-lg font-bold mb-5"> Playlist/Album </h3>
        <div className="flex items-start justify-between gap-[28px] ">
          {searchData?.playlists
            ?.filter((item, index) => index <= 4)
            .map((item, index) => (
              <SectionItem
                key={item.encodeId}
                link={item.link}
                thumbnailM={item.thumbnailM}
                sortDescription={item.sortDescription}
                title={item.title}
              />
            ))}
        </div>
      </div>

      <div className="flex flex-col w-full">
        <h3 className="text-lg font-bold mb-5"> Nghệ sĩ </h3>
        <div className="flex items-start  gap-[28px] ">
          {searchData?.artists
            ?.filter((item, index) => index <= 4)
            .map((item, index) => (
              <Artist
                key={item.id}
                title={item.name}
                image={item.thumbnailM}
                follower={item.totalFollow}
                link={item.link}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchAll;
