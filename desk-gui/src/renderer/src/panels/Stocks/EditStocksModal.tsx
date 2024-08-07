import { StyledDialog } from '@components/Common/GlassDialog'
import { GlassDialogContent } from '@components/Common/GlassDialogContent'
import { DialogProps } from '@mui/material/Dialog'
import { EditStocksForm } from './EditStocksForm'
import React from 'react'

interface EditStockModalProps extends DialogProps {
  tabs: string[]
  setTabs: React.Dispatch<React.SetStateAction<string[]>>
  open: boolean
  handleClose: () => void
}

const addTicker = (e: React.FormEvent<HTMLFormElement> | undefined) => {
  if (!e) return
  e.preventDefault()

  console.log(e)
}

const removeTicker = () => {}

export const EditStocksModal = ({
  open,
  handleClose,
  tabs,
  setTabs,
  ...props
}: EditStockModalProps) => {
  return (
    <StyledDialog open={open} onClose={handleClose} fullScreen {...props}>
      <GlassDialogContent handleClose={handleClose} tabs={tabs}>
        <EditStocksForm addTicker={addTicker} />
      </GlassDialogContent>
    </StyledDialog>
  )
}
