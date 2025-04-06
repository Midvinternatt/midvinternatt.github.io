import Projectile from "./Projectile.js";
export default class Bullet extends Projectile {
    // static bulletList: Bullet[] = [];
    // _position: Vector;
    // _velocity: Vector;
    // _size: number;
    // _collisionSize: number;
    // width: number;
    // height: number;
    constructor(position, velocity, size) {
        super(position, size, size);
        this._velocity = velocity;
        // this.width = size
        // this.height = size;
        // Bullet._projectileList.push(this);
    }
    checkCollision(targetList) {
        targetList.forEach(target => {
            if (this._position.copy().subtract(target._position).length < 50) {
                this.kill();
                return;
            }
        });
    }
    checkCollisions(target) {
    }
    pause() {
        throw new Error("Method not implemented.");
    }
    update() {
        this.move();
        // this.checkCollision(Enemy._enemyList)
    }
    move() {
        this._position.add(this._velocity);
        if (this._position.x < 0 || this._position.x > 1024
            || this._position.y < 0 || this._position.y > 1024)
            this.kill();
    }
}
//# sourceMappingURL=Bullet.js.map