import { Pipe, PipeTransform } from "@angular/core";
import { SETTINGS } from "../settings";

@Pipe({
    name: 'money'
})
export class MoneyPipe implements PipeTransform {
    transform(value: number, freeWithText: boolean = true): string {
        if (value === null) {
            value = 0;
        }
        if (freeWithText && value === 0) {
            return 'Ingyenes';
        }
        return value.toLocaleString() + ' ' + SETTINGS.currency;
    }
}