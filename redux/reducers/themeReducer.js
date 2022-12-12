import { SET_THEME } from "../types";

const initialState = {
  id: "T_001",
  name: "Light",
  colors: {
    body: "#FFFFFF",
    text: "#000000",
    button: {
      text: "#FFFFFF",
      background: "#000000"
    },
    link: {
      text: "teal",
      opacity: 1
    }
  },
  font: "'Poor Story', cursive",
  banner: ""
};


const themeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_THEME:
      return {
        ...state,
        id: payload.id,
        name: payload.name,
        colors: {
          body: payload.colors.body,
          text: payload.colors.text,
          button: {
            text: payload.colors.button.text,
            background: payload.colors.button.background
          },
          link: {
            text: payload.colors.link.text,
            opacity: payload.colors.link.opacity,
          },
        },
        font: payload.font,
        banner: payload.banner
      };
    default:
      return state;
  }
};

export default themeReducer;