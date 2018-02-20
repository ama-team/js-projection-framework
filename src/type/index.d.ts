import {PolarCoordinates, MappingCoordinates} from '../index.d';

export interface Converter {
    encode(coordinates: PolarCoordinates): MappingCoordinates;
    decode(coordinates: MappingCoordinates): PolarCoordinates;
}
