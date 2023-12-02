import actionTypes from "./actionTypes";
import * as apis from "../../apis";

export const setCurrentSongId = (sid) => ({
  type: actionTypes.SET_CUR_SONG_ID,
  sid,
});

export const play = (flag) => ({
  type: actionTypes.PLAY,
  flag,
});

export const playAlbum = (flag) => ({
  type: actionTypes.SET_ALBUM,
  flag,
});

export const setPlaylist = (songs) => ({
  type: actionTypes.PLAYLIST,
  songs,
});
export const loading = (flag) => ({
  type: actionTypes.LOADING,
  flag,
});
export const setCurrentSongData = (data) => ({
  type: actionTypes.SET_CUR_SONG_DATA,
  data,
});

export const setCurrentAlbumId = (pid) => ({
  type: actionTypes.SET_CUR_ALBUM_ID,
  pid,
});
export const setRecent = (data) => ({
  type: actionTypes.SET_RECENT,
  data,
});
export const setFollowArtist = (data) => ({
  type: actionTypes.SET_FOLLOW_ARTIST,
  data,
});
export const setRemoveFollowArtist = (data) => ({
  type: actionTypes.REMOVE_FOLLOW_ARTIST,
  data,
});
export const search = (keyword) => async (dispatch) => {
  try {
    const responese = await apis.apiSearch(keyword);
    if (responese.data.err === 0) {
      dispatch({
        type: actionTypes.SEARCH,
        data: responese.data.data,
        keyword: keyword,
      });
    } else {
      dispatch({
        type: actionTypes.SEARCH,
        data: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.SEARCH,
      data: null,
    });
  }
};

export const getSearchSongs = (singerId) => async (dispatch) => {
  try {
    const responese = await apis.apiGetArtistSongs(singerId);

    if (responese.data.err === 0) {
      dispatch({
        type: actionTypes.PLAYLIST,
        songs: responese.data.data.items,
      });
    } else {
      dispatch({
        type: actionTypes.PLAYLIST,
        songs: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.PLAYLIST,
      data: null,
    });
  }
};
