import { Fragment, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useConfig } from '../../context'
import { useDrawer } from './'
import { Drawer as RSDrawer, Stack } from 'rsuite'
import { Latex } from '../latex'
import './index.css'

//

const Detail = ({ children, title }) => {
  return (
    <div className="detail">
      <div className="detail-title">
        <h6>{ title }</h6>
      </div>
      <div className="detail-body">
        { children }
      </div>
    </div>
  )
}

Detail.propTypes = {
  children: PropTypes.node,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
}

//

export const Drawer = () => {
  const drawer = useDrawer()
  const { equationLatex, generator, graph, modulus, subgroup } = useConfig()

  const Solutions = useCallback(() => {
    return (
      <Detail title="Solutions">
        <Latex math={ equationLatex } /> has <Latex math={ `\\bold{${ graph.length + 1 }}` } /> solutions
        over <Latex math={ `\\mathbb{Z}_{${ modulus }}` } />.
      </Detail>
    )
  }, [equationLatex, graph, modulus])

  const GeneratorElement = useCallback(() => (
    <Detail title="Generator">
      <Latex math={ `(${ generator.x }, ${ generator.y })` } />
    </Detail>
  ), [generator])

  const SubgroupList = useCallback(() => (
    <Detail title={ <span>Subgroup (order { subgroup.length + 1 })</span> }>
      <p>
        <Latex math={ `\\langle g \\rangle = ` } />
        {' '}&#123;{' '}{
          subgroup.map(g => (
            <Fragment key={ `sg-item-${ JSON.stringify(g) }` }>
              <Latex math={ `(${ g.x }, ${ g.y })` } /><span>,{' '}</span>
            </Fragment>
          ))
        }<Latex math="\mathcal{O}" />{' '}&#125;
      </p>
    </Detail>
  ), [subgroup])

  return (
    <RSDrawer
      size="sm"
      open={ drawer.open }
      onClose={ () => drawer.toggle() }
    >
      <RSDrawer.Header>
        <RSDrawer.Title>Details</RSDrawer.Title>
      </RSDrawer.Header>

      <RSDrawer.Body
        as={ Stack }
        direction="column"
        alignItems="flex-start"
        spacing="1rem"
      >
        <Solutions />
        {
          generator && (
            <Fragment>
              <GeneratorElement />
              <SubgroupList />
            </Fragment>
          )
        }
      </RSDrawer.Body>
    </RSDrawer>

  )
}
