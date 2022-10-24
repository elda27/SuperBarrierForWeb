import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Typography from "@mui/material/Typography";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { SuperBarrierButton } from "./SuperBarrierButton";

export default {
  title: "Main/SuperBarrierButton",
  component: SuperBarrierButton,
  argTypes: {},
} as ComponentMeta<typeof SuperBarrierButton>;

const Template: ComponentStory<typeof SuperBarrierButton> = (args) => {
  const actions = [
    {
      icon: <Typography>1</Typography>,
      name: "Copy",
      onClick: () => alert("hoge"),
    },
    { icon: <Typography>2</Typography>, name: "Save", onClick: undefined },
    { icon: <Typography>3</Typography>, name: "Print", onClick: undefined },
    { icon: <Typography>4</Typography>, name: "Share", onClick: undefined },
  ];
  return (
    <SuperBarrierButton {...args}>
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          tooltipOpen
          onClick={() => action.onClick && action.onClick()}
        />
      ))}
    </SuperBarrierButton>
  );
};

export const Default = Template.bind({});

Default.args = {};
