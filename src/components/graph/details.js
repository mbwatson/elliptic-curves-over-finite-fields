import { Fragment, useCallback } from 'react'
import { InlineMath } from 'react-katex'
import { useConfig } from '../../context'

//

export const Details = () => {
  const { generator, subgroup } = useConfig()

  const SubgroupElementsList = useCallback(() => {
    return (
      <p>
        &#123;{' '}{
          subgroup.map(g => (
            <Fragment key={ `sg-item-${ JSON.stringify(g) }` }>
              <InlineMath math={ `(${ g.x }, ${ g.y })` } /><span>,{' '}</span>
            </Fragment>
          ))
        }<InlineMath math="\mathcal{O}" />{' '}&#125;
      </p>
    )
  }, [subgroup])

  return generator ? (
    <div>
      The point <InlineMath math={ `g = (${ generator.x }, ${ generator.y })` } /> generates a subgroup of order { subgroup.length + 1 }:<br />
      <SubgroupElementsList />
    </div>
  ) : <div>Click a generator point from the graph.</div>
}

