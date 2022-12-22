import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Frame } from "./_frame";

import * as amazon from "./amazon";

export default {
  title: "Filter/Amazon",
  component: Frame,
  argTypes: {},
} as ComponentMeta<typeof Frame>;

const Template: ComponentStory<typeof Frame> = ({ src, onLoad }) => {
  return <Frame src={src} onLoad={onLoad} />;
};

export const FilterAverageCustomerReviewsOnContentPage = Template.bind({});
FilterAverageCustomerReviewsOnContentPage.args = {
  src: "amazon/amazon.html",
  onLoad: amazon._filterAverageCustomerReviewsOnContentPage,
};

export const FilterReviewPage = Template.bind({});
FilterReviewPage.args = {
  src: "amazon2/amazon.html",
  onLoad: amazon._filterReviewPage,
};

// export const FilterAverageCustomerReviewsOnContentPage = Template.bind({});
