import { useState } from 'react'
import { Button, ButtonGroup, Input, InputNumber, InputPicker, Popover, Stack, Whisper } from 'rsuite'
import prime from 'get-primes'
import { useConfig } from '../../context'
import { Latex } from '../latex'
import ArrowDownLine from '@rsuite/icons/ArrowDownLine'
import ArrowUpLine from '@rsuite/icons/ArrowUpLine'
import './index.css'
import 'katex/dist/katex.min.css'

const primeBound = 30
const somePrimes = prime(primeBound)

export const EquationEditor = () => {
  const { equationLatex, modulus, params, setModulus, setParam } = useConfig()
  const [editing, setEditing] = useState(false)
  
  const handleChangeParam = param => newValue => setParam(param, newValue)

  const handleClickIncreaseModulus = () => {
    let _modulus = modulus + 1
    while (!somePrimes.includes(_modulus)) {
      _modulus += 1
      if (_modulus > primeBound) {
        return
      }
    }
    setModulus(_modulus)
  }

  const handleClickDecreaseModulus = () => {
    let _modulus = modulus - 1
    while (!somePrimes.includes(_modulus)) {
      _modulus -= 1
      if (_modulus < 2) {
        return
      }
    }
    setModulus(_modulus)
  }

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
        <Input value={ modulus } />
        <ButtonGroup vertical style={{ transform: 'scale(0.75)'}}>
          <Button size="xs" onClick={ handleClickIncreaseModulus }><ArrowUpLine /></Button>
          <Button size="xs" onClick={ handleClickDecreaseModulus }><ArrowDownLine /></Button>
        </ButtonGroup>
        <Latex math="\mathbb{Z}" />
      </Stack>
    )
  }

  return (
    <Stack className="equation-editor" spacing={ 8 }>
      
      <LockedEquation />

      <Whisper
        trigger="click"
        placement="bottomEnd"
        controlId="trigger"
        speaker={
          <Popover
            visible={ editing }
            placement="bottomEnd"
            className="equation-editor-popover"
          >
            <UnlockedEquation />
          </Popover>          
        }
      >
        <Button onClick={ () => setEditing(!editing) } appearance="subtle">
          <ArrowDownLine style={{ color: editing ? 'grey' : '#277fe2' }}/>
        </Button>
      </Whisper>


    </Stack>
  )
}

