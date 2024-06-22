import { AddRemoveButtons } from './AddRemoveButtons'
import { Entry } from './Entry'

export const Todos = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', padding: '30px' }}>
      <AddRemoveButtons />
      <Entry />
    </div>
  )
}
