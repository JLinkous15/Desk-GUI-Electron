import { Dialog, InputAdornment, MenuItem, Stack, TextField, TextFieldProps, useTheme } from "@mui/material"
import { TimerType } from "./timerTypes"
import { useState } from "react"
import { CenterFocusStrong } from "@mui/icons-material"

type TimerInterval = {
  type: TimerType.TimerEnum | string,
  work: number,
  rest: number
}

const timerIntervals = [
  {
    type: TimerType.TimerEnum.POMODORO,
    work: 1500000,
    rest: 300000,
  },
  {
    type: TimerType.TimerEnum.CUSTOM,
    work: 0,
    rest: 0,
  },
]

export const TimerSelection = ({...props}: TextFieldProps) => {
  const theme = useTheme()
  const [timerInterval, setTimerInterval] = useState<TimerInterval>({
    type: "",
    work: 0,
    rest: 0
  })
  const [open, setOpen] = useState<boolean>(false)

  const handleTimerSelectChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
    if (!e) return
    const timerType = e.target.value
    if (timerType === TimerType.TimerEnum.POMODORO) {

    } else if (timerType === TimerType.TimerEnum.CUSTOM){
      setOpen(true)
    }
    setTimerInterval((prev) => ({...prev, type: timerType}))
  }

  const handleCustomTimerModalClose = () => {
    setOpen(false)
  }

  return (
    <>
      <TextField
      label={'Select A Timer'}
      onChange={handleTimerSelectChange}
      value={timerInterval.type}
      fullWidth
      select
      InputLabelProps={{
        style: {
          color: theme.palette.text.primary,
        }
      }}
      {...props}>
        {Object.entries(TimerType.TimerEnum).map((entry, index) => {
          const [k, v] = entry
          return (
            <MenuItem value={v} key={index}>
            {k}
          </MenuItem>
          )
        })}
      </TextField>
      <Dialog open={open} onClose={handleCustomTimerModalClose} sx={{margin: '5% 20%'}}>
        <Stack direction={'column'} spacing={3} margin={5}>
          <TextField 
          name={"Work Interval"} 
          label={"Work Interval"}
          InputLabelProps={{
            style: {
              color: theme.palette.text.primary,
            }
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end" sx={{color: theme.palette.text.primary}}>min</InputAdornment>,
          }}
          />
          <TextField
          name={"Rest Interval"}
          label={"Rest Interval"}
          InputLabelProps={{
            style: {
              color: theme.palette.text.primary
            }
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end" sx={{color: theme.palette.text.primary}}>min</InputAdornment>,
          }}
          />
        </Stack>
      </Dialog>
    </>
  )
}