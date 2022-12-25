import { InlineMath } from 'react-katex'
import { useConfig } from '../../context'
import './graph.css'

//

export const GraphHeader = () => {
  const { equationLatex, graph, modulus } = useConfig()

  return (
    <div className="graph-header">
      <InlineMath math={ equationLatex } /> has { graph.length + 1 } solutions
      over <InlineMath math={ `\\mathbb{Z}/${ modulus }\\mathbb{Z}` } />.
    </div>
  )
}

