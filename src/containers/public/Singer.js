import { React, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { apiGetArtist } from "../../apis";
import { AiOutlineUserAdd } from "react-icons/ai";
import icons from "../../ultis/icons";
import { SongItem, Section, Artist } from "../../components";
import { useSelector } from "react-redux";
const { BsFillPlayFill } = icons;
const Singer = () => {
  const ref = useRef();
  const { singer } = useParams();
  const [artistData, setArtistData] = useState(null);
  const [isHoverPlay, setIsHoverPlay] = useState(false);
  const { scrollTop } = useSelector((state) => state.app);
  useEffect(() => {
    const fetchArtistData = async () => {
      const res = await apiGetArtist(singer);
      if (res.data.err === 0) {
        setArtistData(res.data.data);
      }
    };
    singer && fetchArtistData();
  }, [singer]);
  // console.log(artistData);
  useEffect(() => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [singer]);
  return (
    <div className="flex flex-col w-full] ">
      <div ref={ref} className="relative">
        <img
          src={artistData?.cover}
          alt="artist-background"
          className="h-[400px] object-cover w-full "
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent px-[60px] text-white">
          <div className="absolute bottom-0 pb-6 ">
            <div className="flex  gap-8 items-center">
              <h1 className="text-[60px] font-bold">{artistData?.name}</h1>
              <span
                onMouseEnter={() => setIsHoverPlay(true)}
                onMouseLeave={() => setIsHoverPlay(false)}
                className="relative p-2 rounded-full bg-white text-main-500 hover:text-gray-100 cursor-pointer "
              >
                <div className="w-8 h-8"></div>
                {isHoverPlay && (
                  <span className="absolute top-[-1px] left-[-1px] bottom-[-1px] right-[-1px] bg-main-500 rounded-full animate-scale-up-center  "></span>
                )}
                <div className="absolute p-2 top-0 left-0 bottom-0 right-0 z-50">
                  <BsFillPlayFill size={32} />
                </div>
              </span>
            </div>
            <div className="flex gap-4 items-center mt-4">
              <span className="text-sm text-gray-300">
                {`${Number(
                  artistData?.totalFollow.toFixed(1)
                ).toLocaleString()} người quan tâm`}{" "}
              </span>
              <button
                type="button"
                className="bg-main-500 px-4 py-1 text-white text-sm rounded-l-full rounded-r-full flex items-center justify-center gap-1"
              >
                <span>
                  <AiOutlineUserAdd />
                </span>
                <span className="uppercase text-xs opacity-90">Quan tâm</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Artist info */}
      <div className="px-[60px] mt-12 ">
        <h3 className="text-lg font-bold mb-5">{`Về ${artistData?.name}`}</h3>
        <div className="flex gap-8">
          <img
            src={artistData?.thumbnailM}
            alt="Thumbnail"
            className="w-[45%] h-[375px] flex-none object-cover rounded-md"
          />
          {/* Delete thẻ br */}
          <div className="flex flex-col gap-8 text-sm">
            <p dangerouslySetInnerHTML={{ __html: artistData?.biography }}></p>
            <div className="flex gap-10">
              <div className="flex flex-col  gap-2">
                <span className="text-[20px] font-bold">
                  {Number(artistData?.follow?.toFixed(1)).toLocaleString()}
                </span>
                <span>Người quan tâm</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-[20px] font-bold">Giải thưởng</h3>
                {artistData?.awards
                  ? artistData?.awards?.map((item, index) => (
                      <div key={index}>
                        <span>
                          {`- ${item}`}
                          <br />
                        </span>
                      </div>
                    ))
                  : "Chưa cập nhật"}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Artist best songs */}
      <div className="mt-[30px] px-[60px] w-full flex  ">
        <div className="w-[100%] flex-auto  ">
          <h3 className="mb-5 font-bold text-[20px]">Bài hát nổi bật</h3>
          <div className="flex flex-wrap w-full justify-start  ">
            {artistData?.sections
              ?.find((item) => item.sectionType === "song")
              ?.items?.filter((item, index) => index < 10)
              ?.map((item) => (
                <div
                  key={item.encodeId}
                  className="w-[90%] min-[1024px]:w-[50%] "
                >
                  <div className="w-[96%] border-b border-gray-400 ">
                    <SongItem
                      sid={item.encodeId}
                      thumbnail={item.thumbnail}
                      title={item.title}
                      artists={item.artistsNames}
                      size="w-[40px] h-[40px]"
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {artistData?.sections
        ?.filter((item) => item.sectionType === "playlist")
        ?.map((item, index) => (
          <Section key={index} data={item} />
        ))}

      <div className="flex flex-col w-full px-[60px] mt-12">
        <h3 className="text-lg font-bold mb-5">
          {
            artistData?.sections?.find((item) => item.sectionType === "artist")
              ?.title
          }
        </h3>
        <div className="flex items-start  gap-[28px] ">
          {artistData?.sections
            ?.find((item) => item.sectionType === "artist")
            ?.items?.filter((item, index) => index < 5)
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

      <div className="w-full h-[500px]"></div>
    </div>
  );
};

export default Singer;
