import { useState } from 'react'
import { Button, InputPicker, Stack } from 'rsuite'
import { InlineMath } from 'react-katex'
import { useConfig } from '../../context'
import { GoLock as LockIcon } from 'react-icons/go'
import prime from 'get-primes'
import './index.css'
import 'katex/dist/katex.min.css'
import 'rsuite/dist/rsuite.min.css'

const somePrimes = prime(100)

export const EquationEditor = () => {
  const { equationLatex, modulus, params, setModulus, setParam } = useConfig()
  const [editing, setEditing] = useState(false)
  
  const handleChangeParam = param => event => setParam(param, event.target.value)

  const handleSelectModulus = event => setModulus(+event)

  const LockedEquation = () => {
    return (
      <Stack alignItems="center" spacing={ 6 } className="equation">
        <InlineMath math={ equationLatex } />
        {' '}over{' '}
        <InlineMath math={ `\\mathbb{Z}/${ modulus }\\mathbb{Z}` } />
      </Stack>
    )
  }

  const UnlockedEquation = () => {
    return (
      <Stack alignItems="center" spacing={ 6 } className="equation">
        <InlineMath math="y^2 = x^3 +" />
        <input type="number" value={ params.a } onChange={ handleChangeParam('a') }/>
        <InlineMath math="x + " />
        <input type="number" value={ params.b } onChange={ handleChangeParam('b') }/>
        {' '}over{' '}
        <InlineMath math={ `\\mathbb{Z} / ` } />
        <InputPicker
          data={ somePrimes.map(p => ({ label: p, value: p })) }
          value={ modulus }
          onChange={ handleSelectModulus }
          cleanable={ false }
        />
        <InlineMath math="\mathbb{Z}" />
      </Stack>
    )
  }

  return (
    <Stack className={ `equation-editor ${ editing ? 'unlocked' : 'locked' } ` } spacing={ 8 }>
      
      { editing ? <UnlockedEquation /> : <LockedEquation /> }

      <Button onClick={ () => setEditing(!editing) }>
        <LockIcon style={{ color: editing ? 'grey' : 'darkcyan' }}/>
      </Button>

    </Stack>
  )
}

