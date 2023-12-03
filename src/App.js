import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Home,
  Login,
  Public,
  Personal,
  Album,
  WeekRank,
  ChartPage,
  Search,
  SearchSongs,
  SearchAll,
  Singer,
  SearchPlaylist,
  Hub,
} from "./containers/public/";
import { Routes, Route } from "react-router-dom";
import path from "./ultis/path";
import { useEffect, useState, React } from "react";
import * as actions from "./store/actions";
import "./App.css";
import "./index.css";
import { apiGetChartHome } from "./apis";
import { apiGetTop100 } from "./apis";

function App() {
  const dispatch = useDispatch();
  const [weekChart, setWeekChart] = useState(null);

  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

  useEffect(() => {
    dispatch(actions.getHome());
    const fetchChartData = async () => {
      const response = await apiGetChartHome();
      if (response.data.err === 0) setWeekChart(response.data.data.weekChart);
    };

    fetchChartData();
  }, []);

  const setWidth = (e) => {
    setCurrentWidth(e.target.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", setWidth);
    return () => {
      window.removeEventListener("resize", setWidth);
    };
  }, []);
  useEffect(() => {
    dispatch(actions.setCurrentWidth(currentWidth));
  }, [currentWidth]);

  return (
    <>
      <div className="app">
        <Routes>
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.HOME} element={<Home />} />
            <Route path={path.HUB} element={<Hub />} />
            <Route path={path.LOGIN} element={<Login />} />
            <Route path={path.MY_MUSIC} element={<Personal />} />
            <Route path={path.ALBUM__TITLE__PID} element={<Album />} />
            <Route path={path.PLAYLIST__TITLE__PID} element={<Album />} />
            <Route path={path.MY_MUSIC} element={<Login />} />
            <Route
              path={path.WEEKRANK__TITLE_PID}
              element={
                <WeekRank weekChart={weekChart && Object.values(weekChart)} />
              }
            />
            <Route path={path.CHART} element={<ChartPage />} />
            <Route path={path.HOME__SINGER} element={<Singer />} />
            <Route path={path.HOME__ARTIST__SINGER} element={<Singer />} />
            <Route path={path.SEARCH} element={<Search />}>
              <Route path={path.ALL} element={<SearchAll />} />
              <Route path={path.SONG} element={<SearchSongs />} />
              <Route path={path.PLAYLIST_SEARCH} element={<SearchPlaylist />} />
            </Route>

            <Route path={path.STAR} element={<Home />} />
          </Route>
        </Routes>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
