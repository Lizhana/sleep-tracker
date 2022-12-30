import { GET_CURRENT_USER } from "../actions/constants";

const initialState = {
  users: [],
  currentUser: {},
};

const usersReducer = function (state = initialState, action) {
  switch (action.type) {
    case "GET_USERS_RESPONSE":
      return {
        ...state,
        users: action.payload,
      };
    case GET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return { ...state };
  }
};

export default usersReducer;