import * as React from "react";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import WebIcon from "@mui/icons-material/Web";

export interface PageSelectorActionProps {
  open?: boolean;
  onClick?: () => void;
}

export const PageSelectorAction: React.FC<PageSelectorActionProps> = ({
  open,
  onClick,
}) => {
  return (
    <SpeedDialAction
      open={open}
      icon={<WebIcon />}
      tooltipTitle={"ページ切り替え"}
      tooltipOpen
      onClick={onClick}
    />
  );
};

export default PageSelectorAction;
