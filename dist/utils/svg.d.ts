import { PathBuilder } from './path-builder';
export interface CornerRadius {
    upperLeft: number;
    upperRight: number;
    lowerLeft: number;
    lowerRight: number;
}
export declare type ArrowPosition = 'top' | 'right' | 'bottom' | 'left';
/**
 * Generates a path
 * @param options Options
 */
export declare function tooltipPath(options: {
    width: number;
    height: number;
    cornerRadius: number | CornerRadius;
    x?: number;
    y?: number;
    arrow?: {
        position: ArrowPosition;
        base: number;
        height: number;
        start: number;
    };
}): PathBuilder;
