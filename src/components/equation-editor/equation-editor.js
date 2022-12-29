import { useState } from 'react'
import { Button, InputNumber, InputPicker, Stack } from 'rsuite'
import { GoLock as LockIcon } from 'react-icons/go'
import prime from 'get-primes'
import { useConfig } from '../../context'
import { Latex } from '../latex'
import './index.css'
import 'katex/dist/katex.min.css'
import 'rsuite/dist/rsuite.min.css'

const somePrimes = prime(100)

export const EquationEditor = () => {
  const { equationLatex, modulus, params, setModulus, setParam } = useConfig()
  const [editing, setEditing] = useState(false)
  
  const handleChangeParam = param => newValue => setParam(param, newValue)

  const handleSelectModulus = event => setModulus(+event)

  const LockedEquation = () => {
    return (
      <Stack alignItems="center" spacing={ 6 } className="equation">
        <Latex math={ equationLatex } />
        {' '}over{' '}
        <Latex math={ `\\mathbb{Z}/${ modulus }\\mathbb{Z}` } />
      </Stack>
    )
  }

  const UnlockedEquation = () => {
    return (
      <Stack alignItems="center" spacing={ 6 } className="equation">
        <Latex math="y^2 = x^3 +" />
        <InputNumber value={ params.a } onChange={ handleChangeParam('a') }/>
        <Latex math="x + " />
        <InputNumber value={ params.b } onChange={ handleChangeParam('b') }/>
        {' '}over{' '}
        <Latex math={ `\\mathbb{Z} / ` } />
        <InputPicker
          data={ somePrimes.map(p => ({ label: p, value: p })) }
          value={ modulus }
          onChange={ handleSelectModulus }
          cleanable={ false }
        />
        <Latex math="\mathbb{Z}" />
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

