export declare type Instruction = 'M' | 'C' | 'L' | 'Q';
/**
 * Helper class to build SVG paths
 */
export declare class PathBuilder {
    private d;
    moveTo(x: number, y: number): void;
    lineTo(x: number, y: number): void;
    quadraticCurveTo(x: number, y: number, x1: number, y1: number): void;
    closePath(): void;
    toString(): string;
    private append(instruction, x, y);
}
