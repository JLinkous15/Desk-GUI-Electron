import { useLayoutEffect, useRef, useState } from 'react'

type Size = {
  width: number
  height: number
}

export const useDisplay = () => {
  const appRef = useRef(null)
  const [isLandscape, setIsLandscape] = useState<boolean>(true)
  const [screen, setScreen] = useState<Size>({
    width: 0,
    height: 0
  })
  const [browser, setBrowser] = useState<Size>({
    width: 0,
    height: 0
  })
  const windowInstance = window

  useLayoutEffect(() => {
    setScreen((prev) => ({
      ...prev,
      width: windowInstance.screen.width,
      height: windowInstance.screen.height
    }))
    setBrowser((prev) => ({
      ...prev,
      width: windowInstance.innerWidth,
      height: windowInstance.innerHeight
    }))
    setIsLandscape(browser.width > browser.height)
  }, [windowInstance])

  return { appRef, screen, browser, isLandscape }
}
