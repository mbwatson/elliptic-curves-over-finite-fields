import PropTypes from 'prop-types'
import { InlineMath } from 'react-katex'
import { useApp } from '../context'
import 'katex/dist/katex.min.css'

export const EquationForm = () => {
  const { params, increment, decrement } = useApp()

  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
    }}>
      <InlineMath math={ `
        y^2 = x^3 
        ${ params.a === 0 ? '' : params.a < 0 ? `${ params.a === 1 ? '' : params.a }x` : `+ ${ params.a === 1 ? '' : params.a }x` }
        ${ params.b === 0 ? '' :  params.b < 0 ? `${ params.b }` : `+ ${ params.b }` }
      ` } />
      <div>
        <span>a = { params.a }</span>
        <button onClick={ () => decrement('a') }>-1</button>
       <button onClick={ () => increment('a') }>+1</button>
      </div>
      <div>
        <span>b = { params.b }</span>
        <button onClick={ () => decrement('b') }>-1</button>
       <button onClick={ () => increment('b') }>+1</button>
      </div>
    </div>
  )
}

EquationForm.propTypes = {
  a: PropTypes.number.isRequired,
  b: PropTypes.number.isRequired,
}
