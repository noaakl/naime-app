export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const ADD_LIKES = "ADD_LIKES";
export const ADD_DISLIKES = "ADD_DISLIKES";
export const REMOVE_LIKES = "REMOVE_LIKES";
export const REMOVE_DISLIKES = "REMOVE_DISLIKES";
export const ADD_QUERY_NAMES = "ADD_QADD_QUERY_NAMESUERY";
export const EDIT_QUERY_NAMES = "EDIT_QUERY_NAMES";
export const DRAG_UP_QUERY_NAME = "DRAG_UP_QUERY_NAME";
export const DRAG_DOWN_QUERY_NAME = "DRAG_DOWN_QUERY_NAME";
export const SET_QUERY = "SET_QUERY";

export function setQuery(query) {
  return {
    type: SET_QUERY,
    payload: {
      query,
    },
  };
}

export function addQueryNames(names) {
  let transformedNames = []
  if (names) {
    transformedNames = names.map((name) => {return name.split(" ")})
  }
  return {
    type: ADD_QUERY_NAMES,
    payload: {
      transformedNames,
    },
  };
}

export function editQueryNames(name, numberIndex, nameIndex) {
  return {
    type: EDIT_QUERY_NAMES,
    payload: {
      name,
      numberIndex,
      nameIndex,
    },
  };
}

export function dragUpQueryName(numberIndex, nameIndex) {
  return {
    type: DRAG_UP_QUERY_NAME,
    payload: {
      numberIndex,
      nameIndex,
    },
  };
}

export function dragDownQueryName(numberIndex, nameIndex) {
  return {
    type: DRAG_DOWN_QUERY_NAME,
    payload: {
      numberIndex,
      nameIndex,
    },
  };
}

export function login(userInfo) {
  const username = userInfo.user_name
  const firstName = userInfo.first_name
  const lastName = userInfo.last_name
  const email = userInfo.email
  const apiKey = userInfo.api_key
  const likes = userInfo.likes
  const dislikes = userInfo.dislikes
  const likesCount = userInfo.likes_count
  const dislikesCount = userInfo.dislikes_count
  return {
    type: LOGIN,
    payload: {
        username,
        firstName,
        lastName,
        email,
        apiKey,
        likes,
        dislikes,
        likesCount,
        dislikesCount
    },
  };
}

export function logout() {
  return {
    type: LOGOUT,
    payload: {
    },
  };
}

export function addLikes(name, candidate) {
  return {
    type: ADD_LIKES,
    payload: {
      name,
      candidate,
    },
  };
}

export function addDislikes(name, candidate) {
  return {
    type: ADD_DISLIKES,
    payload: {
      name,
      candidate,
    },
  };
}

export function removeLikes(name, candidate) {
  return {
    type: REMOVE_LIKES,
    payload: {
      name,
      candidate,
    },
  };
}

export function removeDislikes(name, candidate) {
  return {
    type: REMOVE_DISLIKES,
    payload: {
      name,
      candidate,
    },
  };
}

