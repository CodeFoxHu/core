import { HostListener, Output, Input, OnInit } from '@angular/core';
import { ModalsService } from '../../../../general/services/Modals.service';
import { Subject, Observable, of } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { HelpersService } from '../../services';
import { GetShippingCitiesRequest, GetShippingCitiesResponse } from '../../interfaces/Helpers.interfaces';
import { contains } from '../../../../general/helpers/string.helper';

export class CityselectorComponent implements OnInit {

    shippingCitySelectorForm: FormGroup;

    shippingCitiesLoading = false;
    shippingCities$: Observable<string[]>;
    shippingCities: string[] = [];

    @Input() type: string = null;
    @Output() shippingCitySelected: Subject<string> = new Subject();

    constructor(
        private modalsService: ModalsService,
        private helpersService: HelpersService
    ) { }

    ngOnInit(): void {
        this.init();
    }

    init(): void {
        this.initShippingCitySelectorForm();
        this.attachFilterEventToSearchFormControl();
        this.loadShippingCities();
    }

    initShippingCitySelectorForm(): void {
        this.shippingCitySelectorForm = new FormGroup({
            search: new FormControl('', [Validators.required])
        });
    }

    attachFilterEventToSearchFormControl(): void {
        this.shippingCitySelectorForm.get('search').valueChanges.pipe(
            debounceTime(300)
        ).subscribe((searchText: string) => {
            this.filter(searchText);
        });
    }

    loadShippingCities(): void {
        this.shippingCitiesLoading = true;
        this.helpersService.getShippingCities<GetShippingCitiesRequest, GetShippingCitiesResponse>({
            type: this.type
        }).subscribe((rsp) => {
            this.shippingCities = rsp.cities;
            this.filter();
        }).add(() => {
            this.shippingCitiesLoading = false;
        });
    }

    select(shippingCity: string): void {
        this.shippingCitySelected.next(shippingCity);
    }

    filter(searchText: string = null): void {
        if (searchText === null || searchText === '') {
            this.shippingCities$ = of(this.shippingCities);
        } else {
            this.shippingCities$ = of(this.shippingCities.filter(city => contains(city, searchText)));
        }
    }

    @HostListener('document:keydown.escape')
    closeModal(): void {
        this.modalsService.close('cityselector');
    }

}
