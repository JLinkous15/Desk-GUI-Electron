import Checkbox, {CheckboxProps} from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { useTheme } from '@mui/material/styles'
import { forwardRef } from 'react'

interface EntryProps extends CheckboxProps {}

export const Entry = forwardRef(({ checked }: EntryProps) => {
  const theme = useTheme()
  return (
    <Stack direction="row" gap="30px" alignItems={'center'} width={'calc(100% - 208px)'}>
      <FormControl
        component={() => (
          <Checkbox
            checked={true}
            sx={{
              '& *': {
                fill: checked ? theme.palette.primary.main : theme.palette.text.disabled,
                fontSize: '40px'
              }
            }}
          />
        )}
      />
      <TextField fullWidth />
    </Stack>
  )
})
