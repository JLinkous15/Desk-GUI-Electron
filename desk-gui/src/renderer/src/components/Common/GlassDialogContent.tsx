import CloseIcon from '@mui/icons-material/Close'
import Box, { BoxProps } from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import SvgIcon from '@mui/material/SvgIcon'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { AbsoluteTopRight } from './AbsoluteTopRight'
import { CommonComponentTypes } from './commonComponentTypes'

const StyledBox = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row'
})

const StyledTabList = styled(Box)({
  backgroundColor: 'transparent',
  borderRight: '1px solid #ffffff25',
  height: 'inherit',
  width: '20%',
  position: 'absolute',
  left: 0
})

const StyledTabPanel = styled(Box)({
  backgroundColor: '#00000075',
  borderRight: '1px solid #ffffff25',
  height: '100%',
  position: 'absolute',
  padding: '75px',
  paddingRight: '100px',
  right: 0
})

interface CustomDialogContentProps extends BoxProps {
  children: React.ReactNode
  tabs?: any
  buttons?: CommonComponentTypes.GlassDialogTypes.GlassDialogButton[]
  handleClose?: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void
}

const indicatorStyle = {
  backgroundColor: 'transparent',
  borderLeft: '7px solid white',
  left: 0,
  width: '100%'
}

export const GlassDialogContent = ({
  children,
  tabs = [],
  buttons = [],
  handleClose,
  ...props
}: CustomDialogContentProps) => {
  return (
    <StyledBox {...props}>
      {(tabs && tabs.length) > 0 && (
        <StyledTabList flex={1}>
          <Tabs
            orientation="vertical"
            selectionFollowsFocus
            TabIndicatorProps={{ style: indicatorStyle }}
            sx={{ height: '100%' }}
          >
            {tabs.map((tabListItem, index) => (
              <Tab
                value={index}
                key={index}
                title={tabListItem.label}
                sx={{
                  paddingY: 2.5,
                  '&:hover': {}
                }}
              />
            ))}
          </Tabs>
          {buttons.length > 0 && (
            <AbsoluteTopRight>
              {buttons.map((button, index) => (
                <IconButton key={index} onClick={button.onClick}>
                  <SvgIcon component={button.icon} fontSize="large" />
                </IconButton>
              ))}
            </AbsoluteTopRight>
          )}
        </StyledTabList>
      )}
      <StyledTabPanel flex={4} sx={{ width: tabs?.length > 0 ? '80%' : '100%' }}>
        <AbsoluteTopRight>
          {/* @ts-ignore using button close event to trigger modal close event */}
          <IconButton onClick={handleClose}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </AbsoluteTopRight>
        {children}
      </StyledTabPanel>
    </StyledBox>
  )
}
