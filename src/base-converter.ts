import { BaseConverterSequence } from './base-converter-sequence';

export class BaseConverter {
    private readonly sequenceBase: BaseConverterSequence;

    constructor(sequenceBase: BaseConverterSequence) {
        this.sequenceBase = sequenceBase;
    }

    public sequence(): BaseConverterSequence {
        return this.sequenceBase;
    }

    public maximumBase(): number {
        return this.sequenceBase.length();
    }

    public static createBase36(): BaseConverter {
        return new BaseConverter(new BaseConverterSequence('0123456789abcdefghijklmnopqrstuvwxyz'));
    }

    public convert(input: string, fromBase: number, toBase: number): string {
        if (fromBase < 2 || fromBase > this.maximumBase()) {
            throw new Error('Invalid from base');
        }
        if (toBase < 2 || toBase > this.maximumBase()) {
            throw new Error('Invalid to base');
        }
        const originalSequence = this.sequence().value();
        if (!input) {
            input = originalSequence[0]; // use zero as input
        }
        const chars = originalSequence.substring(0, fromBase);
        if (!new RegExp(`^[${chars}]+$`).test(input)) {
            throw new Error('The number to convert contains invalid characters');
        }
        let length = input.length;
        const values = [];
        for (let index = 0; index < length; index++) {
            values.push(originalSequence.indexOf(input.charAt(index)));
        }
        let result = '';
        let newLen = 0;
        do {
            let divide = 0;
            newLen = 0;
            for (let index = 0; index < length; index++) {
                divide = divide * fromBase + values[index];
                if (divide >= toBase) {
                    values[newLen] = Math.floor(divide / toBase);
                    divide = divide % toBase;
                    newLen += 1;
                } else if (newLen > 0) {
                    values[newLen] = 0;
                    newLen += 1;
                }
            }
            length = newLen;
            result = `${originalSequence[divide]}${result}`;
        } while (newLen > 0);
        return result;
    }
}
