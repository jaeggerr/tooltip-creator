import { PathBuilder } from './path-builder'

export interface CornerRadius {
  upperLeft: number
  upperRight: number
  lowerLeft: number
  lowerRight: number
}

export type ArrowPosition = 'top' | 'right' | 'bottom' | 'left'

/**
 * Generates a path
 * @param options Options
 */
export function tooltipPath (options: {
  width: number
  height: number
  cornerRadius: number | CornerRadius
  x?: number
  y?: number
  arrow?: {
    position: ArrowPosition
    base: number
    height: number
    start: number
  }
}): PathBuilder {
  let cornerRadius: CornerRadius
  if (typeof options.cornerRadius === 'number') {
    cornerRadius = {
      upperLeft: options.cornerRadius,
      upperRight: options.cornerRadius,
      lowerLeft: options.cornerRadius,
      lowerRight: options.cornerRadius
    }
  } else {
    cornerRadius = options.cornerRadius as CornerRadius
  }

  const { width, height, arrow } = options

  let x = options.x || 0
  let y = options.y || 0
  if (arrow && arrow.position === 'left') x += arrow.height
  if (arrow && arrow.position === 'top') y += arrow.height

  const path = new PathBuilder()
  path.moveTo(x + cornerRadius.upperLeft, y)

  // Top
  if (arrow && arrow.position === 'top') {
    path.lineTo(x + arrow.start, y)
    path.lineTo(x + arrow.start + arrow.base / 2, y - arrow.height)
    path.lineTo(x + arrow.start + arrow.base, y)
  }
  path.lineTo(x + width - cornerRadius.upperRight, y)
  path.quadraticCurveTo(x + width, y, x + width, y + cornerRadius.upperRight)

  // Right
  if (arrow && arrow.position === 'right') {
    path.lineTo(x + width, y + arrow.start)
    path.lineTo(x + width + arrow.height, y + arrow.start + arrow.base / 2)
    path.lineTo(x + width, y + arrow.start + arrow.base)
  }
  path.lineTo(x + width, y + height - cornerRadius.lowerRight)
  path.quadraticCurveTo(x + width, y + height, x + width - cornerRadius.lowerRight, y + height)

  // Bottom
  if (arrow && arrow.position === 'bottom') {
    path.lineTo(x + arrow.start + arrow.base, y + height)
    path.lineTo(x + arrow.start + arrow.base / 2, y + height + arrow.height)
    path.lineTo(x + arrow.start, y + height)
  }
  path.lineTo(x + cornerRadius.lowerLeft, y + height)
  path.quadraticCurveTo(x, y + height, x, y + height - cornerRadius.lowerLeft)

  // Left
  if (arrow && arrow.position === 'left') {
    path.lineTo(x, y + arrow.start + arrow.base)
    path.lineTo(x - arrow.height, y + arrow.start + arrow.base / 2)
    path.lineTo(x, y + arrow.start)
  }
  path.lineTo(x, y + cornerRadius.upperLeft)
  path.quadraticCurveTo(x, y, x + cornerRadius.upperLeft, y)
  path.closePath()

  return path
}
