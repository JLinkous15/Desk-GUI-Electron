import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

export namespace CommonComponentTypes {
  export namespace GlassDialogTypes {
    export type GlassDialogButton = {
      title: string
      onClick: () => void
      icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
        muiName: string
      }
    }
  }
}
