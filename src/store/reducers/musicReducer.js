import actionTypes from "../actions/actionTypes";

const initState = {
  currentSongId: null,
  currentSongData: null,
  isPlaying: false,
  atAlbum: false,
  songs: null,
  isLoading: false,
  currentAlbumId: null,
  recentSongs: [],
  searchData: {},
  keyword: "",
  followArtists: [],
  personalSongs: [],
};

const musicReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_CUR_SONG_ID:
      return {
        ...state,
        currentSongId: action.sid || null,
      };

    case actionTypes.PLAY:
      return {
        ...state,
        isPlaying: action.flag,
      };

    case actionTypes.SET_ALBUM:
      return {
        ...state,
        atAlbum: action.flag,
      };
    case actionTypes.PLAYLIST:
      return {
        ...state,
        songs: action.songs || null,
      };
    case actionTypes.SET_CUR_SONG_DATA:
      return {
        ...state,
        currentSongData: action.data || null,
      };
    case actionTypes.SET_CUR_ALBUM_ID:
      return {
        ...state,
        currentAlbumId: action.pid || null,
      };
    case actionTypes.SET_RECENT: {
      let songs = state.recentSongs;
      if (action.data) {
        if (state.recentSongs?.some((item) => item.sid === action.data.sid)) {
          songs = songs.filter((item) => item.sid !== action.data.sid);
        }

        if (songs.length > 10) {
          songs = songs.filter(
            (item, index, array) => index !== array.length - 1
          );
        }
        songs = [action.data, ...songs];
      }
      return {
        ...state,
        recentSongs: songs,
      };
    }
    case actionTypes.SET_REMOVE_RECENT:
      return {
        ...state,
        recentSongs: [],
      };

    case actionTypes.SET_FOLLOW_ARTIST: {
      let artists = state.followArtists;
      if (action.data) {
        if (
          state.followArtists?.some(
            (item) => item.artistId === action.data.artistId
          )
        ) {
          artists = artists.filter(
            (item) => item.artistId !== action.data.artistId
          );
        }

        if (artists.length > 20) {
          artists = artists.filter(
            (item, index, array) => index !== array.length - 1
          );
        }
        artists = [action.data, ...artists];
      }
      return {
        ...state,
        followArtists: artists,
      };
    }

    case actionTypes.REMOVE_FOLLOW_ARTIST: {
      let artists = state.followArtists;
      if (action.data) {
        if (
          state.followArtists?.some(
            (item) => item.artistId === action.data.artistId
          )
        ) {
          artists = artists.filter(
            (item) => item.artistId !== action.data.artistId
          );
        }
        artists = [...artists];
      }
      return {
        ...state,
        followArtists: artists,
      };
    }

    case actionTypes.SEARCH:
      return {
        ...state,
        searchData: action.data || {},
        keyword: action.keyword || "",
      };
    // case actionTypes.SET_FOLLOW_ARTIST:
    //   return {
    //     ...state,
    //     followArtist: action.data || null,
    //   };

    case actionTypes.SET_PERSONAL_SONGS: {
      let songs = state.personalSongs;
      if (action.data) {
        if (
          state.personalSongs?.some(
            (item) => item.encodeId === action.data.encodeId
          )
        ) {
          songs = songs.filter(
            (item) => item.encodeId !== action.data.encodeId
          );
        }

        if (songs.length > 50) {
          songs = songs.filter(
            (item, index, array) => index !== array.length - 1
          );
        }
        songs = [action.data, ...songs];
      }
      return {
        ...state,
        personalSongs: songs,
      };
    }
    case actionTypes.DELETE_PERSONAL_SONG: {
      let songs = state.personalSongs;
      if (action.data) {
        if (
          state.personalSongs?.some(
            (item) => item.encodeId === action.data.encodeId
          )
        ) {
          songs = songs.filter(
            (item) => item.encodeId !== action.data.encodeId
          );
        }
        songs = [...songs];
      }
      return {
        ...state,
        personalSongs: songs,
      };
    }
    default:
      return state;
  }
};

export default musicReducer;
