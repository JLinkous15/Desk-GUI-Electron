import { DrawerProps } from '@mui/material/Drawer'
import { styled, useTheme } from '@mui/material/styles'
import { useContext, useEffect } from 'react'
import { measurements } from '../../theme'
import { NavDrawer } from './NavbarDrawer'
import { NavbarContext } from './NavbarProvider'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { NavbarAppBar } from './NavbarAppBar'
import LunchDiningIcon from '@mui/icons-material/LunchDining'
import LocalBarIcon from '@mui/icons-material/LocalBar'
import CalculateIcon from '@mui/icons-material/Calculate'
import EggIcon from '@mui/icons-material/Egg'
import HomeIcon from '@mui/icons-material/Home'

interface NavbarProps extends DrawerProps {
  children: React.ReactNode
}

interface ContentBox extends BoxProps {
  open: boolean
}

export type NavLinkType = {
  title: string
  onClick: () => void
  icon: React.ReactElement<any, any>
}[]

const BrowserBox = styled(Box)({
  minHeight: '100dvh',
  width: '100dvw'
})

const ContentBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open'
})<ContentBox>(({ theme, open }) => ({
  width: '100%',
  minWidth: '400px',
  paddingLeft: measurements.navbarSize * 2,
  paddingTop: measurements.navbarSize,
  paddingRight: measurements.navbarSize,
  position: 'absolute',
  right: 0,
  transition: theme.transitions.create('width', {}),
  [theme.breakpoints.down('sm')]: {
    paddingLeft: measurements.navbarSize
  },
  ...(open && {
    width: `calc(100% - ${measurements.navbarSize + measurements.navbarAdd}px)`,
    transition: theme.transitions.create('width', {})
  })
}))

export const Navbar = ({ children }: NavbarProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isUltrawide = useMediaQuery(theme.breakpoints.up('xl'))
  const { open, setOpen } = useContext(NavbarContext)

  useEffect(() => {
    setOpen(isUltrawide)
  }, [isUltrawide])

  const navigationLinks: NavLinkType = [
    {
      title: 'Home',
      onClick: () => {},
      icon: <HomeIcon color="primary" />
    },
    {
      title: 'Food',
      onClick: () => {},
      icon: <LunchDiningIcon color="primary" />
    },
    {
      title: 'Beverage',
      onClick: () => {},
      icon: <LocalBarIcon color="primary" />
    },
    {
      title: 'Egg Timer',
      onClick: () => {},
      icon: <EggIcon color="primary" />
    },
    {
      title: 'Food Calculators',
      onClick: () => {},
      icon: <CalculateIcon color="primary" />
    }
  ]

  return (
    <BrowserBox>
      {!isMobile ? (
        <NavDrawer open={isUltrawide || open} navLinks={navigationLinks} />
      ) : (
        <NavbarAppBar navLinks={navigationLinks} />
      )}
      <ContentBox open={open}>{children}</ContentBox>
    </BrowserBox>
  )
}
