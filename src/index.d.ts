export interface PolarCoordinates {
    readonly latitude: number;
    readonly longitude: number;
}

export interface UVCoordinates {
    readonly u: number;
    readonly v: number;
}

export interface CartesianCoordinates {
    readonly x: number;
    readonly y: number;
}

export interface MappingCoordinates extends UVCoordinates {
    readonly face: string;
}

export interface Color {
    readonly red: number;
    readonly green: number;
    readonly blue: number;
    readonly alpha: number;
}

export interface ProjectionReader {
    read(latitude: number, longitude: number): Color;
}

export interface ProjectionWriter {
    write(latitude: number, longitude: number, color: Color): void;
}

export interface Tile {
    readonly width: number;
    readonly height: number;
    read(x: number, y: number): Color;
    write(x: number, y: number, color: Color): void;
    dump(): Int8Array;
}

export interface ProjectionConfiguration {
    readonly layout: Box;
    readonly tileSize: Box;
    readonly dimensions: Box;
}

export interface Box {
    readonly width: number;
    readonly height: number;
}

export interface TileSource {

}

export interface ProjectionTypeHandler {
    createReader(source: TileSource): ProjectionReader;
    createWriter(configuration: ProjectionConfiguration): ProjectionWriter;
}
