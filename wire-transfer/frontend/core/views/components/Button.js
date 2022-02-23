import PropTypes from "prop-types";
import {
  Box,
  Button as ButtonUI,
  Flex,
  IconButton as IconButtonUI,
} from "@chakra-ui/react";


import {  Icon } from "./Icon";
import {  Text } from "./Text";
import { ToolTip } from "./ToolTip"

const getVariantStyles = (variant) => {
  let variantStyles;

  switch (variant) {
    case "primary":
      variantStyles = { bg: "brand.primary", textColor: "brand.white" };
      variantStyles._active = { ...variantStyles, opacity: 0.85 };
      variantStyles._hover = { ...variantStyles, opacity: 0.85 };
      break;

    case "secondary":
      variantStyles = { bg: "brand.secondary", textColor: "brand.white" };
      variantStyles._active = { ...variantStyles, opacity: 0.85 };
      variantStyles._hover = { ...variantStyles, opacity: 0.85 };
      break;

    case "ghost":
      variantStyles = { variant: "ghost" };

    default:
      break;
  }

  return variantStyles;
};

export const Button = ({
  children,
  leftIcon,
  rightIcon,
  variant,
  sm,
  mute,
  responsive,
  ...rest
}) => {
  const getSmallSize = () => sm && { py: 0, px: 3, transform: "scale(.95)" };

 

  const renderIcon = (icon, left) => {
    const getPosition = () => {
      // meaning => left icon
      if (left === true) {
        return {
          opacity: 0.7,
          transform: "translateX(-15%)",
          mr: 2,
        };
      }
      // meaning => right icon
      if (left === false) {
        return {
          opacity: 0.5,
          transform: "translateX(15%)",
          ml: 2,
        };
      }

      // meaning => no-position icon
      if (left === undefined) {
        return {
          opacity: 1,
          transform: "scale(1.5)",
        };
      }
    };

    return <Icon {...getPosition()}>{icon}</Icon>;
  };

  const renderContent = () => (
    <>
      {/* Mobile */}
      <Flex
        alignItems="center"
        d={{
          base: responsive ? "none" : "flex",
          md: "flex",
        }}
      >
        {leftIcon && renderIcon(leftIcon, true)}

        <Text fontWeight={mute ? "normal" : "600"} m={0}>
          {children}
        </Text>

        {rightIcon && renderIcon(rightIcon, false)}
      </Flex>

      {/* Tab */}
      <Flex
        alignItems="center"
        d={{
          base: responsive ? "flex" : "none",
          md: "none",
        }}
      >
        {renderIcon(responsive)}
      </Flex>
    </>
  );

  return mute ? (
    <ButtonUI
      bg="transparent"
      transition=".1s"
      _hover={{ bg: "transparent", transform: "scale(1.005)" }}
      p={0}
      w="fit-content"
      h="fit-content"
      fontWeight="normal"
      {...rest}
    >
      {renderContent()}
    </ButtonUI>
  ) : (
    <ButtonUI
      py={6}
      px={5}
      {...getSmallSize()}
      {...getVariantStyles(variant)}
      {...rest}
    >
      {renderContent()}
    </ButtonUI>
  );
};

export const IconButton = ({
  children,
  fill,
  type,
  alwaysLg,
  variant,
  toolTip,
  toolTipPlacement,
  ...rest
}) => {
  const getType = () => {
    if (/submit/.test(type) || /reset/.test(type) || /button/.test(type))
      return type;

    return "";
  };

  return (
    <Tooltip label={toolTip} placement={toolTipPlacement}>
      <Box>
        <IconButtonUI
          type={getType() || "button"}
          isRound
          d={{ base: "flex", md: "none" }}
          fontSize="120%"
          size="sm"
          {...getVariantStyles(variant)}
          {...rest}
        >
          <Icon fill={fill} type={getType() ? "" : type} children={children} />
        </IconButtonUI>

        <IconButtonUI
          type={getType() || "button"}
          isRound
          d={{ base: "none", md: "flex" }}
          size="md"
          {...getVariantStyles(variant)}
          {...rest}
        >
          <Icon fill={fill} type={getType() ? "" : type} children={children} />
        </IconButtonUI>
      </Box>
    </Tooltip>
  );
};

Button.propTypes = {
  children: PropTypes.any,
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
  variant: PropTypes.oneOf(["secondary", "primary", ""]),
  sm: PropTypes.bool,
  mute: PropTypes.bool,
  responsive: PropTypes.element,
};

IconButton.propTypes = {
  fill: PropTypes.bool,
  type: PropTypes.string,
  toolTip: PropTypes.string,
  toolTipPlacement: PropTypes.string,
  /**
   * Don't change `size` due to media-query
   */
  alwaysLg: PropTypes.bool,
};
