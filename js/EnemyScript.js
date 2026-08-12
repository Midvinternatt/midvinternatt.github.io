// Enemy.attachEmitter()
class BulletEmitter {
}
export default class EnemyScript {
    enemy;
    waypoint;
    constructor(enemy) {
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
    currentNode;
    minimumDistance;
    nodeList;
    killOnCompletion;
    constructor(moveSpeed) {
        this.currentNode = 0;
    }
    addNode(position) {
    }
    nextNode() {
        this.currentNode++;
        return this.nodeList[this.currentNode];
    }
    hasReachedNode(enemyPosition) {
        return this.nodeList[this.currentNode].copy().subtract(enemyPosition).length < this.minimumDistance;
    }
}
//# sourceMappingURL=EnemyScript.js.map