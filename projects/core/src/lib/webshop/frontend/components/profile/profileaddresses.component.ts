import { OnInit } from '@angular/core';
import { Address, AddressGroup } from '../../interfaces/Webshop.interfaces';
import { ModalsService } from '../../../../general/services/Modals.service';
import { ProfileService } from '../../services/Profile.service';
import { GetProfileAddressesResponse } from '../../interfaces/Profile.interfaces';
import { AddressdeleteComponent } from '../modals/addressdelete.component';
import { AddresseditorComponent } from '../modals/addresseditor.component';

export class ProfileaddressesComponent implements OnInit {

  addressGroups: AddressGroup[] = [];
  addresses: Address[] = [];
  addressesLoading = false;

  constructor(
    private modalsService: ModalsService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
      this.init();
  }

  init(): void {
    this.loadProfileAddresses();
  }

  loadProfileAddresses(): void {
    this.addressesLoading = true;
    this.profileService.getAddresses<GetProfileAddressesResponse>().subscribe((rsp) => {
        this.addresses = rsp.addresses;
    }).add(() => {
        this.addressesLoading = false;
    });
  }

  showAddressEditorModal(address: Address = null): void {
    this.modalsService.open({
        name: 'addresseditor',
        component: AddresseditorComponent,
        inputs: {
            address
        }
    });
  }

  showDeleteAddressModal(address: Address): void {
    this.modalsService.open({
        name: 'addressdelete',
        component: AddressdeleteComponent,
        inputs: {
            address
        }
    });
  }

  processAddresses(addresses: Address[]): void {

    this.addressGroups = [{
      type: 'SHIPPINGANDINVOICE',
      addresses: addresses.filter((a) => a.invoice && a.shipping)
    }, {
      type: 'INVOICE',
      addresses: addresses.filter((a) => a.invoice && !a.shipping)
    }, {
      type: 'SHIPPING',
      addresses: addresses.filter((a) => a.shipping && !a.invoice)
    }, {
      type: 'OTHER',
      addresses: addresses.filter((a) => !a.invoice && !a.shipping)
    }];

    this.addressGroups = this.addressGroups.filter((addressGroup: AddressGroup) => addressGroup.addresses.length > 0);

  }

}
