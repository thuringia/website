import { Link } from "gatsby";
import { Heading, Box, Text } from "rebass/styled-components";
import React from "react";

import Layout from "../components/Layout";
import Section from "../components/Section";
import Triangle from "../components/Triangle";

const Background = () => (
  <div>
    <Triangle
      color="backgroundDark"
      height={["35vh", "80vh"]}
      width={["95vw", "60vw"]}
    />

    <Triangle
      color="primary"
      height={["25vh", "35vh"]}
      width={["75vw", "60vw"]}
      invertX
    />

    <Triangle
      color="secondaryLight"
      height={["10vh", "20vh"]}
      width={["50vw", "50vw"]}
      invertX
      invertY
    />
  </div>
);

const NotFoundPage = () => (
  <Layout>
    <Section.Container id="404" Background={Background}>
      <Box width={[320, 400, 600]} m="auto">
        <Heading color="primary" fontSize={["9rem", "13rem", "16rem"]}>
          404
        </Heading>
        <Text color="primary" fontSize="3rem" mb={4}>
          This is not the content you are looking for…
        </Text>
        <Heading color="primary" fontSize="2rem">
          <Link to="/">Back to Home</Link>
        </Heading>
      </Box>
    </Section.Container>
  </Layout>
);

export default NotFoundPage;
