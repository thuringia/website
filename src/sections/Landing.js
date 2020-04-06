import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faQuestionCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { graphql, useStaticQuery } from "gatsby";
import { find, get } from "lodash/fp";
import React from "react";
import TextLoop from "react-text-loop";
import { SectionLink } from "react-scroll-section";
import { Tooltip } from "react-tippy";

import { Box, Flex } from "../components/Grid";
import { SocialLink, Pill, Mouse } from "../components/Link";
import Section from "../components/Section";
import Triangle from "../components/Triangle";
import { Heading, HeadingHero, Text } from "../components/Typography";

const Background = () => (
  <div>
    <Triangle
      color="backgroundDark"
      height={["35vh", "80vh"]}
      width={["95vw", "50vw"]}
    />

    <Triangle
      color="secondarySoft"
      height={["38vh", "80vh"]}
      width={["50vw", "30vw"]}
    />

    <Triangle
      color="primaryDarkSoft"
      height={["25vh", "35vh"]}
      width={["75vw", "60vw"]}
      invertX
    />

    <Triangle
      color="backgroundDarkSoft"
      height={["20vh", "20vh"]}
      width={["100vw", "100vw"]}
      invertX
      invertY
    />
  </div>
);

export default () => {
  const {
    contentfulAbout: { name, socialLinks, roles, available, availableFrom },
  } = useStaticQuery(graphql`
    query SiteTitleQuery {
      contentfulAbout {
        name
        roles
        available
        availableFrom
        socialLinks {
          id
          url
          name
          fontAwesomeIcon
        }
      }
    }
  `);

  return (
    <Section.Container id="home" Background={Background}>
      <>
        <Heading
          as="h2"
          color="primary"
          fontSize={[5, 5, 6]}
          textAlign="center"
          mt={[5, 6]}
          mb={4}
        >
          <TextLoop>
            {roles.map((text) => (
              <Text as="span" width={[300, 500]} key={text}>
                {text}
              </Text>
            ))}
          </TextLoop>
        </Heading>
        <HeadingHero as="h1" variant="hero">
          {`Hello, I'm ${name}!`}
        </HeadingHero>
        <Flex alignItems="center" justifyContent="center" flexWrap="wrap">
          <Pill
            mt={4}
            color={available ? "primary" : "primaryDark"}
            href={get(
              "url",
              find({ fontAwesomeIcon: "envelope" }, socialLinks)
            )}
          >
            <FontAwesomeIcon
              icon={available ? faQuestionCircle : faTimesCircle}
            />
            <Text as="span" ml={2}>
              {available
                ? `available from: ${availableFrom}`
                : `unavailable until: ${availableFrom}`}
            </Text>
          </Pill>
        </Flex>

        <Flex alignItems="center" justifyContent="center">
          {socialLinks.map(({ id, ...rest }) => (
            <Box mx={3} fontSize={[5, 6, 6]} key={id}>
              <SocialLink color="primary" {...rest} />
            </Box>
          ))}
        </Flex>

        <SectionLink section="about">
          {({ onClick }) => (
            <Mouse
              color="background"
              fontSize={6}
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                onClick();
              }}
            >
              <Tooltip title="About me" position="top">
                <FontAwesomeIcon icon={faChevronDown} />
              </Tooltip>
            </Mouse>
          )}
        </SectionLink>
      </>
    </Section.Container>
  );
};
