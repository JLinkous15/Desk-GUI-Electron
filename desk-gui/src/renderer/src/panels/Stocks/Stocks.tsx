import { styled } from "@mui/material/styles"
import { getGroupedDaily } from "../../store"
import { GroupedDaily } from "@shared/models"
import { useEffect, useState } from "react"
import { AbsoluteTopRight } from "@components/Common/AbsoluteTopRight"
import { TactileIconButton } from "@components/Common/TactileIconButton"
import EditIcon from '@mui/icons-material/Edit';
import { StyledDialog } from "@components/Common/GlassDialog"
import { GlassDialogContent } from "@components/Common/GlassDialogContent"

const StyledStocksDiv = styled('div')({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  maxHeight: 'inherit',
  justifyContent: 'space-between'
})

export const Stocks = () => {
  const [tickers, setTickers] = useState<string[]>([])
  const [stocks, setStocks] = useState<GroupedDaily[]>([])
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    const storedTickers = localStorage.getItem("jlTickers")
    if (storedTickers){
      const parsedTickers = JSON.parse(storedTickers)
      setTickers(parsedTickers)
    }
  }, [])
  
  useEffect(() => {
    if (tickers.length > 0 && process.env.VITE_POLYGON_API_KEY){
      getGroupedDaily(tickers, process.env.VITE_POLYGON_API_KEY)
      .then(setStocks)
    }
  }, [tickers])

  const handleEditModalOpen = () => {
    setOpen(true)
  }

  const handleEditModalClose = () => {
    setOpen(false)
  }

  return (
    <StyledStocksDiv>
      <AbsoluteTopRight>
        <TactileIconButton
          onClick={handleEditModalOpen}
          >
          <EditIcon />
        </TactileIconButton>
      </AbsoluteTopRight>
      <StyledDialog 
        open={open} 
        onClose={handleEditModalClose}
        fullScreen
      >
        <GlassDialogContent
          handleClose={handleEditModalClose}
        >
          foobar
        </GlassDialogContent>
      </StyledDialog>
    </StyledStocksDiv>
  )
}
