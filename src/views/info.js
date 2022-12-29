import { Container, Divider, Stack } from 'rsuite'
import { useConfig } from '../context'
import { GraphGrid } from '../components/graph'
import { Link } from '../components/link'
import { Latex } from '../components/latex'

export const InfoView = () => {
  const { discriminant, equationLatex, graph, modulus, params } = useConfig()

  return (
    <Container style={{ maxWidth: '800px', margin: 'auto' }}>
      <h1>Information</h1>

      <Divider />

      <p>
        An elliptic curve is defined by an equation of the form 
      </p>
      
      <Latex block math="y^2 = x^3 + Ax + B" />

      <p>
        and over some field <Latex math="\mathbb{K}" />.
        For <Latex math="\mathbb{K}^2" /> with characteristic equal to neither 2 nor 3,
        our equation&apos;s solutions <Latex math={ `(x, y) \\in \\mathbb{K}^2` } /> define
        a plane algebraic curve.
      </p>

      <p>
        Equations of the above form have discriminant <Latex math="\Delta = -16(4A^3 + 27B^2)" />,
        and we must have <Latex math="\Delta \neq 0" />.
        See the <Link to="https://mathworld.wolfram.com/EllipticDiscriminant.html">Elliptic Discriminant</Link> page
        over at Wolfram MathWorld for more details.
      </p>

      <p>
        The points on an elliptic curve,
        along with a point <Latex math="\mathcal{O}" /> at infinity,
        form a group with an additional law I will not describe now.
        The point <Latex math="\mathcal{O}" /> is our group identity.
      </p>

      <p>
        Here, we&apos;ll work in the field <Latex math={ `\\mathbb{K} = \\mathbb{Z}/p\\mathbb{Z}` } />,
        which we will denote simply by <Latex math="\mathbb{Z}_p" />.
        for some prime <Latex math="p" />, and coefficients <Latex math="A, B \in \mathbb{Z}_p" />.
        Thus we are interested in pairs <Latex math="(x, y) \in \mathbb{Z}_p\times\mathbb{Z}_p" />,
        which&mdash;aside from the point at infinity&mdash;can be viewed
        by coloring cells on a <Latex math="p \times p" /> grid. 
        We&apos;ll label columns with <Latex math="x \in [n]" /> across the top edge
        and rows with <Latex math="y \in [n]" /> downward along the left-hand side of the grid.
      </p>

      <Divider />

      <p>
        Here, we consider the field <Latex math={ `\\mathbb{K} = \\mathbb{Z}_{${ modulus }}` } />{' '}
        and coefficients <Latex math={ `A = ${ params.a }` } /> and{' '} <Latex math={ `B = ${ params.b }` } />.
        Seeking pairs <Latex math={ `(x, y) \\in \\mathbb{Z}_{${ modulus }}^2` } /> satisfying the equation
      </p>

      <Latex block math={ equationLatex + ',' } />

      <p>
        we&apos;ll take a look at the graph of this elliptic curve to visualize its { graph.length } solutions
        lying in <Latex math={ `\\mathbb{Z}_{${ modulus }}^2` } />.
      </p>

      <Stack justifyContent="center" style={{ margin: '2rem 0' }}>
        <GraphGrid
          width={ 300 }
          n={ modulus }
          cells={ graph.map(p => ({ ...p, rectProps: { fill: 'slategrey' }})) }
        />
      </Stack>

      <p>
        Recall, too, that there is an additional unrepresented
        solution <Latex math="\mathcal{O}" /> at infinity,
        thus our equation has a total of { graph.length + 1 } solutions.
      </p>

      <p>
        The set of points forms a group, and we are interested in the subgroups and their generators.
        Each point <Latex math="P" /> generates a cyclic subgroup. Starting with a point <Latex math="P" />,
        we calculate <Latex math="P+P" />, <Latex math="P+P+P" />, and so on
        until we find some <Latex math="k" /> such that <Latex math="k \cdot P = \mathcal{O}" />.
      </p>

      <p>
        Let us take a look at the discriminant.
      </p>

      <Latex block math={
        `\\Delta
          = -16(4A^3 + 27B^2)
          = -16(4\\cdot${ params.a } + 27\\cdot${ params.b }^2)
          = ${ discriminant }.`
      } />

    </Container>
  )
}