import IconButton from "@mui/material/IconButton"
import { styled } from "@mui/material/styles"

export const TactileIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  boxShadow: `10px 10px 20px ${theme.palette.shadow},  -10px -10px 20px ${theme.palette.highlight}`,
  transition: '150ms ease-in-out',
  ' &:hover': {
    boxShadow: 'none',
    transition: '150ms ease-in-out',
  },
}))