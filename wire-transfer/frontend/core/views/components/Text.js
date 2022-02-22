import PropTypes from "prop-types";
import { Text as TextUI } from "@chakra-ui/react";

import { Tooltip } from "./ToolTip";
export const FONT_FAMILY = "'Inter', sans-serif";

const getStyle = (type, fontWeight, lineHeight) => {
  switch (type) {
    case "lg-bold":
      return {
        fontSize: { base: "18px", md: "19px" },
        lineHeight: lineHeight || { base: "27px", md: "28px" },
        fontWeight: fontWeight || { base: "500", md: "bold" },
      };
    case "lg-regular":
      return {
        fontSize: { base: "18px", md: "19px" },
        lineHeight: lineHeight || { base: "27px", md: "28px" },
        fontWeight: fontWeight || "normal",
      };

    case "md-bold":
      return {
        fontSize: "15.5px",
        lineHeight: lineHeight || "26px",
        fontWeight: fontWeight || { base: "500", md: "bold" },
      };
    case "md-regular":
      return {
        fontSize: "15.5px",
        lineHeight: lineHeight || "26px",
        fontWeight: fontWeight || "normal",
      };

    case "nm-bold":
      return {
        fontSize: "13px",
        lineHeight: lineHeight || "25px",
        fontWeight: fontWeight || { base: "600", md: "bold" },
      };
    case "nm-regular":
      return {
        fontSize: "13px",
        lineHeight: lineHeight || "25px",
        fontWeight: fontWeight || "normal",
      };

    case "sm-bold":
      return {
        fontSize: "10.5px",
        lineHeight: lineHeight || "18px",
        fontWeight: fontWeight || { base: "600", md: "bold" },
      };
    case "sm-regular":
      return {
        fontSize: "10.5px",
        lineHeight: lineHeight || "18px",
        fontWeight: fontWeight || "normal",
      };

    default:
      break;
  }
};

export const Text = ({
  children,
  color,
  fontWeight,
  lineHeight,
  type = "nm-regular",
  isTruncated,
  toolTip,
  mute,
  ...rest
}) => {
  const style = getStyle(type, fontWeight, lineHeight);

  return (
    <Tooltip
      // Configure tooltip
      {...((isTruncated && isTruncated !== true) || toolTip
        ? { label: toolTip || isTruncated }
        : {})}
      {...rest}
    >
      <TextUI
        textColor={color}
        mb={mute ? 0 : 5}
        isTruncated={isTruncated ? true : false}
        {...rest}
        {...style}
        fontFamily={FONT_FAMILY}
      >
        {children}
      </TextUI>
    </Tooltip>
  );
};

Text.propTypes = {
  children: PropTypes.any,
  isTruncated: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  toolTip: PropTypes.string,
  color: PropTypes.any,
  fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lineHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.oneOf([
    "lg-bold",
    "lg-regular",
    "md-bold",
    "md-regular",
    "nm-bold",
    "nm-regular",
    "sm-bold",
    "sm-regular",
  ]),
};
