import { OnInit, Input, HostListener, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Subscription, combineLatest } from 'rxjs';
import { Address, ButtonType } from '../../interfaces/Webshop.interfaces';
import { ModalsService } from '../../../../general/services/Modals.service';
import { ProfileService } from '../../services/Profile.service';
import { CreateAddressRequest, CreateAddressResponse, UpdateAddressRequest } from '../../interfaces/Customer.interfaces';
import { InitService, HelpersService } from '../../services';
import { GetCitiesByPostalCodeRequest, GetCitiesByPostalCodeResponse } from '../../interfaces/Helpers.interfaces';
import { startWith, map } from 'rxjs/operators';
import { PostalcodecityselectorComponent } from './postalcodecityselector.component';

export class AddresseditorComponent implements OnInit, OnDestroy {

    buttonType = ButtonType;
    addressEditorForm: FormGroup = null;
    submitted = false;
    loading = false;
    @Input() address: Address = null;
    defaultInvoiceAddressChecked = false;
    defaultShippingAddressChecked = false;
    subscriptions: Subscription[] = [];
    getCityByPostalCodeLoading = false;

    constructor(
        private modalsService: ModalsService,
        private profileService: ProfileService,
        private helpersService: HelpersService,
        private initService: InitService
    ) { }

    ngOnInit(): void {
        this.init();
    }

    init(): void {
        this.initAddressForm();
        this.setDefaults();
        this.setShippingLimitedTo();
        this.attachPostalCodeChangeEvent();
    }

    initAddressForm(): void {
        this.addressEditorForm = new FormGroup({
            contactName: new FormControl(this.address?.contactName || '', [Validators.required]),
            contactPhone: new FormControl(this.address?.contactPhone || '', [Validators.pattern('^\\+?[0-9][0-9 \\-\\/]*$')]),
            country: new FormControl(this.address?.country || '', [Validators.required]),
            postCode: new FormControl(this.address?.postCode || '', {
                updateOn: 'blur',
                validators: [Validators.required]
            }),
            city: new FormControl(this.address?.city || '', [Validators.required]),
            address: new FormControl(this.address?.address || '', [Validators.required, Validators.maxLength(50)]),
            companyName: new FormControl(this.address?.companyName || '', []),
            companyTaxNumber: new FormControl(this.address?.companyTaxNumber || '', []),
            note: new FormControl(this.address?.note || '', [])
        });
    }

    setDefaults(): void {
        if (this.address !== null) {
            this.defaultInvoiceAddressChecked = this.address.invoice;
            this.defaultShippingAddressChecked = this.address.shipping;
        }
    }

    setShippingLimitedTo(): void {
        if (
            this.initService.webshopSettings !== null &&
            this.initService.webshopSettings.shippingLimitedTo !== undefined &&
            this.initService.webshopSettings.shippingLimitedTo !== null
        ) {
            this.addressEditorForm.get('country').setValue(this.initService.webshopSettings.shippingLimitedTo);
            this.addressEditorForm.get('country').disable();
        }
    }

    attachPostalCodeChangeEvent(): void {
        const countryControl: AbstractControl = this.addressEditorForm.get('country');
        const postalCodeControl: AbstractControl = this.addressEditorForm.get('postCode');
        const cityControl: AbstractControl = this.addressEditorForm.get('city');
        combineLatest([
            countryControl.valueChanges.pipe(startWith(countryControl.value), map(toString)),
            postalCodeControl.valueChanges.pipe(startWith(postalCodeControl.value), map(toString))
        ]).subscribe(([country, postCode]) => {
            if (countryControl.valid && postalCodeControl.valid) {
                this.getCityByPostalCodeLoading = true;
                this.helpersService.getCitiesByPostalCode<GetCitiesByPostalCodeRequest, GetCitiesByPostalCodeResponse>({
                    country,
                    postCode
                }).subscribe((rsp) => {
                    if (rsp.cities.length === 1) {
                        cityControl.setValue(rsp.cities[0]);
                    } else if (rsp.cities.length > 1) {
                        this.modalsService.open({
                            component: PostalcodecityselectorComponent,
                            name: 'postalcodecityselector',
                            inputs: {
                                cities: rsp.cities
                            }
                        });
                    }
                }).add(() => {
                    this.getCityByPostalCodeLoading = false;
                });
            }
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.map(s => s.unsubscribe());
    }

    addressFormSubmit(): void {
        this.submitted = true;
        if (!this.addressEditorForm.valid) {
            return;
        }

        this.loading = true;

        const address: Address = {
            ...this.addressEditorForm.getRawValue(),
            shipping: this.defaultShippingAddressChecked,
            invoice: this.defaultInvoiceAddressChecked,
            id: this.address === null ? null : this.address.id
        };

        if (this.address === null) {
            delete address.id;
            this.profileService.createAddress<CreateAddressRequest, CreateAddressResponse>({
                address
            }).subscribe((rsp) => {
                address.id = rsp.id;
            }).add(() => {
                this.loading = false;
            });
        } else {
            this.profileService.updateAddress<UpdateAddressRequest>({
                address
            }).subscribe((rsp) => {
                // TODO: ???
            }).add(() => {
                this.loading = false;
            });
        }
    }

    changeDefaultInvoiceAddress(state: boolean): void {
        this.defaultInvoiceAddressChecked = state;
    }

    changeDefaultShippingAddress(state: boolean): void {
        this.defaultShippingAddressChecked = state;
    }

    @HostListener('document:keydown.escape')
    closeAddressEditorModal(): void {
        this.modalsService.close('addresseditor');
    }

}
