import { PolarCoordinates } from '../index.d';

/**
 * A simple class that encapsulates three-dimensional vector
 */
export class Vector {
    public static fromPolar(coordinates: PolarCoordinates, length: number = 1): Vector {
        const y: number = length * Math.sin(coordinates.latitude);
        const remainder: number = length * Math.cos(coordinates.latitude);
        const z: number = remainder * Math.cos(coordinates.longitude);
        const x: number = remainder * Math.sin(coordinates.longitude);
        return new Vector(x, y, z);
    }

    public readonly x: number;
    public readonly y: number;
    public readonly z: number;
    public readonly length: number;

    public constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.length = Math.sqrt(x * x + y * y + z * z);
    }

    public toPolar(): PolarCoordinates {
        const latitude: number = Math.asin(this.y / this.length);
        // noinspection JSSuspiciousNameCombination
        const longitude: number = Math.atan2(this.x, this.z);
        return {longitude, latitude};
    }

    public normalize(): Vector {
        if (this.length === 0) {
            return this;
        }
        return new Vector(
            this.x / this.length,
            this.y / this.length,
            this.z / this.length
        );
    }

    public subtract(other: Vector): Vector {
        return new Vector(
            this.x - other.x,
            this.y - other.y,
            this.z - other.z
        );
    }

    public toString(): string {
        return `Vector {x:${this.x}, y:${this.y}, z:${this.z}}`;
    }
}
