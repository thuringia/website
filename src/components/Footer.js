import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import ReactMarkdown from "react-markdown";

import { Flex, Box } from "./Grid";
import markdownRenderer from "./MarkdownRenderer";
import { SocialLink } from "./Link";
import { Text } from "./Typography";

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
      <Text as="div" color="background" variant="light">
        <ReactMarkdown components={markdownRenderer}>
          {imprint.childMarkdownRemark.rawMarkdownBody}
        </ReactMarkdown>
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
