import { List, styled } from "@mui/material";
import { SidebarItem } from "./NavitationItem";
import { StreamingButton } from "./StreamingButton";

const AppHeader = styled("header")(() => ({
  borderBottom: "1px solid var(--gray-12)",
  alignItems: "center",
  justifyContent: "space-between",
  paddingLeft: "16px",
  paddingRight: "16px",
  display: "flex",
}));

/**
 *
 * @description Header
 */
export const Header = () => {
  return (
    <AppHeader>
      <nav>
        <List sx={{ display: "flex" }}>
          <SidebarItem label="Alerts" to="/alerts" />
          <SidebarItem label="Orders" to="/orders" />
        </List>
      </nav>
      <StreamingButton />
    </AppHeader>
  );
};
