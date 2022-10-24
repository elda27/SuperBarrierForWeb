import * as React from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import Fade from "@mui/material/Fade";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import IconButton from "@mui/material/IconButton";

import FlameIcon from "./components/FlameIcon";
import { Typography } from "@mui/material";

export interface SuperBarrierButtonProps {
  size?: string;
  marginR?: string;
  charEdgeSize?: string;
  children?: React.ReactNode;
}

export const SuperBarrierButton: React.FC<SuperBarrierButtonProps> = ({
  children,
  size = "15vw",
  marginR = "15vw",
  charEdgeSize = "2px",
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Backdrop open={open} />
      <SpeedDial
        // direction="left"
        ariaLabel="SpeedDial tooltip"
        sx={{ position: "absolute", right: marginR, bottom: marginR }}
        // sx={{ transform: "translateZ(0px)" }}
        icon={
          <Fade in={!open}>
            <IconButton>
              <FlameIcon size={size} />
              <Typography
                sx={{
                  zIndex: 100000000,
                  position: "absolute",
                  fontSize: "3rem",

                  textShadow: `
                  -${charEdgeSize} -${charEdgeSize} 0 #eee,
                  ${charEdgeSize} -${charEdgeSize} 0 #eee,
                  -${charEdgeSize} ${charEdgeSize} 0 #eee,
                  ${charEdgeSize} ${charEdgeSize} 0 #eee;
                `,
                }}
              >
                超
              </Typography>
            </IconButton>
          </Fade>
        }
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        {children}
      </SpeedDial>
    </>
  );
};

export default SuperBarrierButton;
