import { useAppDispatch, useAppSelector } from "@crypto-stream/store";
import { Box, Button } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import { startStreaming, stopStreaming } from "@crypto-stream/store";

export const StreamingButton = () => {
  const dispatch = useAppDispatch();
  const isStreaming = useAppSelector(
    (state) => state.streamingSlice.isStreaming
  );

  return (
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
          Stop Streaming
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
  );
};
