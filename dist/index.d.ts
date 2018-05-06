import { CornerRadius, ArrowPosition } from './utils/svg';
/**
 * Generates the content of the SVG file representing the tooltip
 * @param options The options
 */
export declare function tooltip(options: {
    /**
     * The tooltip width without the arrow.
     */
    width: number;
    /**
     * The tooltip height without the arrow.
     */
    height: number;
    /**
     * The corner radius of the tooltip.
     * Can be a number for the same radius or an object with the radius of each corner.
     */
    cornerRadius: number | CornerRadius;
    /**
     * The information about the arrow. Optional. Do not set it if you don't want any arrow.
     */
    arrow?: {
        /**
         * The arrow position. Values can be "top", "right", "bottom" or "left".
         */
        position: ArrowPosition;
        /**
         * The base of the arrow.
         */
        base: number;
        /**
         * The height of the arrow.
         */
        height: number;
        /**
         * The start position of the arrow.
         * For left or right position, x position from the left.
         * For top or bottom position, y position from the top.
         */
        start: number;
    };
    /**
     * The fill color of the tooltip and arrow.
     */
    fillColor: string;
    /**
     * Size of the shadow. Set 0 for no shadow.
     */
    shadowSize?: number;
}): {
    /**
     * The content of the SVG file
     */
    svg: string;
    /**
     * The content insents. Use it as the minimum padding of the content.
     */
    insets: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    /**
     * The total size of the SVG
     */
    size: {
        width: number;
        height: number;
    };
};
