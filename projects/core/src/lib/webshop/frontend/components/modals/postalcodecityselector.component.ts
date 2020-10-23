import { OnInit, Input, ViewChild, ElementRef, AfterViewInit, HostListener, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalsService } from '../../../../general/services/Modals.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { contains } from '../../../../general/helpers/string.helper';

export class PostalcodecityselectorComponent implements OnInit, AfterViewInit {

    filteredCities: string[] = [];
    @Input() cities: string[] = [];
    @Output() citySelected: Subject<string> = new Subject();
    @ViewChild('input') input: ElementRef;
    selectedIndex = 0;
    filterForm: FormGroup = null;

    constructor(
        private modalsService: ModalsService
    ) { }

    ngOnInit(): void {
        this.init();
    }

    ngAfterViewInit(): void {
        setTimeout(() => (this.input.nativeElement as HTMLInputElement).focus());
    }

    init(): void {
        this.initFilterForm();
        this.attachQueryChangeEvent();
        this.filter();
    }

    initFilterForm(): void {
        this.filterForm = new FormGroup({
            query: new FormControl('', [Validators.required])
        });
    }

    attachQueryChangeEvent(): void {
        this.filterForm.get('query').valueChanges.subscribe((query: string) => {
            this.filter(query);
        });
    }

    @HostListener('document:keydown', ['$event'])
    selectedIndexStep(event: KeyboardEvent): void {
        const citiesLength: number = this.filteredCities.length;
        if (event.code === 'ArrowDown') {
            this.selectedIndex++;
            if (this.selectedIndex > citiesLength - 1) {
                this.selectedIndex = 0;
            }
        } else if (event.code === 'ArrowUp') {
            this.selectedIndex--;
            if (this.selectedIndex < 0) {
                this.selectedIndex = citiesLength - 1;
            }
        } else if (event.code === 'Enter') {
            this.select(this.filteredCities[this.selectedIndex]);
        }
    }

    select(city: string): void {
        this.citySelected.next(city);
    }

    filter(query: string = null): void {
        if (query === null) {
            this.filteredCities = this.cities;
        } else {
            this.filteredCities = this.cities.filter((city: string) => contains(city, query));
        }
    }

    @HostListener('document:keydown.escape')
    closeModal(): void {
        this.modalsService.close('postalcodecityselector');
    }

}
