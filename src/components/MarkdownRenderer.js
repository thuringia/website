import React from "react";
import { SectionLink } from "react-scroll-section";
import styled from "styled-components";
import css from "@styled-system/css";
import PropTypes from "prop-types";

import { Text } from "./Typography";

const StyledLink = styled.a`
  display: inline-block;
  transition: color 250ms, text-shadow 250ms;
  color: black;
  text-decoration: none;
  cursor: pointer;
  position: relative;

  &:after {
    position: absolute;
    z-index: -1;
    bottom: -1px;
    left: 50%;
    transform: translateX(-50%);
    content: "";
    width: 100%;
    height: 3px;
    background-color: ${(props) => props.theme.colors.primaryLight};
    transition: all 250ms;
  }

  &:hover {
    color: white;

    &::after {
      height: 110%;
      width: 110%;
    }
  }
`;

const MarkdownParagraph = styled(Text).attrs({
  as: "p",
})``;

const MarkdownList = styled(MarkdownParagraph).attrs({ as: "ul" })`
  margin: 0;
`;

const MarkdownListItem = styled(MarkdownParagraph).attrs({ as: "li" })(
  css({
    my: 1,
    lineHeight: "2em",
  })
);

const MarkdownLink = ({ href, children }) => {
  const isInnerLink = href.startsWith("#");
  return isInnerLink ? (
    <SectionLink section={href.substring(1, href.length)}>
      {({ onClick }) => <StyledLink onClick={onClick}>{children}</StyledLink>}
    </SectionLink>
  ) : (
    <StyledLink href={href} target="_blank">
      {children}
    </StyledLink>
  );
};

MarkdownLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default {
  p: MarkdownParagraph,
  ol: MarkdownList,
  ul: MarkdownList,
  li: MarkdownListItem,
  a: MarkdownLink,
  linkReference: MarkdownLink,
};
