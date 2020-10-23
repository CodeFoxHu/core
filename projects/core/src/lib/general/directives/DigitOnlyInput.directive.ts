import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
    selector: '[codeFoxDigitOnly]',
})
export class DigitOnlyInputDirective {

    @Input() decimalCount = 0;
    @Input() defaultValue = 0;
    @Input() allowEmpty = true;
    @Input() fillWithZero = false;

    navigationKeys = ['backspace', 'delete', 'tab', 'escape', 'enter', 'home', 'end', 'arrowleft', 'arrowright', 'clear', 'copy', 'paste'];

    inputElement: HTMLInputElement;
    originalValue: string = null;

    constructor(public el: ElementRef) {
      this.inputElement = el.nativeElement;
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(e: KeyboardEvent): any {

        // Navigation keys... nothing to do
        if (this.navigationKeys.indexOf(e.key.toLowerCase()) !== -1) { return; }

        // Decimal Check
        if ((e.key === '.' || e.key === ',') && this.decimalCount > 0 && this.inputElement.value.length > 0) {
            if (!this.hasDecimalSelectorInInput()) {
                return;
            }
            e.preventDefault();
        }

        // Filter numbers and allow them
        if (!isNaN(parseInt(e.key, 10))) {
            return;
        }

        e.preventDefault();
    }

    @HostListener('focus', ['$event'])
    focus(): void {
        this.setValue(this.originalValue);
    }

    @HostListener('blur', ['$event'])
    blur(): void {
        this.formatToReadableNumber();
    }

    formatToReadableNumber(): void {

        // Part1, Part2
        let part1 = this.inputElement.value;
        let part2 = '';

        // If we have decimal, split the string
        const decimalChar: '.'|',' = this.detectDecimalChar();
        if (decimalChar !== null) {
            part1 = this.inputElement.value.split(decimalChar)[0];
            part2 = this.inputElement.value.split(decimalChar)[1];

            // Dont use more decimal count than allowed
            if (part2.length > this.decimalCount) {
                part2 = part2.slice(0, this.decimalCount);
            }
            // Save original input value
            this.originalValue = part1 + decimalChar + part2;
        } else {
            // Save original input value
            this.originalValue = part1;
        }

        // Fill with zeros
        if (this.fillWithZero) {
            part2 = part2 + '0'.repeat(this.decimalCount - part2.length);
        }

        // Change input value
        this.inputElement.value = this.convertToHundredSeparator(part1) + (decimalChar !== null ? decimalChar + part2 : '');
    }

    convertToHundredSeparator(input: string): string {
        return input.split('').reverse().join('').replace(/[^\d]/g, '').replace(/(.{3})/g, '$1 ').trim().split('').reverse().join('');
    }

    setValue(value: any): void {
        this.inputElement.value = value;
    }

    hasDecimalSelectorInInput(selector: '.'|',' = null): boolean {
        if (selector !== null) {
            return this.inputElement.value.indexOf(selector) !== -1;
        }
        return this.inputElement.value.indexOf('.') !== -1 || this.inputElement.value.indexOf(',') !== -1;
    }

    detectDecimalChar(): '.'|',' {
        if (this.hasDecimalSelectorInInput('.')) { return '.'; }
        if (this.hasDecimalSelectorInInput(',')) { return ','; }
        return null;
    }
}
