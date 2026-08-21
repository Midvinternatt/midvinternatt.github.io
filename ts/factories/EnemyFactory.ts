import Enemy from "../entities/Enemy.js";
import GameData, { EnemyType } from "../GameData.js";
import { Pattern } from "../levels/Pattern.js";
import Vector from "../Vector.js";

export class EnemyFactory {
    create(type: EnemyType, position: Vector, pattern: Pattern, lifetime: number): Enemy {
        switch (type) {
            case "drone":
                return new Enemy({
                    enemyData: GameData.getEnemyData(type),
                    position,
                    pattern,
                    lifetime
                })
        }
    }
}