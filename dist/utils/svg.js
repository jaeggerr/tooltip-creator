"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_builder_1 = require("./path-builder");
/**
 * Generates a path
 * @param options Options
 */
function tooltipPath(options) {
    var cornerRadius;
    if (typeof options.cornerRadius === 'number') {
        cornerRadius = {
            upperLeft: options.cornerRadius,
            upperRight: options.cornerRadius,
            lowerLeft: options.cornerRadius,
            lowerRight: options.cornerRadius
        };
    }
    else {
        cornerRadius = options.cornerRadius;
    }
    var width = options.width, height = options.height, arrow = options.arrow;
    var x = options.x || 0;
    var y = options.y || 0;
    if (arrow && arrow.position === 'left')
        x += arrow.height;
    if (arrow && arrow.position === 'top')
        y += arrow.height;
    var path = new path_builder_1.PathBuilder();
    path.moveTo(x + cornerRadius.upperLeft, y);
    // Top
    if (arrow && arrow.position === 'top') {
        path.lineTo(x + arrow.start, y);
        path.lineTo(x + arrow.start + arrow.base / 2, y - arrow.height);
        path.lineTo(x + arrow.start + arrow.base, y);
    }
    path.lineTo(x + width - cornerRadius.upperRight, y);
    path.quadraticCurveTo(x + width, y, x + width, y + cornerRadius.upperRight);
    // Right
    if (arrow && arrow.position === 'right') {
        path.lineTo(x + width, y + arrow.start);
        path.lineTo(x + width + arrow.height, y + arrow.start + arrow.base / 2);
        path.lineTo(x + width, y + arrow.start + arrow.base);
    }
    path.lineTo(x + width, y + height - cornerRadius.lowerRight);
    path.quadraticCurveTo(x + width, y + height, x + width - cornerRadius.lowerRight, y + height);
    // Bottom
    if (arrow && arrow.position === 'bottom') {
        path.lineTo(x + arrow.start + arrow.base, y + height);
        path.lineTo(x + arrow.start + arrow.base / 2, y + height + arrow.height);
        path.lineTo(x + arrow.start, y + height);
    }
    path.lineTo(x + cornerRadius.lowerLeft, y + height);
    path.quadraticCurveTo(x, y + height, x, y + height - cornerRadius.lowerLeft);
    // Left
    if (arrow && arrow.position === 'left') {
        path.lineTo(x, y + arrow.start + arrow.base);
        path.lineTo(x - arrow.height, y + arrow.start + arrow.base / 2);
        path.lineTo(x, y + arrow.start);
    }
    path.lineTo(x, y + cornerRadius.upperLeft);
    path.quadraticCurveTo(x, y, x + cornerRadius.upperLeft, y);
    path.closePath();
    return path;
}
exports.tooltipPath = tooltipPath;
