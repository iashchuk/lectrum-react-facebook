// Core
import { sum } from './';

describe('instruments: sum', () => {
    test('sum function should be a function', () => {
        expect(sum).toBeInstanceOf(Function);
    });

    test('sum function should throw, when called with non-number type as arguments', () => {
        expect(() => sum(2, 'hello')).toThrow();
    });

    test('sum function should return an addition of two arguments', () => {
        expect(sum(2, 3)).toBe(5);
        expect(sum(15, 9)).toBe(24);
        expect(sum(3, 9)).toMatchSnapshot();
    });
});
