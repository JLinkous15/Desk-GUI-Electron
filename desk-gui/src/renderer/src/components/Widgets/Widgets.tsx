import AcUnitIcon from '@mui/icons-material/AcUnit'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import { TactileIconButton } from '../Common/TactileIconButton'
import {exec} from "child_process"

export const Widgets = () => {
  const theme = useTheme()
  return (
    <Stack
      direction="row"
      spacing={5}
      width="100%"
      justifyContent={'start'}
      alignItems={'center'}
      paddingX={4}
      gap={4}
      sx={{
        border: `1px solid ${theme.palette.text.disabled}`,
        height: '16%'
      }}
    >
      <TactileIconButton>
        <AcUnitIcon fontSize="large" />
      </TactileIconButton>
      <TactileIconButton>
        <AcUnitIcon fontSize="large" />
      </TactileIconButton>
      <TactileIconButton>
        <AcUnitIcon fontSize="large" />
      </TactileIconButton>
      <TactileIconButton>
        <AcUnitIcon fontSize="large" />
      </TactileIconButton>
      <TactileIconButton>
        <AcUnitIcon fontSize="large" />
      </TactileIconButton>
      <TactileIconButton>
        <AcUnitIcon fontSize="large" />
      </TactileIconButton>
      <TactileIconButton>
        <AcUnitIcon fontSize="large" />
      </TactileIconButton>
    </Stack>
  )
}
