import Dialog from '@mui/material/Dialog'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { useTheme } from '@mui/material/styles'
import { TimerType } from './timerTypes'
import React, { useState } from 'react'
import Button from '@mui/material/Button'

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
    console.log(timerInterval.current.custom[e.target.name])
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
      <Dialog open={open} onClose={handleCustomTimerModalClose} sx={{ margin: '5% 20%' }}>
        <Stack direction={'column'} spacing={3} margin={5}>
          <TextField
            name={'work'}
            label={'Work Interval'}
            onChange={handleSetCustomTime}
            InputLabelProps={{
              style: {
                color: theme.palette.text.primary
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ color: theme.palette.text.primary }}>
                  min
                </InputAdornment>
              )
            }}
          />
          <TextField
            name={'rest'}
            label={'Rest Interval'}
            onChange={handleSetCustomTime}
            InputLabelProps={{
              style: {
                color: theme.palette.text.primary
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ color: theme.palette.text.primary }}>
                  min
                </InputAdornment>
              )
            }}
          />
          <Button
            variant="tactile"
            onClick={handleCustomSubmitButton}
            size={'large'}
            disabled={!timerInterval.current.custom.rest || !timerInterval.current.custom.work}
          >
            Submit
          </Button>
        </Stack>
      </Dialog>
    </>
  )
}
