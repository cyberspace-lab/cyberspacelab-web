import defaultColors from "../util/default-colors.json"
import darkColors from "../util/dark-theme-colors.json"
import { lightness } from "@theme-ui/color"
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
        text: "#f5f5f5",
        background: "#111",
        primary: "#252525",
        accent: "#5C2941",
        muted: "rgba(255, 255, 255, 0.7)",
        cardBg: "#252525",
        borderColor: "#888",
        labelText: "#777",
        inputBorder: "#777",
        inputBackground: "#333",
        socialIcons: lightness("siteColor", 0.5),
        socialIconsHover: lightness("siteColor", 0.9),
        buttonColor: lightness("siteColor", 0.7),
        buttonHoverBg: lightness("siteColor", 0.3),
        buttonHoverColor: lightness("siteColor", 0.9),
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
