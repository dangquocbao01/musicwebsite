import React from "react";
import { memo, useState, useEffect, useRef } from "react";
import bgChart from "../assests/bg-chart.jpg";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { useSelector } from "react-redux";
import SongItem from "./SongItem";
import _ from "lodash";
import { Link } from "react-router-dom";
import path from "../ultis/path";
import icons from "../ultis/icons";

const { BsFillPlayFill } = icons;
const ChartSection = () => {
  const [data, setData] = useState(null);
  const { chart, rank } = useSelector((state) => state.app);
  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: { display: false },
        grid: { color: "rgba(255,255,255,0.2)", drawTicks: false },
        min: chart?.minScore,
        max: chart?.maxScore,
        border: { dash: [3, 4] },
      },
      x: {
        ticks: { color: "white" },
        grid: { color: "transparent" },
      },
    },
    plugins: {
      legend: false,
      tooltip: {
        enabled: false,
        // external: ({ tooltip }) => {
        //   if (!chartRef || !chartRef.current) return;
        //   if (tooltip.opacity === 0) {
        //     if (tooltipState.opacity !== 0) {
        //       setTooltipState((prev) => ({ ...prev, opacity: 0 }));
        //       return;
        //     }
        //   }
        //   const counters = [];
        //   for (let i = 0; i < 3; i++) {
        //     counters.push({
        //       data: chart?.items[Object.keys(chart?.items)[i]]
        //         ?.filter((item) => +item.hour % 2 === 0)
        //         .map((item) => item.counter),
        //       encodeId: Object.keys(chart?.items)[i],
        //     });
        //   }
        //   const rs = counters.find((item) =>
        //     item.data.some(
        //       (number) =>
        //         number === +tooltip.body[0]?.lines[0]?.replace(",", "")
        //     )
        //   );

        //   setSelected(rs.encodeId);
        //   const newTooltipData = {
        //     opacity: 1,
        //     left: tooltip.caretX,
        //     top: tooltip.caretY,
        //   };

        //   if (!_.isEqual(tooltipState, newTooltipData))
        //     setTooltipState(newTooltipData);
        // },
      },
    },
    hover: {
      mode: "dataset",
      intersect: false,
    },
  };

  const [tooltipState, setTooltipState] = useState({
    opacity: 0,
    top: 0,
    left: 0,
  });
  const [selected, setSelected] = useState(null);
  const chartRef = useRef();

  useEffect(() => {
    const labels = chart?.times
      ?.filter((item) => +item.hour % 2 === 0)
      .map((item) => `${item.hour}:00`);

    const datasets = [];
    if (chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chart?.items[Object.keys(chart?.items)[i]]
            ?.filter((item) => +item.hour % 2 === 0)
            .map((item) => item.counter),

          borderColor: i === 0 ? "#4A90E2" : i === 1 ? "#E35050" : "#27BD9C",
          tension: 0.2,
          borderWidth: 2,
          pointBackgroundColor: "white",
          pointHoverRadius: 5,
          pointBorderColor:
            i === 0 ? "#4A90E2" : i === 1 ? "#E35050" : "#27BD9C",
          pointHoverBorderWidth: 4,
        });

        setData({ labels, datasets });
      }
    }
  }, [chart]);
  return (
    <div className=" lg:px-[60px] hidden md:flex mt-12 relative min-[1324px]:max-h-[430px] h-[760px] rounded-md">
      <img
        src={bgChart}
        alt="bg-chart"
        className="w-full object-cover  hidden md:flex rounded-md  min-[1324px]:max-h-[430px] h-[760px]"
      />
      <div className="absolute top-0 left-[60px] right-[60px] bottom-0 z-10  bg-[rgba(77,34,104,0.7)] rounded-md "></div>
      <div className="absolute top-0 left-[60px] right-[60px] bottom-0 z-20 p-5 flex flex-col gap-4 rounded-md">
        <Link
          to={path.CHART}
          className="flex items-center gap-3 text-white hover:text-green-500"
        >
          <h3 className="text-2xl font-bold ">#Chart</h3>
          <span className=" p-1 rounded-full bg-white">
            <BsFillPlayFill size={18} color="green" />
          </span>
        </Link>

        <div className="min-[1324px]:flex-row flex-col flex gap-4 h-full ">
          <div className="flex-5 flex flex-col  gap-4  ">
            {rank
              ?.filter((i, index) => index < 3)
              ?.map((item, index) => (
                <SongItem
                  key={item.encodeId}
                  thumbnail={item.thumbnail}
                  title={item.title}
                  artists={item.artistsNames}
                  sid={item.encodeId}
                  order={index + 1}
                  percent={Math.round((+item.score * 100) / +chart?.totalScore)}
                  style="text-white bg-[hsla(0,0%,100%,.07)] hover:bg-[#945EA7]"
                />
              ))}

            <Link
              to={path.CHART}
              className="text-white px-4 mb-4 py-3 rounded-l-full rounded-r-full border border-white w-fit self-center hover:bg-green-500 "
            >
              <span className="">Xem thêm</span>
            </Link>
          </div>
          <div className=" flex-5 order-first min-[1324px]:order-last min-[1324px]:h-[100%] min-[1324px]:flex-7 relative">
            {data && <Line data={data} ref={chartRef} options={options} />}
            <div
              className="tooltip "
              style={{
                top: tooltipState.top,
                left: tooltipState.left,
                opacity: tooltipState.opacity,
                position: "absolute",
              }}
            >
              <SongItem
                thumbnail={
                  rank?.find((item) => item.encodeId === selected)?.thumbnail
                }
                title={rank?.find((item) => item.encodeId === selected)?.title}
                artists={
                  rank?.find((item) => item.encodeId === selected)?.artistsNames
                }
                sid={rank?.find((item) => item.encodeId === selected)?.encodeId}
                style="bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ChartSection);
