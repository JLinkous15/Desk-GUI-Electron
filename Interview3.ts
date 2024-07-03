enum DirectionsEnum {
    UP = 'up',
    DOWN = 'down',
    BACKWARD = 'backward',
    FORWARD = 'forward',
  }
  
  type Direction = {[value in DirectionsEnum]?: number}
  type Directions = Direction[]

  const add = (a: number, b: number) => a + b
  const sub = (a: number, b: number) => a - b

  const RelativeMappedDirection = new Map()
  
  RelativeMappedDirection.set(DirectionsEnum.UP, sub)
  RelativeMappedDirection.set(DirectionsEnum.DOWN, add)
  RelativeMappedDirection.set(DirectionsEnum.BACKWARD, sub)
  RelativeMappedDirection.set(DirectionsEnum.FORWARD, add)
  
  
  const getTravelDistance = (values: Directions) => {
    let vertical = 0
    let horizontal = 0
    values.forEach((direction, index) => {
        const [k, v] = Object.entries(direction)[0]
        switch (k) {
            case DirectionsEnum.UP:
            case DirectionsEnum.DOWN:
                vertical += RelativeMappedDirection.get(k)(vertical, v)
                break
            case DirectionsEnum.FORWARD:
            case DirectionsEnum.BACKWARD:
                horizontal += RelativeMappedDirection.get(k)(vertical, v)
                break
            default:
                console.log(`Unexpected value: [${index}]: ${direction[0]}`)
                break
        }
    })
    console.log(vertical * horizontal)
    return vertical * horizontal
    
  }
  
  const directions: Directions = [
    {forward: 2},
    {forward: 2},
    {down: 7},
    {forward: 6},
    {down: 7},
    {forward: 4},
    {down: 7},
    {up: 2},
    {forward: 4},
    {down: 2},
    {down: 4},
    ]
  