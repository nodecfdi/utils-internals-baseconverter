import { Buffer } from 'buffer/';

export class BaseConverterSequence {
    private readonly sequence: string;

    constructor(sequence: string) {
        BaseConverterSequence.checkIsValid(sequence);
        this.sequence = sequence;
    }

    public toString(): string {
        return this.sequence;
    }

    public value(): string {
        return this.sequence;
    }

    public length() {
        return this.sequence.length;
    }

    public static isValid(value: string): boolean {
        try {
            BaseConverterSequence.checkIsValid(value);
            return true;
        } catch (e) {
            return false;
        }
    }

    public static checkIsValid(sequence: string): void {
        const length: number = sequence.length;
        // is not empty
        if (length < 2) {
            throw new Error('Sequence does not contains enough elements');
        }
        if (length !== Buffer.from(sequence).length) {
            throw new Error('Cannot use multibyte strings in dictionary');
        }
        const result: Record<string, unknown> = {};
        const counter = [...sequence.toUpperCase()].reduce((a, c) => {
            a[c] = a[c] ? (a[c] as number + 1) : 1;
            return a;
        }, result);
        const charsRepeated = Object.entries(counter).filter((val) => {
            return val[1] !== 1;
        });
        if (charsRepeated.length > 0) {
            throw new Error(
                `The sequence has not unique values: ${charsRepeated
                    .map((val) => {
                        return val[0];
                    })
                    .join()}`
            );
        }
    }
}
