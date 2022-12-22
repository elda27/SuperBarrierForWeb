import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AppButton } from "./AppButton";

export default {
  title: "ui/AppButton",
  component: AppButton,
  argTypes: {},
} as ComponentMeta<typeof AppButton>;

const Template: ComponentStory<typeof AppButton> = (args) => (
  <AppButton {...args} />
);

export const Default = Template.bind({});

Default.args = {};
