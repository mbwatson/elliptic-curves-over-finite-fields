import { useMemo } from 'react'
import prime from 'get-primes'
import { useApp } from '../context'

export const ModulusForm = () => {
  const { modulus, setModulus } = useApp()
  const primes = useMemo(() => prime(200), [])

  const handleSelectModulus = event => {
    setModulus(+event.target.value)
  }

  return (
    <div>
      modulus{' '}
      <select value={ modulus } onChange={ handleSelectModulus }>
        {
          primes.map(p => (
            <option value={ p } key={ `option-${ p }` }>{ p }</option>
          ))
        }
      </select>
    </div>
  )
}
