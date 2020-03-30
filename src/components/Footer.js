import { StaticQuery, graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { Text, Flex, Box } from 'rebass';
import Fade from 'react-reveal/Fade';
import PropTypes from 'prop-types';

import SocialLink from '../components/SocialLink';

const FooterContainer = styled.footer`
  padding: 1em;
  background: ${props => props.theme.colors.primaryDark};
  color: ${props => props.theme.colors.background};
  display: flex;
  flex: 0 1 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RenponsiveLogo = styled.img`
  width: 100px;
  height: 25px;

  @media (min-width: 400px) {
    width: 150px;
    height: 35px;
  }
`;

const Logo = ({ url, logo, alt = '' }) => (
  <Box>
    <a href={url} rel="noopener noreferrer" target="_blank">
      <RenponsiveLogo src={logo} alt={alt} />
    </a>
  </Box>
);

Logo.propTypes = {
  url: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

const Footer = () => (
  <FooterContainer>
    <StaticQuery
      query={graphql`
        query FooterLinksQuery {
          contentfulAbout {
            contactMe
            socialLinks {
              id
              url
              name
              fontAwesomeIcon
            }
          }
        }
      `}
      render={({ contentfulAbout: { contactMe, socialLinks } }) => {
        return (
          <Fade bottom>
            <Flex alignItems="center" justifyContent="center" flexWrap="wrap">
              <Text key={contactMe}>{contactMe}</Text>
              {socialLinks.map(({ id, ...rest }) => (
                <Box mx={3} fontSize={[5, 6, 6]} key={id}>
                  <SocialLink {...rest} />
                </Box>
              ))}
            </Flex>
          </Fade>
        );
      }}
    />
  </FooterContainer>
);

export default Footer;
