import { TactileIconButton } from '@components/Common/TactileIconButton'
import Stack from '@mui/material/Stack'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'

export const AddRemoveButtons = () => {
  return (
    <Stack direction="row" position={'absolute'} right={0} top={0} gap={'30px'}>
      <TactileIconButton>
        <AddIcon fontSize="large" />
      </TactileIconButton>
      <TactileIconButton>
        <DeleteIcon fontSize="large" />
      </TactileIconButton>
    </Stack>
  )
}
