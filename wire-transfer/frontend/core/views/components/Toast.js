import { Box, Flex } from "@chakra-ui/layout";
import { Icon } from "./Icon";
import { Text } from "./Text"
import { AiFillCheckCircle } from "react-icons/ai";
import { BiErrorAlt, BiErrorCircle } from "react-icons/bi";

export const Toast = ({ status, icon, title, description, ...rest }) => {
  const getBg = () =>
    status === "success"
      ? "brand.success"
      : status === "error"
      ? "brand.error"
      : "brand.info";

  const getIcon = () =>
    status === "success" ? (
      <AiFillCheckCircle />
    ) : status === "error" ? (
      <BiErrorAlt />
    ) : (
      <BiErrorCircle />
    );

  return (
    <Flex
      color="brand.white"
      rounded="md"
      p={2}
      boxShadow="0 0 5px rgba(0, 0, 0, 0.5)"
      bg={getBg()}
      alignItems={
        description && title ? { base: "center", md: "flex-start" } : "center"
      }
      w="300px"
      {...rest}
    >
      <Icon pr={2} fontSize="130%">
        {icon || getIcon()}
      </Icon>

      {/* Mobile */}
      <Text d={{ base: "block", md: "none" }} m={0}>
        {description || title}
      </Text>

      {/* From Tab */}
      <Box d={{ base: "none", md: "block" }}>
        <Text type="nm-bold" m={0}>
          {title}
        </Text>
        <Text m={0}>{description}</Text>
      </Box>
    </Flex>
  );
};
