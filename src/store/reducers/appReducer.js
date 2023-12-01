import actionTypes from "../actions/actionTypes";

const initState = {
  banner: null,
  chill: null,
  lovelyDay: null,
  remix: null,
  top100: null,
  sadSong: null,
  albumHot: null,
  popularArtist: null,
  isLoading: false,
  newRelease: null,
  weekChart: null,
  chart: null,
  rank: null,
  singers: null,
  scrollTop: true,
  currentWidth: null,
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOME:
      return {
        ...state,
        banner:
          action.homeData?.find((item) => item.sectionId === "hSlider")
            ?.items || null,
        chill:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme") ||
          null,
        lovelyDay:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme2") ||
          null,
        remix:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme3") ||
          null,
        top100:
          action.homeData?.find((item) => item.sectionId === "h100") || null,
        sadSong:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme4") ||
          null,
        albumHot:
          action.homeData?.find((item) => item.sectionId === "hAlbum") || null,
        popularArtist:
          action.homeData?.find((item) => item.sectionId === "hArtistTheme") ||
          null,
        newRelease:
          action.homeData?.find((item) => item.sectionType === "new-release") ||
          null,
        weekChart:
          action.homeData?.find((item) => item.sectionType === "weekChart")
            ?.items || null,
        chart:
          action.homeData?.find((item) => item.sectionId === "hZC")?.chart ||
          null,
        rank:
          action.homeData?.find((item) => item.sectionId === "hZC")?.items ||
          null,
        singers:
          action.homeData?.find(
            (item) => item.sectionType === "artistSpotlight"
          )?.items || null,
      };

    case actionTypes.LOADING:
      return {
        ...state,
        isLoading: action.flag,
      };
    case actionTypes.ZERO_SCROLLTOP:
      return {
        ...state,
        scrollTop: action.flag,
      };
    case actionTypes.CURRENT_WIDTH:
      return {
        ...state,
        currentWidth: action.w,
      };
    default:
      return state;
  }
};

export default appReducer;
