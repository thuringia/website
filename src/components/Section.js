import React from "react";
import styled from "styled-components";
import { Section } from "react-scroll-section";
import PropTypes from "prop-types";
import Slide from "react-reveal/Slide";

import { LinkAnimated } from "./Link";
import { HeadingSection } from "./Typography";

const SectionContainer = styled.div`
  min-height: 100vh;
  min-width: 320px;
  max-width: 1366px;
  display: flex;
  margin: auto;
  flex: 0 1 auto;
  flex-direction: column;
  justify-content: center;
  padding: 5em 1em;
  scroll-behavior: smooth;
`;

const DefaultBackground = () => <div />;

const Container = ({ id, children, Background = DefaultBackground }) => (
  <Section id={id} style={{ position: "relative" }}>
    <Background />
    <SectionContainer>{children}</SectionContainer>
  </Section>
);

Container.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  Background: PropTypes.func,
};

const Header = ({ name, text, icon = "", label = "", ...props }) => (
  <Slide left>
    <HeadingSection {...props}>
      <LinkAnimated selected>
        {name}
        {icon && (
          <span
            role="img"
            aria-label={label}
            style={{ marginLeft: "10px", marginRight: "10px" }}
          >
            {icon}
          </span>
        )}
        {text}
      </LinkAnimated>
    </HeadingSection>
  </Slide>
);

Header.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string,
};

export default {
  Container,
  Header,
};
