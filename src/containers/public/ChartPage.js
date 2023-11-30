import { React, useEffect, useState, useRef } from "react";
import { apiGetChartHome } from "../../apis";
import bgChart from "../../assests/bg-chart.jpg";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { SongItem, ListItem, RankList } from "../../components";
import _ from "lodash";

const ChartPage = () => {
  const [chartData, setChartData] = useState(null);
  const [data, setData] = useState(null);
  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: { display: false },
        grid: { color: "rgba(0,0,0,0.3)", drawTicks: false },
        min: chartData?.RTChart?.chart?.minScore,
        max: chartData?.RTChart?.chart?.maxScore,
        border: { dash: [3, 4] },
      },
      x: {
        ticks: { color: "gray" },
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
        //       data: chartData?.RTChart?.chart?.items[
        //         Object.keys(chartData?.RTChart?.chart?.items)[i]
        //       ]
        //         ?.filter((item) => +item.hour % 2 === 0)
        //         .map((item) => item.counter),
        //       encodeId: Object.keys(chartData?.RTChart?.chart?.items)[i],
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
  const [isShowFull, setIsShowFull] = useState(false);

  useEffect(() => {
    const fetchChartData = async () => {
      const response = await apiGetChartHome();
      if (response.data.err === 0) setChartData(response.data.data);
    };
    fetchChartData();
  }, []);
  useEffect(() => {
    const labels = chartData?.RTChart?.chart?.times
      ?.filter((item) => +item.hour % 2 === 0)
      .map((item) => `${item.hour}:00`);

    const datasets = [];
    if (chartData?.RTChart?.chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chartData?.RTChart?.chart?.items[
            Object.keys(chartData?.RTChart?.chart?.items)[i]
          ]
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
  }, [chartData]);

  return (
    <div className=" ">
      <div className=" flex flex-col">
        <div className="relative">
          <img
            src={bgChart}
            alt="bg-chart"
            className="w-full object-cover h-[500px] grayscale"
          />
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-[rgba(206,217,217,0.8)]"></div>
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-[#CED8D9] to-transparent"></div>
          <div className="absolute top-0 bottom-1/2 left-0 right-0 flex items-center px-[60px]">
            <h3 className="font-bold text-[40px] text-main-500">#Chart</h3>
          </div>

          <div className="  absolute top-1/3 left-0 right-0 bottom-0 px-[60px] ">
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
                  chartData?.RTChart?.items?.find(
                    (item) => item.encodeId === selected
                  )?.thumbnail
                }
                title={
                  chartData?.RTChart?.items?.find(
                    (item) => item.encodeId === selected
                  )?.title
                }
                artists={
                  chartData?.RTChart?.items?.find(
                    (item) => item.encodeId === selected
                  )?.artistsNames
                }
                sid={
                  chartData?.RTChart?.items?.find(
                    (item) => item.encodeId === selected
                  )?.encodeId
                }
                style="bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* chart songs */}
      <div className="px-[60px] mt-12">
        <RankList data={chartData?.RTChart?.items} number={10} />
        {/* {chartData?.RTChart?.items.map((item, index) => (
          <ListItem
            songData={item}
            key={item.encodeId}
            isHideNode
            order={index + 1}
          />
        ))} */}
      </div>

      <div className="relative">
        <img
          src={bgChart}
          alt="bg-chart"
          className="w-full h-[650px] object-cover  grayscale"
        />
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-[rgba(206,217,217,0.8)]"></div>

        <div className="absolute top-0 bottom-1/2 left-0 right-0 mt-8 px-[60px] flex flex-col gap-4">
          <h3 className="font-bold text-[40px] text-main-500">
            Bảng xếp hạng tuần
          </h3>
          <div className="flex gap-4 h-fit">
            {chartData?.weekChart &&
              Object.entries(chartData?.weekChart)?.map((item, index) => (
                <div
                  className="flex-1 bg-gray-200 rounded-md px-[10px] py-5"
                  key={index}
                >
                  <h3 className="text-[24px] text-main-500 font-bold">
                    {item[0] === "vn"
                      ? "Việt Nam"
                      : item[0] === "us"
                      ? "US-UK"
                      : item[0] === "korea"
                      ? "K-Pop"
                      : ""}
                  </h3>
                  <div className="mt-4 h-fit  ">
                    <RankList
                      data={item[1]?.items}
                      number={5}
                      isWeekChart
                      isHideAlbum={true}
                      link={item[1].link}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="w-full h-[500px]"></div>
    </div>
  );
};

export default ChartPage;
