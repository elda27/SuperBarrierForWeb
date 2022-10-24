import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { WarningAlart } from "./WarningAlart";

export default {
  title: "Dialog/WarningAlart",
  component: WarningAlart,
  argTypes: {},
} as ComponentMeta<typeof WarningAlart>;

const Template: ComponentStory<typeof WarningAlart> = (args) => (
  <WarningAlart {...args} />
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
