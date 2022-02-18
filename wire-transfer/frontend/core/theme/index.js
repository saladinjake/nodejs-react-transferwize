import { extendTheme } from "@chakra-ui/react";
import breakpoints from "./breakpoints";
import colors from "./colors";

const theme = extendTheme({
  breakpoints,
  colors,
});

export default theme;