import { OnInit, Input } from '@angular/core';
import { PaymentsService } from '../../services';
import { StartPaymentRequest, StartPaymentResponse } from '../../interfaces/Payment.interfaces';
import { ModalsService } from '../../../../general/services/Modals.service';

export class StartpaymentComponent implements OnInit {

  @Input() orderId: number = null;
  error = false;
  loading = true;
  payed = false;
  transactionInProgress = false;

  constructor(
    private paymentsService: PaymentsService,
    private modalsService: ModalsService
  ) { }

  ngOnInit(): void {
    this.paymentsService.start<StartPaymentRequest, StartPaymentResponse>({
      orderId: this.orderId
    }).subscribe((rsp) => {
      if (!rsp.paymentError && !rsp.payed && !rsp.transactionInProgress) {
        this.goToPaymentPage(rsp.paymentUrl);
      } else if (rsp.payed) {
        this.payed = true;
        // this.ordersService.removeTransactionInProgressFromOrder.next([this.orderId, true]); TODO: Ordersservice
      } else if (rsp.transactionInProgress) {
        this.transactionInProgress = true;
      } else {
        this.error = true;
      }
    }).add(() => {
      this.loading = false;
      this.closeStartPaymentModal();
    });
  }

  goToPaymentPage(paymentUrl: string): void {
    window.location.href = paymentUrl;
    this.closeStartPaymentModal();
  }

  closeStartPaymentModal(): void {
    this.modalsService.close('startpayment');
  }

}
