import "react-tippy/dist/tippy.css";

import PropTypes from "prop-types";
import React from "react";
import { ScrollingProvider } from "react-scroll-section";
import config from "react-reveal/globals";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import theme from "../../theme";

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
