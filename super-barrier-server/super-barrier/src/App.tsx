import * as React from "react";
import { DeviceStatus } from "./interfaces";
import { AppButton } from "./ui/AppButton";
import { WarningAlart } from "./dialog/WarningAlart";
import * as amazon from "./barrier/amazon";
import { BrowserSuperBarrier } from "./hw/browser";
import { useInterval } from "usehooks-ts";
import _ from "lodash";

const WarningAcceptedKey = "WarningAccepted";

export interface AppProps {
  document: Document;
  url?: string;
}

export const App: React.FC<AppProps> = ({
  document = window.document,
  url = undefined,
}) => {
  const [displayWarning, setDisplayWarning] = React.useState<boolean>(true);
  const [deviceStatus, setDeviceStatus] = React.useState<DeviceStatus>({
    isConnected: false,
  });
  const [originalDocument, setOriginalDocument] =
    React.useState<Document | null>(null);
  const [barrier, setBarrier] = React.useState<BrowserSuperBarrier | null>(
    null
  );

  // whether the warning has been accepted or not
  React.useEffect(() => {
    const value = Boolean(localStorage.getItem("warningAccepted"));
    if (!value) {
      localStorage.setItem(WarningAcceptedKey, "false");
    } else {
      setDisplayWarning(false);
    }
  }, []);

  // Connecting device
  const initialize = async () => {
    // Init barrier
    const barrier = new BrowserSuperBarrier();
    if (!(await barrier.connect())) {
      console.error("Failed to initialize barrier");
      return;
    }

    setBarrier(barrier);
  };

  // Update every 200ms
  useInterval(() => {
    if (!barrier) {
      return;
    }
    barrier.update();
    setDeviceStatus({
      isConnected: barrier.isConnected(),
      isSlept: barrier.getState().isSlept,
    });
  }, 200);

  // Filtering page
  React.useLayoutEffect(() => {
    if (!originalDocument) {
      setOriginalDocument(_.cloneDeep(document));
    }
    if (deviceStatus && deviceStatus.isConnected && !deviceStatus.isSlept) {
      amazon.filterAmazon(document, new URL(url || document.URL));
    }
  }, [deviceStatus.isConnected, deviceStatus?.isSlept]);

  return (
    <div>
      <AppButton deviceStatus={deviceStatus} />
      <WarningAlart
        open={displayWarning}
        onAccept={async () => {
          setDisplayWarning(false);
          localStorage.setItem(WarningAcceptedKey, "true");
          await initialize();
        }}
        onReject={() => setDisplayWarning(true)}
      />
    </div>
  );
};

export default App;
