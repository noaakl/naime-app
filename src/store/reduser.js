import { LOGIN } from "./action";
import { LOGOUT } from "./action";
import { ADD_LIKES } from "./action";
import { ADD_DISLIKES } from "./action";
import { REMOVE_LIKES } from "./action";
import { REMOVE_DISLIKES } from "./action";


const INITIAL_STATE = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    apiKey: "",
    likes: {},
    dislikes: {},
    likesCount: 0,
    dislikesCount: 0,
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
        apiKey: "",
        likes: {},
        dislikes: {},
        likesCount: 0,
        dislikesCount: 0,
      };
    }

    case ADD_LIKES: {
      const name = action.payload?.name;
      const candidate = action.payload?.candidate;
      const prevLikes = name in state.likes? state.likes[name] : null
      return {
        ...state,
        likesCount: state.likesCount + 1,
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
        dislikesCount: state.dislikesCount + 1,
        dislikes: {
          ...state.dislikes,
          [name]: prevDislikes? [...prevDislikes, candidate] : [candidate]
        },
      };
    }

    case REMOVE_LIKES: {
      const name = action.payload?.name;
      const candidate = action.payload?.candidate;
      const prevLikes = state.likes[name] 
      const newNameLikes = prevLikes.filter( (likeName) => likeName !== candidate )
    //   if (prevLikes.length === 1){
    //     newNameLikes = []
    // }


      return { 
        ...state,
        likesCount: state.likesCount - 1,
        likes: {
          ...state.likes,
          [name]: newNameLikes
        },
      };
  }

    case REMOVE_DISLIKES: {
      const name = action.payload?.name;
      const candidate = action.payload?.candidate;
      const prevDislikes = name in state.dislikes? state.dislikes[name] : null
      const newNameDislikes = prevDislikes.filter( (likeName) => likeName !== candidate )

      return {
        ...state,
        dislikesCount: state.dislikesCount - 1,
        dislikes: {
          ...state.dislikes,
          [name]: newNameDislikes
        },
      };
    }

    default:
        return state;
    }
  };
  
  export default Reduser;