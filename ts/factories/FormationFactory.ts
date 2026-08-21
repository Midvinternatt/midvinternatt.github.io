import { LineFormation } from "../levels/Formation.js";

export type FormationConfig = {
    type: "line",
    amount: number,
    spacing: number,
    direction: number
}

export default class FormationFactory {
    create(config: FormationConfig, position: {x: number, y: number}) {
        switch (config.type) {
            case "line":
                return new LineFormation({
                    position,
                    amount: config.amount,
                    spacing: config.spacing,
                    direction: config.direction
                })
        }
    }
}