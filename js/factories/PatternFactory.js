import { CirclePattern, LinePattern } from "../levels/Pattern.js";
import Vector from "../Vector.js";
export default class PatternFactory {
    create(config) {
        switch (config.type) {
            case "line":
                return new LinePattern(Vector.fromPolar({ angle: config.angle, length: config.speed }));
            case "circle":
                return new CirclePattern();
        }
    }
}
//# sourceMappingURL=PatternFactory.js.map