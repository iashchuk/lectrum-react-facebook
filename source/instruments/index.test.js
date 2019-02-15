// Core
import { sum, delay } from './';

jest.setTimeout(10000);

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

describe('instruments: delay', () => {
    test('delay function should return a resolved promise', async () => {
        await expect(delay()).resolves.toBeUndefined();
    });

    test('delay function should return a resolved promise in seTimeout(2000)', async () => {
        await expect(delay(2000)).resolves.toBeUndefined();
    });

    // test('delay function should return a resolved promise with text', async () => {
    //     await expect(delay()).resolves.toBe('A resolve promise');
    // });
});
