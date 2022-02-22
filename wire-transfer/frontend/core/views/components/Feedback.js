import { Flex } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import {  Icon } from "./Icon";
import {  Text } from "./Text";
import { Button } from "./Button"

import { MdError } from "react-icons/md";

const Wrapper = ({ icon, text, children, ...rest }) => (
  <Flex
    flexDir="column"
    h="60vh"
    justifyContent="center"
    alignItems="center"
    textAlign="center"
    color="brand.secondary"
    {...rest}
    margin="0px auto"
  >
    {icon}
    <Text type="lg-bold">{text}</Text>
    {children}
  </Flex>
);

export const Loader = ({ message, ...rest }) => (
  <Wrapper icon={<Spinner />} text={message} {...rest} />
);

//
export const SomethingWentWrong = ({
  message = "Sorry, something went wrong",
  description,
  onRetry,
  ...rest
}) => (
  <Wrapper
    icon={
      <Icon fontSize="2rem">
        <MdError />
      </Icon>
    }
    text={message}
    {...rest}
  >
    {description && <Text type="md-regular">{description}</Text>}
    {onRetry && (
      <Button onClick={onRetry} sm variant="secondary" mt={2}>
        Retry
      </Button>
    )}
  </Wrapper>
);
