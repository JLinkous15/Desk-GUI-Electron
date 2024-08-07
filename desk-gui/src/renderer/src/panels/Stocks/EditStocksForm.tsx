import { TactileIconButton } from '@components/Common/TactileIconButton'
import Stack, { StackProps } from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import AddIcon from '@mui/icons-material/Add'
import { styled } from '@mui/material/styles'

interface EditStocksFormProps extends StackProps {
  addTicker: (e: React.FormEvent<HTMLFormElement> | undefined) => void
}

const StyledFormStack = styled(Stack)({
  gap: 30,
  width: '100%',
  alignItems: 'center'
})

const StyledFormFieldDiv = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 30,
  width: '40rem'
})

export const EditStocksForm = ({ addTicker, ...props }: EditStocksFormProps) => {
  const handleAddClick = (e: React.MouseEvent<HTMLButtonElement> | undefined) => {}

  return (
    <form onSubmit={addTicker}>
      <StyledFormStack direction="column" {...props}>
        <StyledFormFieldDiv>
          <TextField variant="outlined" fullWidth />
          <TactileIconButton type="submit" onClick={handleAddClick}>
            <AddIcon />
          </TactileIconButton>
        </StyledFormFieldDiv>
      </StyledFormStack>
    </form>
  )
}
