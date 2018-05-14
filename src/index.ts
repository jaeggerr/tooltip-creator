import { tooltipPath, CornerRadius, ArrowPosition } from './utils/svg'

/**
 * Generates the content of the SVG file representing the tooltip
 * @param options The options
 */
export function tooltip (options: {
  /**
   * The tooltip width without the arrow.
   */
  width: number
  /**
   * The tooltip height without the arrow.
   */
  height: number
  /**
   * The corner radius of the tooltip.
   * Can be a number for the same radius or an object with the radius of each corner.
   */
  cornerRadius: number | CornerRadius
  /**
   * The information about the arrow. Optional. Do not set it if you don't want any arrow.
   */
  arrow?: {
    /**
     * The arrow position. Values can be "top", "right", "bottom" or "left".
     */
    position: ArrowPosition
    /**
     * The base of the arrow.
     */
    base: number
    /**
     * The height of the arrow.
     */
    height: number
    /**
     * The start position of the arrow.
     * For left or right position, x position from the left.
     * For top or bottom position, y position from the top.
     */
    start: number
  },
  /**
   * The fill color of the tooltip and arrow.
   */
  fillColor: string
  /**
   * Shadow definitions
   */
  shadow?: {
    /**
     * Size of the shadow. Set 0 for no shadow.
     */
    size: number
    /**
     * Shadow color.
     * Default is black.
     */
    color?: string
    /**
     * Opacity. Between 0 and 1.
     * Default is 0.5.
     */
    opacity?: number
    /**
     * Shadow position offset from center.
     * Default is { x: 0, y: 0 }
     */
    offset?: { x: number, y: number }
  }
}): {
  /**
   * The content of the SVG file
   */
  svg: string
  /**
   * The content insents. Use it as the minimum padding of the content.
   */
  insets: { top: number, right: number, bottom: number, left: number }
  /**
   * The total size of the SVG
   */
  size: {
    width: number
    height: number
  }
} {
  const { arrow } = options
  const shadowSize = (options.shadow) ? options.shadow.size : 0
  const shadowSideMultiplier = 2.5
  const pathOptions = {
    x: shadowSideMultiplier * shadowSize,
    y: shadowSideMultiplier * shadowSize,
    width: options.width,
    height: options.height,
    cornerRadius: options.cornerRadius,
    arrow: options.arrow
  }
  const path = tooltipPath(pathOptions)

  let width = options.width + 2 * shadowSideMultiplier * shadowSize
  if (arrow && (arrow.position === 'left' || arrow.position === 'right')) width += arrow.height

  let height = options.height + 2 * shadowSideMultiplier * shadowSize
  if (arrow && (arrow.position === 'top' || arrow.position === 'bottom')) height += arrow.height

  const filterXOffset = (shadowSize * shadowSideMultiplier / options.width) * -200
  const filterYOffset = (shadowSize * shadowSideMultiplier / options.height) * -200
  const filterWidth = 100 + (shadowSize * shadowSideMultiplier / options.width) * 400
  const filterHeight = 100 + (shadowSize * shadowSideMultiplier / options.height) * 400
  let shadowColor = 'rgb(0, 0, 0)'
  let shadowOpacity = 0.5
  let shadowOffset = { x: 0, y: 0 }
  if (options.shadow) {
    if (options.shadow.color) shadowColor = options.shadow.color
    if (options.shadow.opacity) shadowOpacity = options.shadow.opacity
    if (options.shadow.offset) shadowOffset = options.shadow.offset
  }

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="${width}px" height="${height}px" viewBox="0 0 ${width} ${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <path d="${path.toString()}" id="tooltip"></path>
      <filter id="shadow" x="${filterXOffset}%" y="${filterYOffset}%" width="${filterWidth}%" height="${filterHeight}%">
        <feGaussianBlur stdDeviation="${shadowSize}" />
        <feOffset dx="${shadowOffset.x}" dy="${shadowOffset.y}" result="blur"/>
        <feFlood flood-color="${shadowColor}" flood-opacity="${shadowOpacity}"/>
        <feComposite in2="blur" operator="in" result="colorShadow"/>
        <feComposite in="SourceGraphic" in2="colorShadow" operator="over"/>
      </filter>
    </defs>
    <g>
      <use fill="${options.fillColor}" fill-rule="evenodd" xlink:href="#tooltip"${shadowSize ? ' filter="url(#shadow)"' : ''}></use>
    </g>
  </svg>
  `
  return {
    svg: svg,
    insets: {
      top: pathOptions.y + ((arrow && arrow.position === 'top') ? arrow.height : 0),
      left: pathOptions.x + ((arrow && arrow.position === 'left') ? arrow.height : 0),
      right: pathOptions.x + ((arrow && arrow.position === 'right') ? arrow.height : 0),
      bottom: pathOptions.y + ((arrow && arrow.position === 'bottom') ? arrow.height : 0)
    },
    size: {
      width: width,
      height: height
    }
  }
}
