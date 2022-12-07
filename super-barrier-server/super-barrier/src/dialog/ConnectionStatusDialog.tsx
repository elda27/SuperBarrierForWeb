import * as React from "react";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
// import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { DeviceStatus } from "interfaces";

export interface WarningAlartProps {
  open?: boolean;
  status?: DeviceStatus;
  onAccept?: () => void;
  onReject?: () => void;
}

export const ConnectionStatusDialog: React.FC<WarningAlartProps> = ({
  open = false,
  status = undefined,
}) => {
  let body: React.ReactNode;
  if (status && status.isConnected) {
    body = (
      <>
        <ListItem>
          <ListItemText primary="接続状態" secondary="接続済み" />
        </ListItem>
        <ListItem>
          <ListItemText primary="接続強度" secondary={status.rssi ?? "不明"} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="バッテリー"
            secondary={status.battery ?? "不明"}
          />
        </ListItem>
      </>
    );
  } else {
    body = (
      <ListItem>
        <ListItemText primary="接続状態" secondary="未接続" />
      </ListItem>
    );
  }
  return (
    <Dialog open={open}>
      {/* <DialogTitle>Status</DialogTitle> */}
      <DialogContent>
        <List sx={{ width: "100%", minWidth: 360 }}>{body}</List>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectionStatusDialog;
