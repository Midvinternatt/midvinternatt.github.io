import { SpriteData } from "./assets/AssetsDefinitions.js"
import { FormationConfig } from "./factories/FormationFactory.js"
import { PatternConfig } from "./factories/PatternFactory.js"

export type LevelData = {
    id: string,
    name: string,
    waves: WaveData[]
}

export type WaveData = {
    time: number,
    position: {x: number, y: number},
    formation: FormationConfig,
    pattern: PatternConfig,
    enemy: {
        type: EnemyType,
        lifetime: number
    },
}

export type EnemyType = 
    "drone" //| "bomber"

export type EnemyData = {
    type: EnemyType,
    sprite: string,
    collision: {
        width: number,
        height: number
    },
    hitpoints: number,
    weapon: {
        fireRate: number,
        projectileSpeed: number,
        offset: {
            x: number,
            y: number
        }
    }
}

export type WeaponData = {
    type: string
}

export enum GAMELEVEL {
    DEBUG = "debug",
    One = "level01"
}

const levels: string[] = [
    "debug",
    "level01"
];

export default class GameData {
    static levelData: Map<string, LevelData> = new Map<string, LevelData>();
    static enemyData: Record<EnemyType, EnemyData>;
    static weaponData: Map<string, WeaponData> = new Map<string, WeaponData>();

    static getLevelData(id: string): LevelData {
        return this.levelData.get(id)!;
    }
    
    static getEnemyData(type: EnemyType): EnemyData {
        return this.enemyData[type];
    }

    private static async _loadLevel(url: string): Promise<LevelData> {
        const response = await fetch(`data/levels/${url}.json`);
        return response.json();
    }

    static async loadLevels() {
        const data = await Promise.all(
            levels.map(url => this._loadLevel(url).then(level => {
                return level;
            }))
        );

        for (const level of data) {
            this.levelData.set(level.id, level);
        }
    }

    static async loadEnemies() {
        const response = await fetch(`data/enemies.json`);
        this.enemyData = await response.json();
    }
}