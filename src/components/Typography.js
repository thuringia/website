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
  marginBottom: [5, 4, 5],
})``;

export const HeadingSection = styled(Heading).attrs({
  as: "h2",
  color: "secondaryDark",
  fontSize: 4,
  fontWeight: 300,
})(
  css({
    marginBottom: 4,
  })
);

export default { Text, Heading, HeadingHero, HeadingSection };
