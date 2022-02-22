import PropTypes from "prop-types";
import { Box } from "@chakra-ui/react";
import {
  AiFillCheckCircle,
  AiFillClockCircle,
  AiFillCloseCircle,
  AiFillEye,
  AiFillFileText,
  AiFillLeftCircle,
  AiFillPlayCircle,
  AiFillRightCircle,
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineCloseCircle,
  AiOutlineEye,
  AiOutlineFileText,
  AiOutlineLeftCircle,
  AiOutlinePlayCircle,
  AiOutlineRightCircle,
} from "react-icons/ai";
import { BsImageFill, BsImage } from "react-icons/bs";
import { HiLocationMarker, HiOutlineLocationMarker } from "react-icons/hi";
import { CgShoppingCart } from "react-icons/cg";
import { IoIosCart } from "react-icons/io";
import { IoGridOutline, IoGrid } from "react-icons/io5";
import { RiLockLine, RiLockFill } from "react-icons/ri";
import { MdDateRange } from "react-icons/md";

const getIcon = (type, fill) => {
  switch (type) {
    case "calender":
      return fill ? <MdDateRange /> : <MdDateRange />;

    case "check":
      return fill ? <AiFillCheckCircle /> : <AiOutlineCheckCircle />;

    case "clock":
      return fill ? <AiFillClockCircle /> : <AiOutlineClockCircle />;

    case "delete":
      return fill ? <AiFillCloseCircle /> : <AiOutlineCloseCircle />;

    case "eye":
      return fill ? <AiFillEye /> : <AiOutlineEye />;

    case "file":
      return fill ? <AiFillFileText /> : <AiOutlineFileText />;

    case "image":
      return fill ? <BsImageFill /> : <BsImage />;

    case "location":
      return fill ? <HiLocationMarker /> : <HiOutlineLocationMarker />;

    case "lock":
      return fill ? <RiLockFill /> : <RiLockLine />;

    case "menu":
      return fill ? <IoGrid /> : <IoGridOutline />;

    case "navigation-left":
      return fill ? <AiFillLeftCircle /> : <AiOutlineLeftCircle />;

    case "navigation-right":
      return fill ? <AiFillRightCircle /> : <AiOutlineRightCircle />;

    case "play":
      return fill ? <AiFillPlayCircle /> : <AiOutlinePlayCircle />;

    case "troli":
      return fill ? <IoIosCart /> : <CgShoppingCart />;

    default:
      break;
  }
};

export const Icon = ({ children, fill, type, ...rest }) => (
  <Box
    as="span"
    data-testid={type + fill ? "-fill" : ""}
    fontSize={{ base: "20px", md: "25px" }}
    {...rest}
  >
    {children || getIcon(type, fill)}
  </Box>
);

Icon.propTypes = {
  fill: PropTypes.bool,
  type: PropTypes.oneOf([
    "clock",
    "calender",
    "check",
    "delete",
    "navigation-left",
    "navigation-right",
    "image",
    "location",
    "eye",
    "play",
    "troli",
    "lock",
    "menu",
    "file",
    "",
  ]),
  children: PropTypes.any,
};
