export default class ScreenBounds {
    // outerWidth: number;
    // outerHeight: number;
    constructor(width, height, outerWidth, outerHeight) {
        this.width = width;
        this.height = height;
        // this.outerWidth = outerWidth;
        // this.outerHeight = outerHeight;
    }
    isVectorInbound(vector) {
        return (0 < vector.x && vector.x < this.width) && (0 < vector.y && vector.y < this.height);
    }
    isCoordinateInbound(x, y) {
        return (0 < x && x < this.width) && (0 < y && y < this.height);
    }
}
//# sourceMappingURL=ScreenBounds.js.map