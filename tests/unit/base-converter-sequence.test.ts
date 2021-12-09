import { BaseConverterSequence } from '../../src';

describe('BaseConverterSequence', () => {
    test('valid sequence', () => {
        const source = 'ABCD';
        const sequence = new BaseConverterSequence(source);
        expect(sequence.value()).toEqual(source);
        expect(sequence.length()).toEqual(4);
        expect(sequence.toString()).toEqual(source);
    });

    test('invalid sequence with empty string', () => {
        expect.assertions(1);
        try {
            new BaseConverterSequence('');
        } catch (e) {
            expect((e as Error).message).toBe('Sequence does not contains enough elements');
        }
    });

    test('invalid sequence with one char', () => {
        expect.assertions(1);
        try {
            new BaseConverterSequence('X');
        } catch (e) {
            expect((e as Error).message).toBe('Sequence does not contains enough elements');
        }
    });

    test('invalid sequence with multibyte', () => {
        expect.assertions(1);
        try {
            new BaseConverterSequence('f𝌆');
        } catch (e) {
            expect((e as Error).message).toBe('Cannot use multibyte strings in dictionary');
        }
    });

    test('invalid sequence with repeated chars', () => {
        expect.assertions(1);
        try {
            new BaseConverterSequence('ABCBA');
        } catch (e) {
            expect((e as Error).message).toBe('The sequence has not unique values: A,B');
        }
    });

    test('invalid sequence with repeated chars different case', () => {
        expect.assertions(1);
        try {
            new BaseConverterSequence('ABCDabcd');
        } catch (e) {
            expect((e as Error).message).toBe('The sequence has not unique values: A,B,C,D');
        }
    });

    test('is valid method', () => {
        expect(BaseConverterSequence.isValid('abc')).toBeTruthy();
        expect(BaseConverterSequence.isValid('abcb')).toBeFalsy();
        expect(BaseConverterSequence.isValid('')).toBeFalsy();
        expect(BaseConverterSequence.isValid('0')).toBeFalsy();
    });
});
