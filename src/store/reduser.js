import { LOGIN } from "./action";
import { LOGOUT } from "./action";

const INITIAL_STATE = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
};

const Reduser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN: {
      const user = action.payload;
      return {
        ...state,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email
      };
    }

    case LOGOUT: {
      return {
        ...state,
        firstName: "",
        lastName: "",
        username: "",
        email: ""
      };
    }

    default:
        return state;
    }
  };
  
  export default Reduser;