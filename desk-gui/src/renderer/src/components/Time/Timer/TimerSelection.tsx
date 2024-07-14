import Dialog from '@mui/material/Dialog'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { useTheme } from '@mui/material/styles'
import { TimerType } from './timerTypes'
import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { StyledDialog } from '@components/Common/GlassDialog'
import { GlassDialogContent } from '@components/Common/GlassDialogContent'
import { Typography } from '@mui/material'

type TimerSelectionProps = {
  timerState: TimerType.TimeState
  dispatch: React.Dispatch<any>
  timerInterval: React.MutableRefObject<TimerType.TimerIntervalObj>
}

export const TimerSelection = ({ timerState, dispatch, timerInterval }: TimerSelectionProps) => {
  const theme = useTheme()
  const [open, setOpen] = useState<boolean>(false)

  const handleTimerSelectChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => {
    if (!e) return
    const timerType = e.target.value
    if (timerType === TimerType.TimerEnum.POMODORO) {
      const dispatchValue = {
        isWork: true,
        type: TimerType.TimerEnum.POMODORO,
        duration: timerInterval.current.pomodoro.work,
        totalTime: timerInterval.current.pomodoro.work
      }
      dispatch({ type: TimerType.TimerActionEnum.SET, value: dispatchValue })
    } else if (timerType === TimerType.TimerEnum.CUSTOM) {
      setOpen(true)
    }
  }

  const handleCustomTimerModalClose = () => {
    setOpen(false)
  }

  const handleSetCustomTime = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => {
    if (!e) return
    timerInterval.current.custom[e.target.name] = parseInt(e.target.value) * 60 * 1000
  }

  const handleCustomSubmitButton = (e: React.MouseEvent<HTMLButtonElement> | undefined) => {
    if (!e) return

    const dispatchValue = {
      isWork: true,
      type: TimerType.TimerEnum.CUSTOM,
      duration: timerInterval.current.custom.work,
      totalTime: timerInterval.current.custom.work
    }

    dispatch({ type: TimerType.TimerActionEnum.SET, value: dispatchValue })
    setOpen(false)
  }

  const checkSpecialChar =(e)=>{
    if(!/[0-9a-zA-Z]/.test(e.key)){
     e.preventDefault()
    }
   }

  return (
    <>
      <TextField
        label={'Select A Timer'}
        onChange={handleTimerSelectChange}
        value={timerState.type}
        fullWidth
        select
        InputLabelProps={{
          style: {
            color: theme.palette.text.primary
          }
        }}
      >
        {Object.entries(TimerType.TimerEnum).map((entry, index) => {
          const [k, v] = entry
          return (
            <MenuItem value={v} key={index}>
              {k}
            </MenuItem>
          )
        })}
      </TextField>
      <StyledDialog open={open} onClose={handleCustomTimerModalClose} fullScreen sx={{margin: '5rem 25rem'}}>
        <GlassDialogContent handleClose={handleCustomTimerModalClose}>
        <Stack direction={'column'} spacing={3} margin={5}>
          <TextField
            name={'work'}
            label={'Work Interval'}
            type="number"
            onChange={handleSetCustomTime}
            onKeyDown={checkSpecialChar}
            inputProps={{
              min: 0,
            }}
            InputLabelProps={{
              style: {
                color: theme.palette.text.primary
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ color: theme.palette.text.primary }}>
                  <Typography variant="body1">
                    minutes
                  </Typography>
                </InputAdornment>
              )
            }}
          />
          <TextField
            name={'rest'}
            label={'Rest Interval'}
            type="number"
            onChange={handleSetCustomTime}
            onKeyDown={checkSpecialChar}
            inputProps={{
              min: 0,
            }}
            InputLabelProps={{
              style: {
                color: theme.palette.text.primary
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ color: theme.palette.text.primary }}>
                  <Typography variant="body1">
                    minutes
                  </Typography>
                </InputAdornment>
              )
            }}
          />
          <Button
            variant="tactile"
            onClick={handleCustomSubmitButton}
            size={'large'}
          >
            <Typography variant="body1">
              Submit
            </Typography>
          </Button>
        </Stack>
        </GlassDialogContent>
      </StyledDialog>
    </>
  )
}
