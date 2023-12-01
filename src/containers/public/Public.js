import React from "react";
import { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import {
  SidebarLeft,
  SidebarRight,
  Player,
  Header,
  Loading,
  NewRelease,
} from "../../components";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
const Public = () => {
  const [isShowRightSidebar, setIsShowRightSidebar] = useState(true);
  const { isLoading, scrollTop } = useSelector((state) => state.app);
  const { currentSongId } = useSelector((state) => state.music);
  const dispatch = useDispatch();
  const handleScrollTop = (e) => {
    if (e.target.scrollTop === 0) {
      dispatch(actions.zeroScrollTop(true));
    } else {
      dispatch(actions.zeroScrollTop(false));
    }
  };

  return (
    <div className=" w-full relative h-screen flex flex-col bg-main-300 ">
      <div className="w-full h-full flex flex-auto">
        <div className=" min-[1024px]:w-[240px] w-[70px] h-full flex-none ">
          <SidebarLeft />
        </div>

        <div className="flex flex-col w-full 1400:w-8/12  relative">
          {isLoading && (
            <div className="absolute top-0 bottom-0 z-20 left-0 right-0 bg-main-200 flex items-center justify-center">
              <Loading />
            </div>
          )}
          <div
            className={`h-[40px] md:h-[70px] ${
              scrollTop ? "bg-transparent" : "bg-main-300 opacity-95 shadow-md"
            }  fixed top-0 left-[70px] 1000:left-[226px]   1400:left-[240px] z-50 px-[60px] flex items-center   ${
              isShowRightSidebar ? "1400:right-[400px] right-0" : "right-0"
            } `}
          >
            <Header />
          </div>

          <div className="flex-auto w-full">
            <Scrollbars
              onScroll={handleScrollTop}
              autoHide
              style={{ width: "100%", height: "100%" }}
            >
              <Outlet />

              <div className="h-[120px] w- full]"></div>
            </Scrollbars>
          </div>
        </div>

        {/* //Ràng buộc phần right sidebar với biến isShowRightSidebar */}
        {/* true là hiện, false là tắt */}
        {isShowRightSidebar && (
          <div className=" hidden h-screen 1400:flex 1400:flex-1 flex-none animate-slide-left ">
            <SidebarRight />
          </div>
        )}
      </div>

      {currentSongId && (
        <div className="fixed bottom-0 z-50 left-0 right-0 flex-none h-[90px]">
          <Player setIsShowRightSidebar={setIsShowRightSidebar} />
        </div>
      )}
    </div>
  );
};

export default Public;
