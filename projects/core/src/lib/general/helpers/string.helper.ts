export function contains(a: string, b: string, caseSensitive: boolean = false): boolean {
    return caseSensitive ? a.toLocaleLowerCase().includes(b.toLocaleLowerCase()) : a.includes(b);
}

export function containsOr(a: string[], b: string, caseSensitive: boolean = false): boolean {
    return a.some(e => contains(e, b, caseSensitive));
}

export function containsAnd(a: string[], b: string, caseSensitive: boolean = false): boolean {
    return a.every(e => contains(e, b, caseSensitive));
}

export function reverseStr(input: string): string {
    return input.split('').reverse().join('');
}

export function padStartStr(input: string, length: number = 2, fillString: string = '0'): string {
    return input.padStart(length, fillString);
}

export function padEndStr(input: string, length: number = 2, fillString: string = '0'): string {
    return input.padEnd(length, fillString);
}

export function joinStr(inputs: string[], glueString: string = ''): string {
    return inputs.join(glueString);
}

export function explodeStr(input: string, separatorString: string = ','): string[] {
    return input.split(separatorString);
}
