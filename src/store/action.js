export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export function login(userInfo) {
  const username = userInfo.user_name
  const firstName = userInfo.first_name
  const lastName = userInfo.last_name
  const email = userInfo.email
  return {
    type: LOGIN,
    payload: {
        username,
        firstName,
        lastName,
        email,
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

