import { Link as GatsbyLink } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faGlobe } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faTwitter,
  faXing,
  faMastodon,
} from "@fortawesome/free-brands-svg-icons";
import PropTypes from "prop-types";
import styled from "styled-components";
import { color, compose, variant } from "styled-system";
import React from "react";
import { Tooltip } from "react-tippy";

import { Box } from "./Grid";
import css from "@styled-system/css";
import { Text } from "./Typography";

export const Link = styled(Text).attrs({ as: "a" })(
  compose(variant({ scale: "links" }))
);

export const Mouse = styled(Link)`
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;

  @media only screen and (max-width: 700px) {
    display: none;
  }
`;

export const Pill = styled(Link)(
  css({
    bg: "background",
    transition: "box-shadow 0.3s ease-in-out",
    boxShadow: "large",
    "&:hover": {
      boxShadow: "larger",
    },
    borderRadius: 50,
    p: 3,
    mb: 4,
    fontSize: 4,
    textDecoration: "none",
  })
);

export const LinkAnimated = styled.div.attrs((props) => ({
  as: props.href ? "a" : "span",
}))`
  text-decoration: none;
  position: relative;
  margin-bottom: 0;
  padding-bottom: 5px;
  color: inherit;
  ${(props) =>
    props.selected &&
    `border-bottom:  5px solid ${props.theme.colors.primaryLight}`};
  transition: 0.4s;
  cursor: ${(props) => (props.onClick || props.href ? "pointer" : "default")};

  &:after {
    content: "";
    position: absolute;
    right: 0;
    width: 0;
    bottom: -5px;
    background: ${(props) => props.theme.colors.secondaryLight};
    height: 5px;
    transition-property: width;
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
  }

  &:hover:after {
    left: 0;
    right: auto;
    width: 100%;
  }
`;

export const RouteLink = ({ onClick, selected, children }) => (
  <Box ml={[2, 3]} color="background" fontSize={[2, 3]}>
    <LinkAnimated onClick={onClick} selected={selected}>
      {children}
    </LinkAnimated>
  </Box>
);

RouteLink.propTypes = {
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  children: PropTypes.node,
};

const iconMap = {
  envelope: faEnvelope,
  github: faGithub,
  globe: faGlobe,
  linkedin: faLinkedin,
  twitter: faTwitter,
  xing: faXing,
  mastodon: faMastodon,
};

const IconLink = styled.div.attrs((props) => ({
  as: props.href.startsWith("/") ? GatsbyLink : Link,
}))`
  ${color}
  transition: color 0.5s;

  &:hover {
    color: ${(props) => props.theme.colors[`${props.color}Light`]};
  }
`;

export const SocialLink = ({ fontAwesomeIcon, name, url, ...props }) => (
  <Tooltip title={name} position="bottom">
    <IconLink href={url} target="_blank" color="primary" {...props}>
      <FontAwesomeIcon icon={iconMap[fontAwesomeIcon]} />
    </IconLink>
  </Tooltip>
);

SocialLink.propTypes = {
  fontAwesomeIcon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default { LinkAnimated, RouteLink, Link, Mouse, Pill };
