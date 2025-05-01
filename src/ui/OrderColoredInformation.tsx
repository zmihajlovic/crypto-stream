import { styled } from "@mui/material";

interface InformationBoxProps {
  infoText: string;
  color?: string;
  backgroundColor: string;
}

const InfoBox = styled("div")(() => ({
  marginTop: 0,
  marginBottom: "8px",
  display: "flex",
  alignItems: "center",
}));

const InfoText = styled("p")<{ color: string }>(({ color }) => ({
  fontSize: "14px",
  color,
}));

const InfoSign = styled("span")<{ backgroundColor: string }>(
  ({ backgroundColor }) => ({
    width: "15px",
    height: "15px",
    backgroundColor,
    display: "block",
    marginRight: "12px",
  })
);

export const OrderColoredInformation = ({
  infoText,
  color,
  backgroundColor,
}: InformationBoxProps) => {
  return (
    <InfoBox>
      <InfoSign backgroundColor={backgroundColor} />
      <InfoText color={color || ""}>{infoText}</InfoText>
    </InfoBox>
  );
};
