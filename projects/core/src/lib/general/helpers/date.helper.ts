export function dateConvert<T>(input: string, defaultOnInvalidDate: T = null): string | T {
    const date: Date = new Date(input);
    const year: number = date.getFullYear();
    const month: number = date.getMonth() + 1;
    const day: number = date.getDate();
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
        return defaultOnInvalidDate;
    }
    return [
        year.toString(),
        month.toString().padStart(2, '0'),
        day.toString().padStart(2, '0')
    ].join('-');
}
