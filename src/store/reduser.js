import { LOGIN } from "./action";
import { LOGOUT } from "./action";
import { ADD_LIKES } from "./action";
import { ADD_DISLIKES } from "./action";

const INITIAL_STATE = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    apiKey: "",
    likes: {},
    dislikes: {},
    likesCount: {},
    dislikesCount: {},
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
        email: user.email,
        apiKey: user.apiKey,
        likes: user.likes,
        dislikes: user.dislikes,
        likesCount: user.likesCount,
        dislikesCount: user.dislikesCount
      };
    }

    case LOGOUT: {
      return {
        ...state,
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        api_key: "",
        likes: {},
        dislikes: {},
        likesCount: {},
        dislikesCount: {},
      };
    }

    case ADD_LIKES: {
      const name = action.payload?.name;
      const candidate = action.payload?.candidate;
      const prevLikes = name in state.likes? state.likes[name] : null
      return {
        ...state,
        likes: {
          ...state.likes,
          [name]: prevLikes? [...prevLikes, candidate] : [candidate]
        },
      };
    }

    case ADD_DISLIKES: {
      const name = action.payload?.name;
      const candidate = action.payload?.candidate;
      const prevDislikes = name in state.dislikes? state.dislikes[name] : null
      return {
        ...state,
        dislikes: {
          ...state.dislikes,
          [name]: prevDislikes? [...prevDislikes, candidate] : [candidate]
        },
      };
    }

    default:
        return state;
    }
  };
  
  export default Reduser;