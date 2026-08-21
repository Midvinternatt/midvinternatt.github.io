import { CirclePattern, LinePattern, Pattern } from "../levels/Pattern.js";
import Vector from "../Vector.js";

export type PatternConfig = {
    type: "line",
    speed: number,
    angle: number
} | {
    type: "circle",
    spacing: number
}

export default class PatternFactory {
    create(config: PatternConfig): Pattern {
        switch (config.type) {
            case "line":
                return new LinePattern(Vector.fromPolar({angle: config.angle, length: config.speed}))
            case "circle":
                return new CirclePattern()
        }
    }
}