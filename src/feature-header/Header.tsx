import { Box, Button, List, styled } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import { useAppDispatch, useAppSelector } from "../store/store";
import { startStreaming, stopStreaming } from "@crypto-stream/store";
import { SidebarItem } from "./NavitationItem";
import { LanguageSwitcher } from "../feature-language-switcher";
import { useTranslation } from "react-i18next";

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
  const dispatch = useAppDispatch();
  const isStreaming = useAppSelector(
    (state) => state.streamingSlice.isStreaming
  );
  const { t } = useTranslation();

  return (
    <AppHeader>
      <nav>
        <List sx={{ display: "flex" }}>
          <SidebarItem label={t("alerts")} to="/alerts" />
          <SidebarItem label={t("orders")} to="/orders" />
        </List>
      </nav>
      <Box>
        {isStreaming ? (
          <Button
            sx={{ ml: 2, textTransform: "capitalize" }}
            startIcon={<StopCircleOutlinedIcon />}
            variant="outlined"
            onClick={() => {
              dispatch(stopStreaming());
            }}
          >
            {t("stopStreaming")}
          </Button>
        ) : (
          <Button
            sx={{ ml: 2, textTransform: "capitalize" }}
            startIcon={<PlayCircleOutlineIcon />}
            variant="contained"
            onClick={() => {
              dispatch(startStreaming());
            }}
          >
            {t("startStreaming")}
          </Button>
        )}
        <LanguageSwitcher />
      </Box>
    </AppHeader>
  );
};
