import * as React from "react";
import Box from "@mui/material/Box";
import { lightBlue } from "@mui/material/colors";

export interface FlameIconProps {
  size?: number | string;
  animationTime?: number;
  borderRadius?: number | string;
  nSparks?: number;
}

export const FlameIcon: React.FC<FlameIconProps> = ({
  size = "20vw",
  animationTime = 1.5,
  borderRadius = "1vh",
  nSparks = 4,
}) => {
  // const l1 = "#FFDC01";
  // const l2 = "#FDAC01";
  // const l3 = "#F73B01";

  // const l1 = "#D6F9FE";
  // const l2 = "#279FFE";
  // const l3 = "#0D52C5";
  const l1 = lightBlue[500];
  const l2 = lightBlue[300];
  const l3 = lightBlue[100];

  const animation = {
    "@keyframes flameodd": {
      "0%, 100%": {
        width: "0%",
        height: "0%",
      },
      "25%": {
        width: "100%",
        height: "100%",
        right: "1%",
        bottom: "2%",
      },
      "0%": {
        backgroundColor: l1,
        zIndex: 100,
        right: "0%",
        bottom: "0%",
      },
      "40%": {
        backgroundColor: l2,
        zIndex: 1000,
      },
      "100%": {
        backgroundColor: l3,
        zIndex: -10,
        right: "150%",
        bottom: "170%",
      },
    },

    "@keyframes flameeven": {
      "0%, 100%": {
        width: "0%",
        height: "0%",
      },
      "25%": {
        width: "100%",
        height: "100%",
        right: "2%",
        bottom: "1%",
      },
      "0%": {
        backgroundColor: l1,
        zIndex: 1000000,
        right: "0%",
        bottom: "0%",
      },
      "40%": {
        backgroundColor: l2,
        zIndex: 1000000,
      },
      "100%": {
        backgroundColor: l3,
        zIndex: -10,
        right: "170%",
        bottom: "150%",
      },
    },
  };

  const fire = {
    position: "absolute",
    // top: "50%",
    // left: "50%",
    transform: "translate(-50%, -25%)",
    height: size,
    width: size,
    // backgroundColor: "red",
  };

  const flames = {
    position: "absolute",
    bottom: "40%",
    left: "50%",
    width: "60%",
    height: "60%",
    //background-color:$red,
    transform: "translateX(-50%)rotate(45deg)",
  };

  return (
    <Box sx={animation}>
      <Box sx={fire}>
        <Box sx={flames}>
          {[...Array(nSparks)].map((_, i) => (
            <Box
              key={i}
              sx={{
                position: "absolute",
                right: "0%",
                bottom: "0%",
                width: "0%",
                height: "0%",
                backgroundColor: l1,
                borderRadius: borderRadius,
                animation: `${
                  i % 2 == 0 ? "flameeven" : "flameodd"
                } ${animationTime}s ease-in infinite`,
                animationDelay: `${(animationTime / nSparks) * i}s`,
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default FlameIcon;
