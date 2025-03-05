import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const IconContainer = ({ Icons = [] }) => {
  return (
    <div className="flex justify-center items-center gap-5 text-black dark:text-white">
      {Icons.map(
        ({ Icon, className = "", onClick = () => {}, tooltip = "" }, index) => {
          const IconElement = (
            <Icon
              key={index}
              className={`text-3xl cursor-pointer transition-all ${className}`}
              onClick={onClick}
            />
          );

          return tooltip ? (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger>{IconElement}</TooltipTrigger>
                <TooltipContent className="z-[100]">{tooltip}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            IconElement
          );
        }
      )}
    </div>
  );
};

export default IconContainer;
