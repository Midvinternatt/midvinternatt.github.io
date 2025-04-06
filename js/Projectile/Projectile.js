class Projectile {
    constructor(position, size, collisionSize) {
        this._position = position;
        this._width = size;
        this._height = size;
        // this._size = size;
        this._collisionSize = collisionSize;
        Projectile._projectileList.push(this);
    }
    kill() {
        Projectile._projectileList.splice(Projectile._projectileList.indexOf(this), 1);
    }
    draw(context) {
        context.fillRect(this._position.x - (this._width / 2), this._position.y - (this._height / 2), this._width, this._height);
    }
}
Projectile._projectileList = new Array();
export default Projectile;
//# sourceMappingURL=Projectile.js.map