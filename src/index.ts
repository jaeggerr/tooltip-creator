import { tooltipPath, CornerRadius, ArrowPosition } from './utils/svg'

/**
 * Generates the content of the SVG file representing the tooltip
 * @param options The options
 */
export function tooltipSVG (options: {
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
   * Size of the shadow. Set 0 for no shadow.
   */
  shadowSize?: number
}): string {
  const { arrow } = options
  const shadowSize = options.shadowSize || 0
  const path = tooltipPath({
    x: 2 * shadowSize,
    y: 2 * shadowSize,
    width: options.width,
    height: options.height,
    cornerRadius: options.cornerRadius,
    arrow: options.arrow
  })

  let width = options.width + 4 * shadowSize
  if (arrow && (arrow.position === 'left' || arrow.position === 'right')) width += arrow.height

  let height = options.width + 4 * shadowSize
  if (arrow && (arrow.position === 'top' || arrow.position === 'bottom')) height += arrow.height

  const filterXOffset = (shadowSize / options.width) * -200
  const filterYOffset = (shadowSize / options.height) * -200
  const filterWidth = 100 + (shadowSize / options.width) * 400
  const filterHeight = 100 + (shadowSize / options.height) * 400

  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="${width}px" height="${height}px" viewBox="0 0 ${width} ${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
          <path d="${path.toString()}" id="tooltip"></path>
          <filter id="shadow" x="${filterXOffset}%" y="${filterYOffset}%" width="${filterWidth}%" height="${filterHeight}%">
            <feOffset result="offOut" in="SourceGraphic" dx="0" dy="0" />
            <feColorMatrix result="matrixOut" in="offOut" type="matrix"
            values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
            <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="${shadowSize}" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
      </defs>
      <g>
        <use fill="${options.fillColor}" fill-rule="evenodd" xlink:href="#tooltip"${shadowSize ? ' filter="url(#shadow)"' : ''}></use>
      </g>
  </svg>
  `
}
