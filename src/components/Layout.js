import "react-tippy/dist/tippy.css";

import PropTypes from "prop-types";
import React from "react";
import { ScrollingProvider } from "react-scroll-section";
import config from "react-reveal/globals";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import colors from "../../colors";

import Helmet from "./Helmet";

const GlobalStyle = createGlobalStyle`
*,
*::after,
*::before {
  box-sizing: inherit;
  }

body {
  box-sizing: border-box;
  margin: 0;
  font-family: 'IBM Plex Sans';
}
`;

config({ ssrFadeout: true });

const theme = {
  colors,
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  fonts: { body: "inherit", heading: "inherit" },
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
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
    },
    heading: {
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
    },
  },
  shadows: {
    large: "0 12px 16px rgba(0, 0, 0, 0.2)",
  },
};

const Layout = ({ children }) => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <ScrollingProvider>
        <Helmet />
        {children}
      </ScrollingProvider>
    </ThemeProvider>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
