import { OnInit } from '@angular/core';
import { OrderHistoryItem } from '../../interfaces/Webshop.interfaces';
import { ModalsService } from '../../../../general/services/Modals.service';
import { ProfileService } from '../../services/Profile.service';
import { GetOrderHistoryRequest, GetOrderHistoryResponse, GetOrderHistoryItemDetailsResponse } from '../../interfaces/Profile.interfaces';
import { StartpaymentComponent } from '../modals/startpayment.component';

export class ProfileordersComponent implements OnInit {

    selectedOrder: number = null;

    orderHistory: OrderHistoryItem[] = [];
    hasMore = false;
    loading = false;
    maxCount: number = null;
    start = 0;
    count = 10;

    constructor(
        private modalsService: ModalsService,
        private profileService: ProfileService
    ) { }

    ngOnInit(): void {
        this.init();
    }

    init(): void {
        this.getOrderHistory();
    }

    getOrderHistory(): void {
        this.loading = true;
        this.profileService.getOrderHistory<GetOrderHistoryRequest, GetOrderHistoryResponse>({
            start: this.start,
            count: this.count
        }).subscribe((rsp) => {
            this.orderHistory.push(...rsp.orders);
            this.maxCount = rsp.maxCount;
            this.hasMore = this.orderHistory.length < rsp.maxCount;
        }).add(() => {
            this.loading = false;
        });
    }

    toggleDetails(orderHistoryItem: OrderHistoryItem): void {
        if (orderHistoryItem.detailsLoading) {
            return;
        }
        if (orderHistoryItem.showDetails) {
            orderHistoryItem.showDetails = false;
        } else {
            if (orderHistoryItem.detailsLoaded) {
                orderHistoryItem.showDetails = true;
            } else {
                orderHistoryItem.detailsLoading = true;
                this.profileService.getOrderHistoryItemDetails<GetOrderHistoryItemDetailsResponse>().subscribe((rsp) => {
                    orderHistoryItem.extras = rsp.orderHistoryItem.extras;
                    orderHistoryItem.items = rsp.orderHistoryItem.items;
                    orderHistoryItem.transactions = rsp.orderHistoryItem.transactions;
                    orderHistoryItem.invoices = rsp.orderHistoryItem.invoices;
                    orderHistoryItem.detailsLoaded = true;
                }).add(() => {
                    orderHistoryItem.detailsLoading = false;
                });
            }
        }
    }

    startPayment(orderId: number): void {
        this.modalsService.open({
            name: 'startpayment',
            component: StartpaymentComponent,
            inputs: {
                orderId
            }
        });
    }
}
