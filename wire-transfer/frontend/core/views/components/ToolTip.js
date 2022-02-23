import { Tooltip as TooltipUI } from "@chakra-ui/tooltip";

export const Tooltip = ({ label, children, ...rest }) => {
  return (
    <TooltipUI hasArrow label={label} aria-label={label} {...rest}>
      {children}
    </TooltipUI>
  );
};
