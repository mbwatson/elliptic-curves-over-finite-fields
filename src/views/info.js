import { Divider, Stack } from 'rsuite'
import { BlockMath, InlineMath } from 'react-katex'
import { useConfig } from '../context'
import { FiniteFieldGraph } from '../components/graph'
import { Link } from '../components/link'

export const InfoView = () => {
  const { discriminant, equationLatex, graph, modulus, params } = useConfig()

  return (
    <div>
      <h1>Information</h1>

      <Divider />

      <p>
        Such a curve is defined by an equation of the form 
      </p>
      
      <BlockMath math="y^2 = x^3 + Ax + B" />

      <p>
        over a field <InlineMath math="\mathbb{K}" />
        and describes points in <InlineMath math="\mathbb{K}^2" />.
        For <InlineMath math="\mathbb{K}^2" /> with characteristic not equal to either 2 or 3,
        such a curve can then be described as a plane algebraic curve consisting of
        solutions <InlineMath math={ `(x, y) \\in \\mathbb{K}^2` } />,
      </p>

      <p>
        Equations of the above form have discriminant <InlineMath math="\Delta = -16(4A^3 + 27B^2)" />,
        and we must have <InlineMath math="\Delta \neq 0" />.
        See the <Link to="https://mathworld.wolfram.com/EllipticDiscriminant.html">Elliptic Discriminant</Link> page
        over at Worlfram MathWorld for more details.
      </p>

      <p>
        The points on an elliptic curve,
        along with the point <InlineMath math="\mathcal{O}" /> at infinity, our group identity,
        form a group with an additional law I will not describe now.
      </p>

      <p>
        Here, we&apos;ll consider <InlineMath math={ `\\mathbb{K} = \\mathbb{Z}/p\\mathbb{Z}` } />,
        for some prime <InlineMath math="p" /> and coefficients <InlineMath math="A, B \in \mathbb{Z}/p\mathbb{Z}" />.
        Thus we are interested in
        <BlockMath math={ `(x, y) \\in \\mathbb{Z}/p\\mathbb{Z}\\times\\mathbb{Z}/p\\mathbb{Z} \\cup \\mathcal{O},` } />
        which&mdash;aside from the point at infinity&mdash;can be viewed
        as cells on a <InlineMath math="p \times p" /> grid. 
      </p>

      <Divider />

      <p>
        Here, we consider <InlineMath math={ `\\mathbb{K} = \\mathbb{Z}/${ modulus }\\mathbb{Z}` } />{' '}
        and coefficients <InlineMath math={ `A = ${ params.a }` } /> and{' '} <InlineMath math={ `B = ${ params.b }` } />.
        Thus we are interested in <InlineMath math={ `x, y \\in \\mathbb{Z}/${ modulus }\\mathbb{Z}` } /> such that
      </p>

      <BlockMath math={ equationLatex + '.' } />

      <Divider />

      <p>
        Let&apos;s take a look at the graph of the { graph.length } solutions to this equation
        that lie in <InlineMath math={ `[${ modulus }] \\times [${ modulus }]` } />.
      </p>

      <Stack justifyContent="center">
        <FiniteFieldGraph
          width={ 300 }
          n={ modulus }
          cells={ graph.map(p => ({ ...p, rectProps: { fill: 'slategrey' }})) }
        />
      </Stack>

      <p>
        Recall, too, that there is an additional unrepresentated solution <InlineMath math="\mathcal{O}" /> at infinity,
        thus our equation has a total of { graph.length + 1 } solutions.
      </p>

      <p>
        The set of points forms a group, and we are interested in the subgroups and their generators.
      </p>

      <p>
        Each solution generates a cyclic subgroup. Starting with a point <InlineMath math="P" />,
        we calculate <InlineMath math="P+P" />, <InlineMath math="P+P+P" />, and so on
        until we find some <InlineMath math="k" /> such that <InlineMath math="k \cdot P = \mathcal{O}" />.
      </p>

      <p>
        Let us take a look at the discriminant.
      </p>

      <BlockMath math={
        `\\Delta
          = -16(4A^3 + 27B^2)
          = -16(4\\cdot${ params.a } + 27\\cdot${ params.b }^2)
          = ${ discriminant }.`
      } />

    </div>
  )
}