import { SuccessOrderObject } from '../interfaces/CartSuccess.interfaces';
import { ModalsService } from '../../../general/services/Modals.service';
import { StartpaymentComponent } from './modals/startpayment.component';

export class CartSuccessOrder {
    successOrderObject: SuccessOrderObject = null;

    showStartPaymentModal(): void {
      this.modalsService.open({
          name: 'startpayment',
          component: StartpaymentComponent,
          inputs: {
              orderId: this.successOrderObject.orderId
          }
      });
    }

    constructor(
        private modalsService: ModalsService
    ) { }
}
