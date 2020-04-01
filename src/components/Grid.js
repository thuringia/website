import styled from "styled-components";
import {
  color,
  compose,
  flexbox,
  layout,
  space,
  typography,
} from "styled-system";

export const Box = styled.div(compose(space, layout, color, typography));

export const Flex = styled(Box)`
  ${flexbox}

  display: flex;
`;

export const Image = styled(Box).attrs({ as: "img" })`
  max-width: 100%;
  height: auto;
`;

export default { Box, Flex, Image };
