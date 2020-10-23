import { OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PersonalData, InformationTypes } from '../../interfaces/Webshop.interfaces';
import { ProfileService } from '../../services/Profile.service';
import { GetProfilePersonalDataResponse } from '../../interfaces/Profile.interfaces';
import { ModalsService } from '../../../../general/services/Modals.service';
import { InformationsService } from '../../../../general/services/Informations.service';
import { PersonaldataeditorComponent } from '../modals/personaldataeditor.component';

export class ProfileComponent implements OnInit {

    changePasswordForm: FormGroup = null;
    changePasswordFormSubmitted = false;
    changePasswordFormLoading = false;
    destroySessionsLoading = false;

    personalData: PersonalData[] = [];
    personalDataLoading = false;

    constructor(
        private modalsService: ModalsService,
        private profileService: ProfileService,
        private informationsService: InformationsService
    ) { }

    ngOnInit(): void {
        this.init();
    }

    init(): void {
        this.initChangePasswordForm();
        this.loadPersonalData();
    }

    initChangePasswordForm(): void {
        this.changePasswordForm = new FormGroup({
            password: new FormControl('', [Validators.required]),
            password_repeat: new FormControl('', [Validators.required])
        });
    }

    loadPersonalData(): void {
        this.personalDataLoading = true;
        this.profileService.getPersonalData<GetProfilePersonalDataResponse>().subscribe((rsp) => {
            this.personalData = rsp.personalData;
        }).add(() => {
            this.personalDataLoading = false;
        });
    }

    showPersonalDataEditorModal(personalData: PersonalData): void {
        if (personalData.readonly) {
            return;
        }
        this.modalsService.open({
            component: PersonaldataeditorComponent,
            name: 'personaldataeditor',
            inputs: {
                personalData
            }
        });
    }

    submitChangePasswordForm(): void {
        this.changePasswordFormSubmitted = true;
        if (this.changePasswordFormLoading || !this.changePasswordForm.valid) {
            return;
        }
        if (this.changePasswordForm.get('password').value !== this.changePasswordForm.get('password_repeat').value) {
            return this.informationsService.pushInformation('informations.profile.personaldata.notsame');
        }
        this.changePasswordFormLoading = true;
        this.profileService.changePassword({
            password: this.changePasswordForm.get('password').value,
            passwordRepeat: this.changePasswordForm.get('password_repeat').value
        }).subscribe(() => {
            this.informationsService.pushInformation('informations.profile.personaldata.successpasswordchange', InformationTypes.SUCCESS);
        }).add(() => {
            this.changePasswordFormLoading = false;
        });
    }

    destroySessions(): void {
        if (this.destroySessionsLoading) {
            return;
        }
        this.destroySessionsLoading = true;
        this.profileService.destroySessions().subscribe(() => {
            this.informationsService.pushInformation('informations.profile.personaldata.destroysessionsuccess', InformationTypes.SUCCESS);
        }).add(() => {
            this.destroySessionsLoading = false;
        });
    }

}
