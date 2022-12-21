import { Fragment } from 'react'
import { EquationForm } from './components/equation-form'
import { FiniteFieldGraph } from './components/finite-field-graph'
import { ModulusForm } from './components/modulus-form'
import { useApp } from './context'

export const App = () => {
  const {
    graph, params
  } = useApp()

  return (
    <Fragment>
      <div style={{
        width: '800px',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <EquationForm  />
        <ModulusForm  />
      </div>
      <FiniteFieldGraph width={ 800 } />
    </Fragment>
  )
}
