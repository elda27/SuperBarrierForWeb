import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PageSelector } from "./PageSelector";

export default {
  title: "Components/PageSelector",
  component: PageSelector,
  argTypes: {},
} as ComponentMeta<typeof PageSelector>;

const Template: ComponentStory<typeof PageSelector> = (args) => (
  <PageSelector {...args} />
);

export const Default = Template.bind({});

Default.args = {};

export const VisibleNoContent = Template.bind({});

VisibleNoContent.args = {
  open: true,
  onClicked: (url) => {
    alert(url);
  },
};

export const VisibleFilledContent = Template.bind({});

VisibleFilledContent.args = {
  open: true,
  items: [
    {
      title: "GitHub",
      url: "https://github.com",
      avaterImage:
        "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    },
    {
      title: "Super barrier",
      url: "https://Super barrier.com",
    },
  ],
  onClicked: (url) => {
    alert(url);
  },
};
