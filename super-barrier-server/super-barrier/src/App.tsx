import * as React from "react";
import Sensors from "@mui/icons-material/Sensors";
import SuperBarrierButton from "./SuperBarrierButton";
import SpeedDialAction from "@mui/material/SpeedDialAction";

export const App: React.FC = () => {
  const actions = [
    {
      icon: <Typography>1</Typography>,
      name: "Copy",
      onClick: () => alert("hoge"),
    },
    { icon: <Typography>2</Typography>, name: "Save", onClick: undefined },
    { icon: <Typography>3</Typography>, name: "Print", onClick: undefined },
    { icon: <Typography>4</Typography>, name: "Share", onClick: undefined },
  ];
  return (
    <div>
      <SuperBarrierButton>
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => action.onClick && action.onClick()}
          />
        ))}
      </SuperBarrierButton>
    </div>
  );
};
