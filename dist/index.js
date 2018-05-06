"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var svg_1 = require("./utils/svg");
/**
 * Generates the content of the SVG file representing the tooltip
 * @param options The options
 */
function tooltip(options) {
    var arrow = options.arrow;
    var shadowSize = options.shadowSize || 0;
    var pathOptions = {
        x: 2 * shadowSize,
        y: 2 * shadowSize,
        width: options.width,
        height: options.height,
        cornerRadius: options.cornerRadius,
        arrow: options.arrow
    };
    var path = svg_1.tooltipPath(pathOptions);
    var width = options.width + 4 * shadowSize;
    if (arrow && (arrow.position === 'left' || arrow.position === 'right'))
        width += arrow.height;
    var height = options.width + 4 * shadowSize;
    if (arrow && (arrow.position === 'top' || arrow.position === 'bottom'))
        height += arrow.height;
    var filterXOffset = (shadowSize / options.width) * -200;
    var filterYOffset = (shadowSize / options.height) * -200;
    var filterWidth = 100 + (shadowSize / options.width) * 400;
    var filterHeight = 100 + (shadowSize / options.height) * 400;
    var svg = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n  <svg width=\"" + width + "px\" height=\"" + height + "px\" viewBox=\"0 0 " + width + " " + height + "\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n      <defs>\n          <path d=\"" + path.toString() + "\" id=\"tooltip\"></path>\n          <filter id=\"shadow\" x=\"" + filterXOffset + "%\" y=\"" + filterYOffset + "%\" width=\"" + filterWidth + "%\" height=\"" + filterHeight + "%\">\n            <feOffset result=\"offOut\" in=\"SourceGraphic\" dx=\"0\" dy=\"0\" />\n            <feColorMatrix result=\"matrixOut\" in=\"offOut\" type=\"matrix\"\n            values=\"0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0\" />\n            <feGaussianBlur result=\"blurOut\" in=\"matrixOut\" stdDeviation=\"" + shadowSize + "\" />\n            <feBlend in=\"SourceGraphic\" in2=\"blurOut\" mode=\"normal\" />\n        </filter>\n      </defs>\n      <g>\n        <use fill=\"" + options.fillColor + "\" fill-rule=\"evenodd\" xlink:href=\"#tooltip\"" + (shadowSize ? ' filter="url(#shadow)"' : '') + "></use>\n      </g>\n  </svg>\n  ";
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
    };
}
exports.tooltip = tooltip;
