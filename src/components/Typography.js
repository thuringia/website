import styled from "styled-components";
import { color, compose, space, typography, variant } from "styled-system";
import css from "@styled-system/css";

export const Text = styled.p(
  compose(color, space, typography, variant({ scale: "text" }))
);

export const Heading = styled(Text)(compose(variant({ scale: "headings" })));

export const HeadingHero = styled(Heading).attrs({
  textAlign: "center",
  color: "primary",
  fontSize: [5, 6, 8],
  fontWeight: 500,
  marginTop: 0,
  marginBottom: [4, 4, 2],
})``;

export const HeadingSection = styled(Heading).attrs({
  as: "h2",
  color: "secondaryDark",
  fontWeight: 300,
})(
  css({
    fontSize: 4,
    marginBottom: [4, 5],
  })
);

export default {
  Text,
  Heading,
  HeadingHero,
  HeadingSection,
};
