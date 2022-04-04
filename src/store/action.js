export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const ADD_LIKES = "ADD_LIKES";
export const ADD_DISLIKES = "ADD_DISLIKES";

export function login(userInfo) {
  const username = userInfo.user_name
  const firstName = userInfo.first_name
  const lastName = userInfo.last_name
  const email = userInfo.email
  const api_key = userInfo.api_key
  const likes = userInfo.likes
  const dislikes = userInfo.dislikes
  return {
    type: LOGIN,
    payload: {
        username,
        firstName,
        lastName,
        email,
        api_key,
        likes,
        dislikes,
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

