import AcUnitIcon from '@mui/icons-material/AcUnit';
import { Stack, useTheme } from "@mui/material";
import { TactileIconButton } from "../Common/TactileIconButton";

export const Widgets = () => {
  const theme = useTheme()
  return (
    <Stack
    direction='row'
    spacing={5}
    width='100%'
    justifyContent={"start"}
    alignItems={"center"}
    paddingX={4}
    gap={4}
    sx={{
      border: `1px solid ${theme.palette.text.disabled}`,
      height: '16%',
    }}>
      <TactileIconButton size="large">
        <AcUnitIcon fontSize="large" />
      </TactileIconButton>
      <TactileIconButton size="large">
        <AcUnitIcon fontSize="large" />
      </TactileIconButton>
      <TactileIconButton size="large">
        <AcUnitIcon fontSize="large" />
      </TactileIconButton>
      <TactileIconButton size="large">
        <AcUnitIcon fontSize="large" />
      </TactileIconButton>
      <TactileIconButton size="large">
        <AcUnitIcon fontSize="large" />
      </TactileIconButton>
      <TactileIconButton size="large">
        <AcUnitIcon fontSize="large" />
      </TactileIconButton>
      <TactileIconButton size="large">
        <AcUnitIcon fontSize="large" />
      </TactileIconButton>
    </Stack>
  )
}