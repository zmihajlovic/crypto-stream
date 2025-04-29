import { List, styled } from "@mui/material";
import { SidebarItem } from "./SidebarItem";
import MuiDrawer from "@mui/material/Drawer";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

const SIDEBAR_WIDTH = 250;

const Drawer = styled(MuiDrawer)(() => ({
  width: SIDEBAR_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  position: "relative",
  top: 60,
  zIndex: 0,
  "& .MuiDrawer-paper": {
    width: SIDEBAR_WIDTH,
    top: "62px",
  },
}));

/**
 *
 * Sidebar of whole app.
 * @returns Sidebar
 */
export const Sidebar = () => {
  return (
    <Drawer variant="permanent">
      <List sx={{ px: 1 }}>
        <SidebarItem
          label="Alerts"
          to="/alerts"
          icon={<NotificationsNoneOutlinedIcon />}
        />
      </List>
    </Drawer>
  );
};
