import Enemy from "../entities/Enemy.js";
import GameData from "../GameData.js";
export class EnemyFactory {
    create(type, position, pattern, lifetime) {
        switch (type) {
            case "drone":
                return new Enemy({
                    enemyData: GameData.getEnemyData(type),
                    position,
                    pattern,
                    lifetime
                });
        }
    }
}
//# sourceMappingURL=EnemyFactory.js.map