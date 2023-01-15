import { SelectPicker } from 'rsuite'
import { useConfig } from '../../context'
import './index.css'

export const ModeSelect = () => {
  const { graphMode, graphModes, setGraphMode } = useConfig()
  const options = Object.keys(graphModes).map(mode => ({ label: mode, value: mode }))

  return (
    <SelectPicker
      className="mode-select"
      data={ options }
      value={ graphMode }
      searchable={ false }
      cleanable={ false }
      onChange={ setGraphMode }
    />
  )
}
