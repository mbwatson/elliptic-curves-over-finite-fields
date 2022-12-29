import PropTypes from 'prop-types'
import { BlockMath, InlineMath } from 'react-katex'

export const Latex = ({ block, math }) => {
  if (block) {
    return <BlockMath math={ math } />
  }
  return <InlineMath math={ math } />
}

Latex.propTypes = {
  block: PropTypes.bool,
  math: PropTypes.string.isRequired,
}
