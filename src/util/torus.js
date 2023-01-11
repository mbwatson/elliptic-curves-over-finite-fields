module.exports = createTorusMesh

function createTorusMesh(opt) {
  opt = opt || {}
  const majorRadius = opt.majorRadius || 2
  const minorRadius = opt.minorRadius || 1
  const minorSegments = opt.minorSegments || 7
  const majorSegments = opt.majorSegments || 7
  const twoPi = 2 * Math.PI
  const arc = opt.arc || twoPi

  const center = [0, 0, 0]
  let positions = []

  for (let j = 0; j <= minorSegments; j++) {
    for (let i = 0; i <= majorSegments; i++) {
      let u = i / majorSegments * arc
      let v = j / minorSegments * twoPi

      center[0] = majorRadius * Math.cos(u)
      center[1] = majorRadius * Math.sin(u)

      const vertex = {
        cell: { x: i, y: j },
        coordinates: {
          x: (majorRadius + minorRadius * Math.cos(v)) * Math.cos(u),
          y: (majorRadius + minorRadius * Math.cos(v)) * Math.sin(u),
          z: minorRadius * Math.sin(v),
        }
      }
      positions.push(vertex)
    }
  }

  return {
    positions,
  }
}
