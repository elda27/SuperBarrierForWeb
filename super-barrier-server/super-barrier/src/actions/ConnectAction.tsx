import * as React from "react";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Sensors from "@mui/icons-material/Sensors";
import SensorsOff from "@mui/icons-material/SensorsOff";

export interface ConnectActionProps {
  open?: boolean;
  readyConnection: boolean;
  onClick?: () => void;
}

export const ConnectAction: React.FC<ConnectActionProps> = ({
  open,
  readyConnection,
  onClick,
}) => {
  return (
    <SpeedDialAction
      open={open}
      icon={readyConnection ? <Sensors /> : <SensorsOff />}
      tooltipTitle={readyConnection ? "超結界発動" : "超結界祈祷中"} // 気絶中
      tooltipOpen
      onClick={onClick}
    />
  );
};

export default ConnectAction;
