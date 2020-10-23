import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CIBSpi } from '../interfaces/Webshop.interfaces';
import { PaymentsService } from '../services';
import { CheckPaymentRequest, CheckPaymentResponse } from '../interfaces/Payment.interfaces';

export class CartcheckpaymentComponent implements OnInit {

  loading = false;
  CIBSpi: CIBSpi = null;

  constructor(private activatedRoute: ActivatedRoute, private paymentsService: PaymentsService, private router: Router) { }

  ngOnInit(): void {
      this.init();
  }

  init(): void {
      this.checkPayment();
  }

  checkPayment(): void {

    this.loading = true;

    const pidParam: string = this.activatedRoute.snapshot.queryParamMap.get('PID');
    const cryptoParam: string = this.activatedRoute.snapshot.queryParamMap.get('CRYPTO');
    const dataParam: string = this.activatedRoute.snapshot.queryParamMap.get('DATA');

    if (pidParam === null || cryptoParam === null || dataParam === null) {
      this.router.navigateByUrl('/');
    }

    const pid: string = ['PID', pidParam].join('=');
    const crypto: string = ['CRYPTO', cryptoParam].join('=');
    const data: string = ['DATA', dataParam].join('=');

    this.paymentsService.check<CheckPaymentRequest, CheckPaymentResponse>({
        query: [pid, crypto, data].join('&')
    }).subscribe((rsp) => {
      this.CIBSpi = rsp.CIBSpi;
    }).add(() => {
      this.loading = false;
    });
  }

}
