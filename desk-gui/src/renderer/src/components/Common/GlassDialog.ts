import { Dialog, styled } from '@mui/material'

// @ts-ignore theme deconstructed for ease of editing
export const StyledDialog = styled(Dialog)(({ theme }) => ({
  margin: '20px',
  backgroundColor: '#00000050',
  borderRadius: '10px',
  '& .MuiPaper-root': {
    borderRadius: '10px',
    backgroundColor: '#00000055',
    boxShadow: `inset -5px -5px 10px #00000015, inset 5px 5px 10px #ffffff15`,
    backdropFilter: 'blur( 8px )',
    overflowX: 'hidden',
    overflowY: 'auto',
    borderRight: '1px solid #ffffff25',
    borderBottom: '1px solid #ffffff25'
  }
}))
