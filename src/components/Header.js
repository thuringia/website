import { capitalize } from "lodash/fp";
import React from "react";
import Headroom from "react-headroom";
import Fade from "react-reveal/Fade";
import { SectionLinks } from "react-scroll-section";
import styled from "styled-components";

import Logo from "./Logo/Portfolio.svg";

import { Flex, Image } from "./Grid";
import { RouteLink } from "./Link";

const HeaderContainer = styled(Headroom)`
  .headroom--pinned {
    background: ${(props) => props.theme.colors.primaryDark};
    box-shadow: ${(props) => props.theme.shadows.large};
  }

  position: absolute;
  top: 0;
  width: 100%;
`;

const formatLinks = (allLinks) =>
  Object.entries(allLinks).reduce(
    (acc, [key, value]) => {
      const isHome = key === "home";
      return isHome
        ? {
            ...acc,
            home: value,
          }
        : {
            ...acc,
            links: [...acc.links, { name: capitalize(key), value }],
          };
    },
    { links: [], home: null }
  );

const Header = () => (
  <HeaderContainer>
    <Fade top>
      <Flex
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        p={3}
      >
        <SectionLinks>
          {({ allLinks }) => {
            const { home, links } = formatLinks(allLinks);

            const homeLink = home && (
              <Image
                src={Logo}
                width="50px"
                alt="Portfolio Logo"
                onClick={home.onClick}
                style={{
                  cursor: "pointer",
                }}
              />
            );
            const navLinks = links.map(({ name, value }) => (
              <RouteLink
                key={name}
                onClick={value.onClick}
                selected={value.selected}
              >
                {name}
              </RouteLink>
            ));

            return (
              <>
                {homeLink}
                <Flex mr={[0, 3, 5]}>{navLinks}</Flex>
              </>
            );
          }}
        </SectionLinks>
      </Flex>
    </Fade>
  </HeaderContainer>
);

export default Header;
