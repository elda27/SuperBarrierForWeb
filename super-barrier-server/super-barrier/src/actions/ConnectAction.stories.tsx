import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import Backdrop from "@mui/material/Backdrop";

import ConnectAction from "./ConnectAction";

export default {
  title: "Actions/ConnectAction",
  component: ConnectAction,
  argTypes: {},
} as ComponentMeta<typeof ConnectAction>;

const Template: ComponentStory<typeof ConnectAction> = (args) => {
  return (
    <div style={{ position: "absolute", textAlign: "center", left: "10em" }}>
      <ConnectAction open={true} {...args} />
    </div>
  );
};

export const Await = Template.bind({});
Await.args = { readyConnection: false };

export const Ready = Template.bind({});
Ready.args = { readyConnection: true };
