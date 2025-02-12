import defaultColors from "../util/default-colors.json"
import darkColors from "../util/dark-theme-colors.json"
const theme = {
  colors: {
    ...defaultColors,
    text: "#001d3d",
    background: "#fff",
    primary: "#004ca3",
    accent: "#fff",
    muted: "#001d3d",
    cardBg: "#fff",
    borderColor: "#540229",
    labelText: "#777",
    inputBorder: "#aaa",
    inputBackground: "#fff",
    socialIcons: "#004ca3",
    socialIconsHover: "#001d3d",
    buttonBg: "#004ca3",
    buttonHoverBg: "#001d3d",
    buttonHoverColor: "#fff",
    modes: {
      dark: {
        text: "#001d3d",
        background: "#fff",
        primary: "#004ca3",
        accent: "#fff",
        muted: "#001d3d",
        cardBg: "#fff",
        borderColor: "#540229",
        labelText: "#777",
        inputBorder: "#aaa",
        inputBackground: "#fff",
        socialIcons: "#004ca3",
        socialIconsHover: "#001d3d",
        buttonBg: "#004ca3",
        buttonHoverBg: "#001d3d",
        buttonHoverColor: "#fff",
        ...darkColors,
      },
    },
  },
  links: {
    postLink: {
      color: "#001d3d",
      "&:hover": {
        color: "text",
      },
    },
  },
  variants: {
    button: {
      bg: "#004ca3",
      color: "#fff",
      "&:hover": {
        bg: "#001d3d",
        color: "#fff",
      },
    },
    socialIcons: {
      a: {
        color: "socialIcons",
        ":hover": {
          color: "socialIconsHover",
        },
      },
    },
  },
}

export default theme
