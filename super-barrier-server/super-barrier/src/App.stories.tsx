import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { App } from "./App";

export default {
  title: "Main/App",
  component: App,
  argTypes: {},
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App {...args} />;

export const Default = Template.bind({});

Default.args = {};
