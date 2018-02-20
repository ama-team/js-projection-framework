import {EquirectangularConverter} from '../../../../src/type/equirectangular/EquirectangularConverter';
import {PolarCoordinates, MappingCoordinates} from '../../../../src/index.d';
import {DEFAULT_FACE} from '../../../../src/constants';
import {expect} from 'chai';

describe('/type', () => {
    const converter = new EquirectangularConverter();

    describe('/equirectangular', () => {
        describe('/EquirectangularConverter.ts', () => {
            describe('EquirectangularConverter', () => {
                const variants: [MappingCoordinates, PolarCoordinates][] = [
                    [
                        {u: 0, v: 0, face: DEFAULT_FACE},
                        {latitude: 1, longitude: -1}
                    ],
                    [
                        {u: 1, v: 0, face: DEFAULT_FACE},
                        {latitude: 1, longitude: 1}
                    ],
                    [
                        {u: 0, v: 1, face: DEFAULT_FACE},
                        {latitude: -1, longitude: -1}
                    ],
                    [
                        {u: 1, v: 1, face: DEFAULT_FACE},
                        {latitude: -1, longitude: 1}
                    ],
                    [
                        {u: 0.5, v: 0.5, face: DEFAULT_FACE},
                        {latitude: 0, longitude: 0}
                    ]
                ];
                describe('#encode', () => {
                    variants.forEach(([mapping, polar]) => {
                        it(`encodes lat:${polar.latitude}, lon:${polar.longitude} to u:${mapping.u}, v:${mapping.v}`, () => {
                            expect(converter.encode(polar)).to.deep.eq(mapping);
                        });
                    });
                });

                describe('#decode', () => {
                    variants.forEach(([mapping, polar]) => {
                        it(`decodes u:${mapping.u}, v:${mapping.v} to lat:${polar.latitude}, lon:${polar.longitude}`, () => {
                            expect(converter.decode(mapping)).to.deep.eq(polar);
                        });
                    });
                });
            });
        });
    });
});
