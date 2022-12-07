import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ConnectionStatusDialog } from "./ConnectionStatusDialog";

export default {
  title: "Dialog/ConnectionStatusDialog",
  component: ConnectionStatusDialog,
  argTypes: {},
} as ComponentMeta<typeof ConnectionStatusDialog>;

const Template: ComponentStory<typeof ConnectionStatusDialog> = (args) => (
  <ConnectionStatusDialog {...args} />
);

export const Default = Template.bind({});

Default.args = {};

export const VisibleAndDeactivated = Template.bind({});

VisibleAndDeactivated.args = {
  open: true,
  onAccept: () => {
    alert("Accept");
  },
  onReject: () => {
    alert("Reject");
  },
};
export const VisibleAndActivated = Template.bind({});

VisibleAndActivated.args = {
  open: true,
  status: {
    isConnected: true,
    rssi: undefined,
    battery: undefined,
  },
  onAccept: () => {
    alert("Accept");
  },
  onReject: () => {
    alert("Reject");
  },
};
