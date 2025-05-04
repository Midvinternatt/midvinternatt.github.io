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

// E:\Downloads\Shared\Desktop\kemono\eifra\00358-1765298876.png
// E:\Downloads\Shared\Desktop\kemono\241124\00203-20241110063656.png
// E:\Downloads\Shared\Desktop\kemono\250225\Bananaaa_+(2)s4u5.png
// E:\Downloads\Shared\Desktop\gelbooru\f5595db077931cd7b6946454b0c6477c.jpg
// E:\Downloads\Shared\Desktop\kemono\kemono2\uVxlofn6ZPmTVdkAckeasZP6.jpeg
// E:\Downloads\Shared\Desktop\gelbooru\e4cba5a6aa8adc73f08b1636342b9930.jpg
// E:\Downloads\Shared\Desktop\gelbooru\fdefaeb96aa68477ee05a5c083f5294e.jpg
// E:\Downloads\Shared\Desktop\gelbooru\939c7b2319b24c2043dfa0f0badcc3a7.jpg
// E:\Downloads\Shared\Desktop\gelbooru\4890e1f7c99372f1e014c65b0c10b406.png
// E:\Downloads\Shared\Desktop\kemono\241124\2\00169-20241120035831.png
// E:\Downloads\Shared\Desktop\kemono\kemo\ans\B05043 (2).jpg
// E:\Downloads\Shared\Desktop\kemono\kemono2\31a3a6d4-9579-47bf-a85c-094ef094b93d.png
// E:\Downloads\Shared\Desktop\kemono\250225\20241130240077-2344538467.png
// E:\Downloads\Shared\Desktop\kemono\kemono2\1RISU.png
// E:\Downloads\Shared\Desktop\gelbooru\4afa4a499ea9fb49447be4c5137c8ccf.png

// E:\Downloads\Shared\Desktop\gelbooru\17d46492d316d0107ba6994ce5cee545.png
// E:\Downloads\Shared\Desktop\gelbooru\e1f7eb7294b2660cb8e5be510a3d18f7.jpg
// E:\Downloads\Shared\Desktop\kemono\250225\Bananaaa_++(31)dity.png
// E:\Downloads\Shared\Desktop\gelbooru\67fb40549e2844af645da0cd9b79601f.jpg
// E:\Downloads\Shared\Desktop\gelbooru\03700678bd426e72bed0a194f341d744.png
// E:\Downloads\Shared\Desktop\kemono\250225\Z0M2W6ZJDAD8D2MESS90NW6WN0.jpg
// E:\Downloads\Shared\Desktop\gelbooru\1c2ad3c0f8d35a6120242d96fe86ccd8.jpg
// E:\Downloads\Shared\Desktop\gelbooru\b6a0963dabea4c4548836be28b1bef19.png
// E:\Downloads\Shared\Desktop\kemono\250225\NbNSHZWtaB2s2irZ4s9urlLv.png
// E:\Downloads\Shared\Desktop\gelbooru\f5a9e6842dd03fc3395de3f3023e648e.jpg
// E:\Downloads\Shared\Desktop\kemono\kemono2\frieren art NSFW.png
// E:\Downloads\Shared\Desktop\kemono\kemono2\Kagu d 6.png
// E:\Downloads\Shared\Desktop\kemono\kemono2\07985424-149b-4203-81e2-1341636e10d3.png