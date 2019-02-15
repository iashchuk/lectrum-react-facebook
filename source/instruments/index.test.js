// Core
import { sum, delay, getUniqueID, getFullApiUrl } from './';

jest.setTimeout(10000);

describe('instruments: sum', () => {
    test('sum function should be a function', () => {
        expect(sum).toBeInstanceOf(Function);
    });

    test('sum function should throw, when called with non-number type as first argument', () => {
        expect(() => sum('hello', 10)).toThrow();
    });

    test('sum function should throw, when called with non-number type as second argument', () => {
        expect(() => sum(10, 'hello')).toThrow();
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
});

describe('instruments: getUniqueID', () => {
    test('getUniqueID function should be a function', () => {
        expect(getUniqueID).toBeInstanceOf(Function);
    });

    test('getUniqueID function should throw, when called with non-number type as argument', () => {
        expect(() => getUniqueID('hello')).toThrow();
    });

    test('getUniqueID function should produce a string of a desired given length', () => {
        expect(getUniqueID(5)).toHaveLength(5);
        expect(getUniqueID(13)).toHaveLength(13);
    });
});

describe('instruments: getFullApiUrl', () => {
    test('getFullApiUrl function should be a function', () => {
        expect(getFullApiUrl).toBeInstanceOf(Function);
    });

    test('getFullApiUrl function should throw, when called with non-string type as arguments', () => {
        expect(() => getFullApiUrl(2, 3)).toThrow();
    });

    test('getFullApiUrl function should match a string of a desired given', () => {
        expect(getFullApiUrl('api', 'GROUP_ID')).toMatch(/api\/GROUP_ID/);
    });
});
