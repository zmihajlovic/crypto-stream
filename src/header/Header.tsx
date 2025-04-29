import { NavLink } from "react-router";
import { Box, Button, styled } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import { useAppDispatch, useAppSelector } from "../store/store";
import { startStreaming, stopStreaming } from "@crypto-stream/store";

const AppHeader = styled("header")(() => ({
  borderBottom: "1px solid var(--gray-12)",
  paddingTop: "12px",
  paddingBottom: "12px",
}));

/**
 *
 * @description Main Header of app.
 * @returns Header
 */
export const Header = () => {
  const dispatch = useAppDispatch();
  const isStreaming = useAppSelector(
    (state) => state.streamingSlice.isStreaming
  );

  return (
    <AppHeader>
      <Box
        alignItems="center"
        justifyContent="flex-end"
        style={{ paddingLeft: "16px", paddingRight: "16px", display: "flex" }}
      >
        <NavLink to="/orders">
          <Button sx={{ textTransform: "capitalize" }}>Orders</Button>
        </NavLink>
        {isStreaming ? (
          <Button
            sx={{ ml: 2, textTransform: "capitalize" }}
            startIcon={<StopCircleOutlinedIcon />}
            variant="outlined"
            onClick={() => {
              dispatch(stopStreaming());
            }}
          >
            Stop streaming
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
            Start streaming
          </Button>
        )}
      </Box>
    </AppHeader>
  );
};
