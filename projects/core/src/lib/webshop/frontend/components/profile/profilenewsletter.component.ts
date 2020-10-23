import { OnInit } from '@angular/core';
import { ProfileService } from '../../services/Profile.service';
import { InformationsService } from '../../../../general/services/Informations.service';
import { NewsletterData, InformationTypes } from '../../interfaces/Webshop.interfaces';
import { GetNewsletterDataResponse, SetNewsletterDataStateRequest } from '../../interfaces/Profile.interfaces';

export class ProfilenewsletterComponent implements OnInit {

    newsletterData: NewsletterData[] = [];
    loading = false;
    loadingToggle = false;

    constructor(
        private profileService: ProfileService,
        private informationsService: InformationsService
    ) { }

    ngOnInit(): void {
        this.init();
    }

    init(): void {
        this.loadNewsletterData();
    }

    loadNewsletterData(): void {
        this.loading = true;
        this.profileService.getNewsletterData<GetNewsletterDataResponse>().subscribe((rsp) => {
            this.newsletterData = rsp.newsletterData;
        }).add(() => {
            this.loading = false;
        });
    }

    toogleNewsletterData(newsletterData: NewsletterData): void {
        this.loadingToggle = true;
        newsletterData.checked = !newsletterData.checked;
        const checked: boolean = newsletterData.checked;
        const field: string = newsletterData.field;
        this.profileService.setNewsletterDataState<SetNewsletterDataStateRequest>({
            field,
            checked
        }).subscribe(() => {
            this.informationsService.pushInformation(checked ? 'informations.profile.newsletter.subscribed' : 'informations.profile.newsletter.unsubscribed', InformationTypes.SUCCESS);
            /*this.newsletterService.newsletterStateChange.next({
                type: field,
                status: checked
            });*/ // TODO: newsletterservice???
        }, () => {
            newsletterData.checked = !newsletterData.checked;
        }).add(() => {
            this.loadingToggle = false;
        });
    }

}
