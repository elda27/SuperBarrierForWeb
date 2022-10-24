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

export const Visible = Template.bind({});

Visible.args = {
  open: true,
  onAccept: () => {
    alert("Accept");
  },
  onReject: () => {
    alert("Reject");
  },
};
