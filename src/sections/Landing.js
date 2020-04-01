import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { graphql, useStaticQuery } from "gatsby";
import { find, get } from "lodash/fp";
import React from "react";
import TextLoop from "react-text-loop";
import { SectionLink } from "react-scroll-section";

import { Box, Flex } from "../components/Grid";
import { SocialLink } from "../components/Link";
import MouseIcon from "../components/MouseIcon";
import Section from "../components/Section";
import Triangle from "../components/Triangle";
import { Heading, HeadingHero, Text } from "../components/Typography";

const Background = () => (
  <div>
    <Triangle
      color="backgroundDark"
      height={["35vh", "80vh"]}
      width={["95vw", "60vw"]}
    />

    <Triangle
      color="secondarySoft"
      height={["38vh", "80vh"]}
      width={["50vw", "35vw"]}
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
        <Flex
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          mt={6}
          color={available ? "primary" : "primaryDark"}
        >
          <Section.Header
            fontSize={8}
            color="red"
            href={get(
              "url",
              find({ fontAwesomeIcon: "envelope" }, socialLinks)
            )}
            icon={
              <FontAwesomeIcon
                icon={available ? faQuestionCircle : faTimesCircle}
              />
            }
            text={
              available
                ? `available from: ${availableFrom}`
                : `unavailable until: ${availableFrom}`
            }
          />
        </Flex>
        <HeadingHero as="h1" variant="hero">
          {`Hello, I'm ${name}!`}
        </HeadingHero>

        <Heading
          as="h2"
          color="primary"
          fontSize={[4, 5, 6]}
          mb={[3, 5]}
          textAlign="center"
        >
          <TextLoop>
            {roles.map((text) => (
              <Text as="span" width={[300, 500]} key={text}>
                {text}
              </Text>
            ))}
          </TextLoop>
        </Heading>

        <Flex
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          mb={4}
        >
          {socialLinks.map(({ id, ...rest }) => (
            <Box mx={3} fontSize={[5, 6, 6]} key={id}>
              <SocialLink color="primary" {...rest} />
            </Box>
          ))}
        </Flex>

        <SectionLink section="about">
          {({ onClick }) => <MouseIcon onClick={onClick} />}
        </SectionLink>
      </>
    </Section.Container>
  );
};
