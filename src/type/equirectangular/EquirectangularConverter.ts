/* tslint:disable:no-magic-numbers */

import {DEFAULT_FACE} from '../../constants';
import {MappingCoordinates, PolarCoordinates} from '../../index.d';
import {Converter} from '../index';

export class EquirectangularConverter implements Converter {
    public decode(coordinates: MappingCoordinates): PolarCoordinates {
        return {
            latitude: 1 - (coordinates.v * 2),
            longitude: (coordinates.u - 0.5) * 2
        };
    }

    public encode(coordinates: PolarCoordinates): MappingCoordinates {
        return {
            face: DEFAULT_FACE,
            u: coordinates.longitude / 2 + 0.5,
            v: (1 - coordinates.latitude) / 2
        };
    }
}
