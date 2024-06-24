import { TactileIconButton } from '@components/Common/TactileIconButton'
import EditIcon from '@mui/icons-material/Edit'
import { ButtonProps } from '@mui/material/Button'

interface EditTodosProps extends ButtonProps {}

export const EditTodosButton = ({ ...props }: EditTodosProps) => {
  return (
    <TactileIconButton {...props}>
      <EditIcon fontSize="large" />
    </TactileIconButton>
  )
}
