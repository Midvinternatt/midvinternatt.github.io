import Enemy from "./Entities/Enemies/Enemy.js";
import Vector from "./Vector.js";

// Enemy.attachEmitter()

class BulletEmitter { // CircleEmitter / ConeEmitter / SquareEmitter
    // shape
    // cooldown / heartbeat / tickRate / fireRate
    // bullettype
    // update() styr eventuella patterns
}

export default class EnemyScript {
    enemy: Enemy;

    waypoint: Vector;

    constructor(enemy: Enemy) {

    }
}

class Wave {
    wave1() {
        // spawn(enemyType, timeFromWavestart, path)
    }
}

// Skriv om bulletkoden?
// https://www.reddit.com/r/gamedev/comments/16gci3m/how_to_efficiently_write_bullet_hell_patterns/
// Kolla Build()
// https://gamedev.stackexchange.com/questions/16252/how-do-i-make-objects-move-along-a-path

// https://github.com/DickerDackel/patternengine
// https://www.reddit.com/r/shmupdev/
// https://www.reddit.com/r/gamedev/comments/1dhsvf8/comment/l8z1vl1/
// https://www.reddit.com/r/gamedev/comments/1dhsvf8/comment/l8z8itg/



class Path {
    currentNode: number;
    minimumDistance: number;
    nodeList: Vector[];
    killOnCompletion: boolean;

    constructor(moveSpeed: number) {
        this.currentNode = 0;
    }
    addNode(position: Vector) {

    }
    nextNode(): Vector {
        this.currentNode++;
        return this.nodeList[this.currentNode];
    }
    hasReachedNode(enemyPosition: Vector): boolean {
        return this.nodeList[this.currentNode].copy().subtract(enemyPosition).length < this.minimumDistance;
    }
}