import { styled } from '@mui/material'
import { AddRemoveButtons } from './AddRemoveButtons'
import { Entry } from './Entry'

type IndvEntry = {
  uuid?: string
  label: string
  isComplete: boolean
}

type ParentEntry = IndvEntry & {
  children: IndvEntry[]
  isFrog: boolean
}

type Entries = ParentEntry[]

const dummyData = [
  {
    uuid: "1",
    label: "Todo Number 1",
    isComplete: false,
    isFrog: false,
    children: [
      {
        uuid: "2",
    label: "Todo Number 1",
    isComplete: false,
      },
      {
        uuid: "3",
    label: "Todo Number 1",
    isComplete: false,
      },
      {
        uuid: "4",
    label: "Todo Number 1",
    isComplete: false,
      },
    ]
  },
]

const StyledTodosDiv = styled('div')({
  width: '100%',
  height: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '30px'
})

export const Todos = () => {
  return (
    <StyledTodosDiv>
      <AddRemoveButtons />

    </StyledTodosDiv>
  )
}
