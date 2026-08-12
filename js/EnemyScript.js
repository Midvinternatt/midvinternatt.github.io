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
    }
}
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