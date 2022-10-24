import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { FlameIcon } from "./FlameIcon";

export default {
  title: "Components/FlameIcon",
  component: FlameIcon,
  argTypes: {},
} as ComponentMeta<typeof FlameIcon>;

const Template: ComponentStory<typeof FlameIcon> = (args) => (
  <FlameIcon {...args} />
);

export const Default = Template.bind({});

Default.args = {};
