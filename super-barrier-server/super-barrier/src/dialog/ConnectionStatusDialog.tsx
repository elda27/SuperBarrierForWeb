import * as React from "react";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

export interface WarningAlartProps {
  open?: boolean;
  onAccept?: () => void;
  onReject?: () => void;
}

export const ConnectionStatusDialog: React.FC<WarningAlartProps> = ({
  open = false,
}) => {
  return (
    <Dialog open={open}>
      {/* <DialogTitle>Status</DialogTitle> */}
      <DialogContent>
        <List sx={{ width: "100%", minWidth: 360 }}>
          <ListItem>
            <ListItemText primary="接続状態" secondary="未接続" />
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectionStatusDialog;
