import { OnInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalsService } from '../../../../general/services/Modals.service';
import { PersonalData, ButtonType } from '../../interfaces/Webshop.interfaces';
import { ProfileService } from '../../services/Profile.service';
import { UpdateProfilePersonalDataRequest } from '../../interfaces/Profile.interfaces';

export class PersonaldataeditorComponent implements OnInit {

    buttonType = ButtonType;
    @Input() personalData: PersonalData = null;
    submitted = false;
    personalDataEditorForm: FormGroup = null;
    @ViewChild('valueinput', { static: true }) valueinput: ElementRef;

    loading = false;

    constructor(
        private modalsService: ModalsService,
        private profileService: ProfileService
    ) { }

    ngOnInit(): void {
        this.personalDataEditorForm.get('value').setValue(this.personalData.value);
        (this.valueinput.nativeElement as HTMLInputElement).focus();
        this.init();
    }

    init(): void {
        this.initPersonalDataEditorForm();
    }

    initPersonalDataEditorForm(): void {
        this.personalDataEditorForm = new FormGroup({
            value: new FormControl('', [])
        });
    }

    personalDataEditorFormSubmit(): void {
        this.submitted = true;
        if (!this.personalDataEditorForm.valid) {
            return;
        }
        this.loading = true;
        this.profileService.updateProfilePersonalData<UpdateProfilePersonalDataRequest>({
            field: this.personalData.field,
            value: this.personalDataEditorForm.get('value').value
        }).subscribe((rsp) => {
            this.closeModal();
        }).add(() => {
            this.loading = false;
        });
    }

    @HostListener('document:keydown.escape')
    closeModal(): void {
        this.modalsService.close('personaldataeditor');
    }

}
