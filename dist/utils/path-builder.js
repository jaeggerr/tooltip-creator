"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Helper class to build SVG paths
 */
var PathBuilder = /** @class */ (function () {
    function PathBuilder() {
        this.d = [];
    }
    PathBuilder.prototype.moveTo = function (x, y) {
        this.append('M', x, y);
    };
    PathBuilder.prototype.lineTo = function (x, y) {
        this.append('L', x, y);
    };
    PathBuilder.prototype.quadraticCurveTo = function (x, y, x1, y1) {
        this.d.push("Q " + x + "," + y + " " + x1 + "," + y1);
    };
    PathBuilder.prototype.closePath = function () {
        this.d.push('Z');
    };
    PathBuilder.prototype.toString = function () {
        return this.d.join(' ');
    };
    PathBuilder.prototype.append = function (instruction, x, y) {
        this.d.push(instruction + " " + x + "," + y);
    };
    return PathBuilder;
}());
exports.PathBuilder = PathBuilder;
