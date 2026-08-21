export var GAMELEVEL;
(function (GAMELEVEL) {
    GAMELEVEL["DEBUG"] = "debug";
    GAMELEVEL["One"] = "level01";
})(GAMELEVEL || (GAMELEVEL = {}));
const levels = [
    "debug",
    "level01"
];
export default class GameData {
    static levelData = new Map();
    static enemyData;
    static weaponData = new Map();
    static getLevelData(id) {
        return this.levelData.get(id);
    }
    static getEnemyData(type) {
        return this.enemyData[type];
    }
    static async _loadLevel(url) {
        const response = await fetch(`data/levels/${url}.json`);
        return response.json();
    }
    static async loadLevels() {
        const data = await Promise.all(levels.map(url => this._loadLevel(url).then(level => {
            return level;
        })));
        for (const level of data) {
            this.levelData.set(level.id, level);
        }
    }
    static async loadEnemies() {
        const response = await fetch(`data/enemies.json`);
        this.enemyData = await response.json();
    }
}
//# sourceMappingURL=GameData.js.map