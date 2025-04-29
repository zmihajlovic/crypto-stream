import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import { NavLink, NavLinkProps } from "react-router";
import { blue } from "@mui/material/colors";
import { ReactNode } from "react";

interface SidebarItemProps extends NavLinkProps {
  label: string;
  icon: ReactNode;
}

const SidebarListItem = styled(ListItem)(() => ({
  "& a": {
    display: "block",
    width: "100%",
    borderRadius: "8px",

    "&.sidebar-item-active": {
      backgroundColor: blue[50],
    },
  },
}));

/**
 * Represents SidebarItem in main app Sidebar.
 * @returns SidebarItem
 * @param label as string, to as string, icon as ReactNode
 */
export const SidebarItem = ({ label, to, icon }: SidebarItemProps) => {
  return (
    <SidebarListItem disablePadding>
      <NavLink
        to={to}
        className={({ isActive }) => (isActive ? "sidebar-item-active" : "")}
      >
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 1,
              justifyContent: "center",
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText primary={label} />
        </ListItemButton>
      </NavLink>
    </SidebarListItem>
  );
};
