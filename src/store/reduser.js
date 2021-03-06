import { LOGIN } from "./action";
import { LOGOUT } from "./action";
import { ADD_LIKES } from "./action";
import { ADD_DISLIKES } from "./action";
import { REMOVE_LIKES } from "./action";
import { REMOVE_DISLIKES } from "./action";
import { ADD_QUERY_NAMES } from "./action";
import { EDIT_QUERY_NAMES } from "./action";
import { DRAG_UP_QUERY_NAME } from "./action";
import { DRAG_DOWN_QUERY_NAME } from "./action";
import { SET_QUERY } from "./action";
// import { HIDE_QUERY_MODAL } from "./action";


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
    query: "",
    queryNames: [],
    // showQueryModal: false,
};

const Reduser = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case SET_QUERY: {
      const query = action.payload.query;
      return {
        ...state,
        query: query
      };
    }

    case ADD_QUERY_NAMES: {
      const names = action.payload.transformedNames;
      return {
        ...state,
        queryNames: names
      };
    }

    case EDIT_QUERY_NAMES: {
      const nameIndex = action.payload.nameIndex;
      const numberIndex = action.payload.numberIndex;
      const name = action.payload.name;
      let names = [...state.queryNames]
      names[numberIndex][nameIndex] = name
      return {
        ...state,
        queryNames: names
      };
    }

    case DRAG_UP_QUERY_NAME: {
      // const nameCount = state.queryNames.length()
      const numberIndex = parseInt(action.payload.numberIndex);
      const nameIndex = action.payload.nameIndex;
      let names = [...state.queryNames]
      if (numberIndex > 0) {
        const nameToDragUp = names[numberIndex][nameIndex]
        const nameToDragDown = names[numberIndex-1][nameIndex]
        names[numberIndex][nameIndex] = nameToDragDown
        names[numberIndex-1][nameIndex] = nameToDragUp
      }
      return {
        ...state,
        queryNames: names
      };
    }

    case DRAG_DOWN_QUERY_NAME: {
      const nameCount = state.queryNames.length
      const numberIndex = parseInt(action.payload.numberIndex);
      const nameIndex = action.payload.nameIndex;
      let names = [...state.queryNames]
      if (numberIndex < nameCount - 1) {
        const nameToDragDown = names[numberIndex][nameIndex]
        const nameToDragUp = names[numberIndex+1][nameIndex]
        names[numberIndex][nameIndex] = nameToDragUp
        names[numberIndex+1][nameIndex] = nameToDragDown
      }
      return {
        ...state,
        queryNames: names
      };
    }

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
        dislikesCount: user.dislikesCount,
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