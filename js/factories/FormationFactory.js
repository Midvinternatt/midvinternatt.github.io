import { LineFormation } from "../levels/Formation.js";
export default class FormationFactory {
    create(config, position) {
        switch (config.type) {
            case "line":
                return new LineFormation({
                    position,
                    amount: config.amount,
                    spacing: config.spacing,
                    direction: config.direction
                });
        }
    }
}
//# sourceMappingURL=FormationFactory.js.map