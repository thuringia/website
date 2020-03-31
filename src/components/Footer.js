import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Text, Flex, Box } from "rebass/styled-components";

import markdownRenderer from "./MarkdownRenderer";
import SocialLink from "./SocialLink";

export default () => {
  const {
    contentfulAbout: { contactMe, socialLinks, imprint },
  } = useStaticQuery(graphql`
    query FooterLinksQuery {
      contentfulAbout {
        contactMe
        imprint {
          childMarkdownRemark {
            rawMarkdownBody
          }
        }
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
    <Flex
      bg="primary"
      padding={3}
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
    >
      <Text color="background">
        <ReactMarkdown
          source={imprint.childMarkdownRemark.rawMarkdownBody}
          renderers={markdownRenderer}
        />
      </Text>
      <Flex alignItems="center">
        <Text color="background" key={contactMe}>
          {contactMe}
        </Text>
        {socialLinks.map(({ id, ...rest }) => (
          <Box mx={3} fontSize={[5, 6, 6]} key={id}>
            <SocialLink color="background" {...rest} />
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};
