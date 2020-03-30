import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faGlobe } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faXing,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "rebass";
import { Tooltip } from "react-tippy";
import styled from "styled-components";
import PropTypes from "prop-types";

const iconMap = {
  envelope: faEnvelope,
  github: faGithub,
  globe: faGlobe,
  linkedin: faLinkedin,
  twitter: faTwitter,
  xing: faXing,
};
const IconLink = styled(Link)`
  transition: color 0.5s;
  color: ${(props) => props.theme.colors.primary};

  &:hover {
    color: ${(props) => props.theme.colors.primaryLight};
  }
`;

const SocialLink = ({ fontAwesomeIcon, name, url }) => (
  <Tooltip title={name} position="bottom" trigger="mouseenter">
    <IconLink href={url} target="_blank">
      <FontAwesomeIcon icon={iconMap[fontAwesomeIcon]} />
    </IconLink>
  </Tooltip>
);

SocialLink.propTypes = {
  fontAwesomeIcon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default SocialLink;
