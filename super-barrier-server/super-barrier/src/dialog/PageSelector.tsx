import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export interface PageItem {
  title: string;
  url: string;
  avaterImage?: string;
}

export interface PageSelectorProps {
  open?: boolean;
  items?: PageItem[];
  onClicked?: (title: string, url: string) => void;
  onClose?: () => void;
}

export const PageSelector: React.FC<PageSelectorProps> = ({
  open = false,
  items = [],
  onClicked,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>超結界 for Web - Super Barrier for Web</DialogTitle>
      <DialogContent>
        <List>
          {items.map((item) => {
            return (
              <ListItem key={item.url} disablePadding>
                <ListItemButton
                  onClick={() => {
                    onClicked && onClicked(item.title, item.url);
                  }}
                >
                  <ListItemAvatar>
                    <Avatar alt={item.title} src={item.avaterImage} />
                  </ListItemAvatar>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default PageSelector;
