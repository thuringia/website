const { saturate } = require("polished");

const colors = {
  primary: "#0F1B40",
  primaryLight: "#849496",
  primaryDark: "#767C7F",

  secondary: "#1E357F",
  secondaryLight: "#3D6AFF",
  secondaryDark: "#0F1B40",

  background: "#FFFFFF",
  backgroundDark: "#3d6aff",
};

colors.primaryDarkSoft = saturate(-0.25, colors.primaryDark);
colors.secondarySoft = saturate(-0.25, colors.secondary);
colors.secondaryLightSoft = saturate(-0.25, colors.secondaryLight);
colors.backgroundLight = colors.secondaryLight;
colors.backgroundDarkSoft = saturate(-0.25, colors.backgroundDark);

const breakpoints = ["40em", "52em", "64em"];

const fontSizes = [12, 14, 16, 20, 24, 32, 48, 64, 72];
const space = [0, 4, 8, 16, 32, 64, 128, 256];

module.exports = {
  colors,
  breakpoints,
  mediaQueries: {
    small: `@media screen and (min-width: ${breakpoints[0]})`,
    medium: `@media screen and (min-width: ${breakpoints[1]})`,
    large: `@media screen and (min-width: ${breakpoints[2]})`,
  },

  fonts: ["IBM Plex Sans"],
  fontSizes,
  fontWeights: {
    body: 400,
    heading: 700,
  },
  lineHeights: {
    body: "2em",
    text: "2em",
    heading: "normal",
  },
  text: {
    copy: {
      fontWeight: 400,
    },
    light: {
      fontWeight: 300,
    },
  },
  headings: {
    hero: {
      textAlign: "center",
      color: colors.primary,
      fontSize: fontSizes[8],
      fontWeight: 500,
      marginBottom: space[5],
    },
  },
  shadows: {
    large: "0 12px 16px rgba(0, 0, 0, 0.2)",
  },
};
