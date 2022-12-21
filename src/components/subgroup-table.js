import { useApp } from '../context'
import { InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

export const SubgroupTable = () => {
  const { generator } = useApp()

  return (
    <div>
      {
        generator
          ? <InlineMath math={ `g = (${ generator.x }, ${ generator.y })` } />
          : <InlineMath math={ `g = \\text{undefined}` } />
      }
    </div>
  )
}