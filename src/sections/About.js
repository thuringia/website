import { StaticQuery, graphql } from "gatsby";
import React from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import Fade from "react-reveal/Fade";

import { Box, Image, Flex } from "../components/Grid";
import markdownRenderer from "../components/MarkdownRenderer";
import Triangle from "../components/Triangle";
import Section from "../components/Section";
import { Text } from "../components/Typography";

const Background = () => (
  <div>
    <Triangle
      color="secondaryLightSoft"
      height={["50vh", "15vh"]}
      width={["50vw", "50vw"]}
      invertY
    />

    <Triangle
      color="primaryDarkSoft"
      height={["20vh", "40vh"]}
      width={["75vw", "70vw"]}
      invertX
    />

    <Triangle
      color="backgroundDarkSoft"
      height={["25vh", "20vh"]}
      width={["100vw", "100vw"]}
    />
  </div>
);

const ProfilePicture = styled(Image)`
  border-radius: 50%;
  transition: all 0.25s ease-out;

  &:hover {
    border-radius: 20%;
  }
`;

const About = () => (
  <Section.Container id="about" Background={Background}>
    <Section.Header
      mt={5}
      name="Hello"
      icon="🙋‍♂️"
      text={"I'm Robert, a freelance consultant and architect specializing in:"}
      label="person"
    />
    <StaticQuery
      query={graphql`
        query AboutMeQuery {
          contentfulAbout {
            aboutMe {
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
            profile {
              title
              image: resize(width: 450, quality: 100) {
                src
              }
            }
          }
        }
      `}
      render={(data) => {
        const { aboutMe, profile } = data.contentfulAbout;
        return (
          <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
            <Box width={[1, 1, 4 / 6]} px={[1, 2, 4]}>
              <Fade bottom>
                <Text as="div" variant="copy">
                  <ReactMarkdown components={markdownRenderer}>
                    {aboutMe.childMarkdownRemark.rawMarkdownBody}
                  </ReactMarkdown>
                </Text>
              </Fade>
            </Box>

            <Box
              width={[1, 1, 2 / 6]}
              style={{ maxWidth: "300px", margin: "auto" }}
            >
              <Fade right>
                <ProfilePicture
                  src={profile.image.src}
                  alt={profile.title}
                  mt={[4, 4, 0]}
                  ml={[0, 0, 1]}
                />
              </Fade>
            </Box>
          </Flex>
        );
      }}
    />
  </Section.Container>
);

export default About;
