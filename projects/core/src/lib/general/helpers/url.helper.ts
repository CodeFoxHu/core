export function replaceVariableInString(input: string, object: object): string {
    input.match(/:\w+/g).forEach((match: string) => {
        const variableName: string = match.substr(1);
        if (object[variableName] !== undefined) {
            input = input.replace(match, object[variableName]);
        }
    });
    return input;
}
