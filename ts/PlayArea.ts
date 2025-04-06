export default class PlayArea {
    width: number;
    height: number;
    // outerWidth: number;
    // outerHeight: number;

    constructor(width, height, outerWidth?, outerHeight?) {
        this.width = width;
        this.height = height;
        // this.outerWidth = outerWidth;
        // this.outerHeight = outerHeight;
    }

    isPointInbound(x, y) {
        return (0 < x && x < this.width) && (0 < y && y < this.height);
    }
    // isPointInView() {

    // }
}