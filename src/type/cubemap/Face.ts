import {CartesianCoordinates} from '../../index.d';
import {Vector} from '../../support/Vector';

interface IExtractionRule {
    readonly multiplier: number;
    readonly dimension: string;
}

interface IPlacement {
    readonly x: IExtractionRule;
    readonly y: IExtractionRule;
    readonly direction: IExtractionRule;
}

class Face {
    public static factory(
        name: string,
        x: [string, number],
        y: [string, number],
        direction: [string, number]
    ): Face {
        const placement: IPlacement = {
            x: {dimension: x[0], multiplier: x[1]},
            y: {dimension: y[0], multiplier: y[1]},
            direction: {dimension: direction[0], multiplier: direction[1]}
        };
        return new Face(name, placement);
    }

    public readonly name: string;
    public readonly placement: IPlacement;

    public constructor(name: string, placement: IPlacement) {
        this.name = name;
        this.placement = placement;
    }

    public convertVector(vector: Vector): CartesianCoordinates {
        /* tslint:disable:no-any no-unsafe-any */
        const source: any = vector as any;
        const placement: IPlacement = this.placement;
        return {
            x: source[placement.x.dimension] * placement.x.multiplier,
            y: source[placement.y.dimension] * placement.y.multiplier
        };
        /* tslint:enable:no-any no-unsafe-any */
    }
}

export const FACES: {[key: string]: Face} = {
    FRONT: Face.factory('front', ['x', 1], ['y', -1], ['z', 1]),
    RIGHT: Face.factory('right', ['z', -1], ['y', -1], ['x', 1]),
    UP: Face.factory('up', ['x', 1], ['z', 1], ['y', 1]),
    LEFT: Face.factory('left', ['x', 1], ['z', -1], ['x', -1]),
    BOTTOM: Face.factory('bottom', ['x', 1], ['z', -1], ['y', -1]),
    BACK: Face.factory('back', ['x', -1], ['y', -1], ['z', -1])
};
