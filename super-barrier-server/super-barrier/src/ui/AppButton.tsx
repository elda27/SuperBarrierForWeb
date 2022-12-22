import * as React from "react";
import SuperBarrierButton from "../ui/SuperBarrierButton";
import { ConnectAction } from "../actions/ConnectAction";
import ConnectionStatusDialog from "../dialog/ConnectionStatusDialog";
import { DeviceStatus } from "../interfaces";
import PageSelectorAction from "../actions/PageSelectorAction";
import PageSelector from "../dialog/PageSelector";
import AmazonIcon from "../assets/amazon-icon.svg";

type DialogTypes = "Connection" | "PageSelector";

interface AppButtonProps {
  deviceStatus?: DeviceStatus;
  onPageSelected?: (title: string, url: string) => void;
}

export const AppButton: React.FC<AppButtonProps> = ({
  deviceStatus,
  onPageSelected,
}) => {
  const [dialogType, setDialogType] = React.useState<DialogTypes | null>(null);

  const pageSelectorItems = [
    {
      title: "Amazon",
      url: "https://amazon.co.jp",
      avaterImage: AmazonIcon,
    },
  ];

  return (
    <div>
      <SuperBarrierButton>
        <ConnectAction
          readyConnection={deviceStatus?.isConnected ?? false}
          onClick={() => {
            setDialogType("Connection");
          }}
        ></ConnectAction>
        <PageSelectorAction
          onClick={() => {
            setDialogType("PageSelector");
          }}
        />
      </SuperBarrierButton>
      <ConnectionStatusDialog
        open={dialogType === "Connection"}
        status={deviceStatus}
        onClose={() => setDialogType(null)}
      />
      <PageSelector
        open={dialogType === "PageSelector"}
        onClicked={onPageSelected}
        onClose={() => setDialogType(null)}
        items={pageSelectorItems}
      />
    </div>
  );
};
