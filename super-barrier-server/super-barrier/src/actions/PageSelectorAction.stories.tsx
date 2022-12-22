import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import PageSelectorAction from "./PageSelectorAction";

export default {
  title: "Actions/PageSelectorAction",
  component: PageSelectorAction,
  argTypes: {},
} as ComponentMeta<typeof PageSelectorAction>;

const Template: ComponentStory<typeof PageSelectorAction> = (args) => {
  return (
    <div style={{ position: "absolute", textAlign: "center", left: "10em" }}>
      <PageSelectorAction open={true} {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = { open: true };
