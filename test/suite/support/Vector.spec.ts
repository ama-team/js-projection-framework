import {Vector} from '../../../src/support/Vector';
import {PolarCoordinates} from '../../../src/index.d';
import {expect} from 'chai';

describe('/support', () => {
    describe('/Vector.ts', () => {
        describe('.Vector', () => {
            const variants: [PolarCoordinates, Vector][] = [
                [
                    {latitude: 0, longitude: 0},
                    new Vector(0, 0, 1)
                ],
                [
                    {latitude: Math.PI / 2, longitude: 0},
                    new Vector(0, 1, 0)
                ],
                [
                    {latitude: 0, longitude: Math.PI / 4},
                    new Vector(Math.sqrt(0.5), 0, Math.sqrt(0.5))
                ],
                [
                    {latitude: 0, longitude: -3 * Math.PI / 4},
                    new Vector(-Math.sqrt(0.5), 0, -Math.sqrt(0.5))
                ]
            ];

            describe('.fromPolar()', () => {
                variants.forEach(([polar, vector]) => {
                    it(`converts lat:${polar.latitude}, lon:${polar.longitude} to x:${vector.x}, y:${vector.y}, z:${vector.z}`, () => {
                        const result = Vector.fromPolar(polar);
                        expect(result.x).to.be.closeTo(vector.x, 0.01);
                        expect(result.y).to.be.closeTo(vector.y, 0.01);
                        expect(result.z).to.be.closeTo(vector.z, 0.01);
                    });
                });
            });

            describe('#toPolar()', () => {
                variants.forEach(([polar, vector]) => {
                    it(`converts x:${vector.x}, y:${vector.y}, z:${vector.z} to lat:${polar.latitude}, lon:${polar.longitude}`, () => {
                        const result = vector.toPolar();
                        expect(result.latitude).to.be.closeTo(polar.latitude, 0.01);
                        expect(result.longitude).to.be.closeTo(polar.longitude, 0.01);
                    });
                });
            });
        });

        describe('#normalize()', () => {
            const variants: [Vector, Vector][] = [
                [new Vector(0, 0, 2), new Vector(0, 0, 1)],
                [new Vector(0, 0, 0), new Vector(0, 0, 0)],
                [new Vector(4, 4, 0), new Vector(1 / Math.sqrt(2), 1 / Math.sqrt(2), 0)]
            ];

            variants.forEach(([source, expectation]) => {
                it(`normalizes ${source} to ${expectation}`, () => {
                    const normalized = source.normalize();
                    const difference = normalized.subtract(expectation);
                    expect(difference.length).to.be.below(0.01);
                });
            });
        });
    });
});
