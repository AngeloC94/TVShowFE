

const initialState = {
  token: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, token: action.payload, error: null };
      
      case "LOGIN_FAILED":
        return { ...state, error: action.payload };
        case "LOGOUT":
      return initialState;
    default:
      return state
  }
};
