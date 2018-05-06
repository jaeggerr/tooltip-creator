export type Instruction = 'M' | 'C' | 'L' | 'Q'

/**
 * Helper class to build SVG paths
 */
export class PathBuilder {
  private d: string[] = []

  moveTo (x: number, y: number) {
    this.append('M', x, y)
  }

  lineTo (x: number, y: number) {
    this.append('L', x, y)
  }

  quadraticCurveTo (x: number, y: number, x1: number, y1: number) {
    this.d.push(`Q ${x},${y} ${x1},${y1}`)
  }

  closePath () {
    this.d.push('Z')
  }

  toString (): string {
    return this.d.join(' ')
  }

  private append (instruction: Instruction, x: number, y: number) {
    this.d.push(`${instruction} ${x},${y}`)
  }
}
