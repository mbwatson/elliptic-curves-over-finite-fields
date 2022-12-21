import { useMemo } from 'react'
import { useApp } from '../context'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

const simplify = (numerator, denominator) => {
  let gcd = (a,b) => b ? gcd(b, a % b) : a
  gcd = gcd(numerator, denominator)
  return [numerator / gcd, denominator / gcd]
}

export const SubgroupTable = () => {
  const { generator, params } = useApp()

  const slope = useMemo(() => {
    if (!generator) {
      return null
    }
    return simplify(3 * generator.x ** 2 + params.a, 2 * generator.y)
  }, [generator])

  return (
    <div>
      {
        generator
          ? <BlockMath math={ `g = (${ generator.x }, ${ generator.y })` } />
          : <BlockMath math={ `g = \\text{undefined}` } />
      }
      {
        slope && <BlockMath math={ `m_g = \\frac{${ slope[0] }}{${ slope[1] }}` } />
      }
    </div>
  )
}