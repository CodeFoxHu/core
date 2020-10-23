import { HostListener, OnInit, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ShippingPoint } from '../../interfaces/Webshop.interfaces';
import { ModalsService } from '../../../../general/services/Modals.service';
import { containsOr } from '../../../../general/helpers/string.helper';
import { HelpersService } from '../../services';
import { GetShippingPointsRequest, GetShippingPointsResponse } from '../../interfaces/Helpers.interfaces';

export class PointselectorComponent implements OnInit {

    shippingPointsLoading = false;
    shippingPoints$: Observable<ShippingPoint[]>;
    shippingPoints: ShippingPoint[] = [];

    shippingPointSelectorForm: FormGroup = null;

    @Input() type: string = null;
    @Input() city: string = null;
    @Output() shippingPointSelected: Subject<ShippingPoint> = new Subject();

    constructor(
        private modalsService: ModalsService,
        private helpersService: HelpersService
    ) { }

    ngOnInit(): void {
        this.init();
    }

    init(): void {
        this.initShippingPointSelectorForm();
        this.attachFilterEventToSearchFormControl();
        this.loadShippingPoints();
    }

    initShippingPointSelectorForm(): void {
        this.shippingPointSelectorForm = new FormGroup({
            search: new FormControl('', [Validators.required])
        });
    }

    attachFilterEventToSearchFormControl(): void {
        this.shippingPointSelectorForm.get('search').valueChanges.pipe(
            debounceTime(300)
        ).subscribe((searchText: string) => {
            this.filter(searchText);
        });
    }

    loadShippingPoints(): void {
        this.shippingPointsLoading = true;
        this.helpersService.getShippingPoints<GetShippingPointsRequest, GetShippingPointsResponse>({
            type: this.type,
            city: this.city
        }).subscribe((rsp) => {
            this.shippingPoints = rsp.shippingPoints;
            this.filter();
        }).add(() => {
            this.shippingPointsLoading = false;
        });
    }

    select(shippingPoint: ShippingPoint): void {
        this.shippingPointSelected.next(shippingPoint);
    }

    filter(searchText: string = null): void {
        if (searchText === null || searchText === '') {
            this.shippingPoints$ = of(this.shippingPoints);
        } else {
            this.shippingPoints$ = of(this.shippingPoints.filter(shippingPoint => {
                return containsOr([shippingPoint.name, shippingPoint.address], searchText);
            }));
        }
    }

    @HostListener('document:keydown.escape')
    closeModal(): void {
        this.modalsService.close('pointselector');
    }

}
