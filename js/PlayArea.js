export default class PlayArea {
    // outerWidth: number;
    // outerHeight: number;
    constructor(width, height, outerWidth, outerHeight) {
        this.width = width;
        this.height = height;
        // this.outerWidth = outerWidth;
        // this.outerHeight = outerHeight;
    }
    isPointInbound(x, y) {
        return (0 < x && x < this.width) && (0 < y && y < this.height);
    }
}
//# sourceMappingURL=PlayArea.js.map