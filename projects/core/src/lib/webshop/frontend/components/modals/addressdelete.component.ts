import { Input, HostListener } from '@angular/core';
import { Address, ButtonType } from '../../interfaces/Webshop.interfaces';
import { ModalsService } from '../../../../general/services/Modals.service';
import { ProfileService } from '../../services/Profile.service';

export class AddressdeleteComponent {

    buttonType = ButtonType;
    @Input() address: Address = null;
    loading = false;

    constructor(
        private modalsService: ModalsService,
        private profileService: ProfileService
    ) { }

    deleteAddress(): void {
        this.loading = true;
        this.profileService.deleteAddress().subscribe(() => {
            this.closeAddressDeleteModal();
        }).add(() => {
            this.loading = false;
        });
    }

    @HostListener('document:keydown.escape')
    closeAddressDeleteModal(): void {
        this.modalsService.close('addressdelete');
    }

}
