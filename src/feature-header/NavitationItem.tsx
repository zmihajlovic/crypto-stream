import { ListItem, ListItemButton, ListItemText, styled } from "@mui/material";
import { NavLink, NavLinkProps } from "react-router";
import { blue } from "@mui/material/colors";

interface SidebarItemProps extends NavLinkProps {
  label: string;
}

const SidebarListItem = styled(ListItem)(() => ({
  "& a": {
    display: "block",
    width: "100%",
    borderRadius: "8px",

    "&.nav-link": {
      textDecoration: "none",
    },

    "&.sidebar-item-active": {
      backgroundColor: blue[50],
    },
  },
}));

/**
 * @description SidebarItem, used for main Sidebar
 * @returns SidebarItem
 * @param label as string, to as string, icon as ReactNode
 */
export const SidebarItem = ({ label, to }: SidebarItemProps) => {
  return (
    <SidebarListItem disablePadding>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `sidebar-item ${isActive ? "sidebar-item-active" : ""} nav-link`
        }
      >
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: "center",
            px: 2.5,
          }}
        >
          <ListItemText primary={label} />
        </ListItemButton>
      </NavLink>
    </SidebarListItem>
  );
};
