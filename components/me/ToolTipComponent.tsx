import { ReactNode } from "react";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip";

const ToolTipComponent = ({
  children,
  hoverText,
}: {
  children: ReactNode;
  hoverText: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>{hoverText}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolTipComponent;
