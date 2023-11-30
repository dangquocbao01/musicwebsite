import icons from "./icons";

const { MdOutlineLibraryMusic, AiOutlinePieChart, TbChartArcs, MdOutlineFeed } =
  icons;
export const sidebarMenu = [
  {
    path: "mymusic",
    text: "Cá nhân",
    end: true,
    icons: <MdOutlineLibraryMusic size={24} />,
  },

  {
    path: "",
    text: "Khám phá",
    end: true,
    icons: <TbChartArcs size={24} />,
  },
  {
    path: "chart",
    text: "Chart",
    end: true,
    icons: <AiOutlinePieChart size={24} />,
  },
  {
    path: "follwing",
    text: "Theo dõi",
    end: true,
    icons: <MdOutlineFeed size={24} />,
  },
];

export const searchMenu = [
  {
    path: "tat-ca",
    text: "TẤT CẢ",
  },

  {
    path: "bai-hat",
    text: "BÀI HÁT",
    end: true,
  },
  {
    path: "playlist",
    text: "PLAYLIST/ALBUM",
    end: true,
  },
  // {
  //   path: "follwing",
  //   text: "Theo dõi",
  //   end: true,
  // },
];
