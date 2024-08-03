import AcUnitIcon from '@mui/icons-material/AcUnit'
import Stack, { StackProps } from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import { TactileIconButton } from '../Common/TactileIconButton'

interface WidgetsProps extends StackProps {

}

export const Widgets = ({...props}: WidgetsProps) => {
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
      {...props}
      sx={{
        border: `1px solid ${theme.palette.text.disabled}`,
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
