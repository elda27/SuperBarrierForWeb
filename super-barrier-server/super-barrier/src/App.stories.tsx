import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import { App } from "./App";

export default {
  title: "Main/App",
  component: App,
  argTypes: {},
} as ComponentMeta<typeof App>;

interface Props {
  src?: string;
  url?: string;
}

const Template: Story<Props> = ({ src, url }) => {
  const ref = React.useRef<HTMLIFrameElement>(null);

  return (
    <div>
      <iframe ref={ref} id="iframe" width={1920} height={1080} src={src} />
      <App document={ref?.current?.contentDocument ?? document} url={url} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Amazon = Template.bind({});
Amazon.args = {
  src: "amazon/amazon.html",
  url: "https://amazon.co.jp/test-item/dp/test?content-id=test",
};
export const Amazon2 = Template.bind({});
Amazon2.args = {
  src: "amazon2/amazon2.html",
  url: "https://amazon.co.jp/test-item/dp/test",
};
