import {Component, AfterViewInit, OnInit, OnDestroy, Input, ViewChild} from '@angular/core';
import {SettingsService} from "../../../services/settings/settings.service";
import {BalanceService} from "../../../services/balance.service";
import {Notifications} from "../../../services/notifications.service";
import {PusherService} from "../../../services/pusher.service";
import {SystemService} from "../../../services/system.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {AdminApi} from "../../../services/adminApi.service";
import {DatatableComponent} from "@swimlane/ngx-datatable";

declare const swal: any;
declare const $: any;

@Component({
    templateUrl: './detailcoin.component.html',
    styleUrls: ['./detailcoin.component.scss']
})
export class DetailCoinComponent implements OnInit, AfterViewInit, OnDestroy {
    coins: any = [];
    selCoin = 'TL';
    loading = true;

    history: any = [];
    total: any = {
        user_count: 0,
        balance: 0,
        pending: 0
    };

    showManualModal = false;
    manual_amount = 0;

    @ViewChild(DatatableComponent) table: DatatableComponent;
    constructor(public api: AdminApi,
                public settings: SettingsService,
                public balance: BalanceService,
                public notify: Notifications,
                public pusher: PusherService,
                public system: SystemService,
                private activatedRoute: ActivatedRoute,
                public user: UserService,
                public router: Router
    ) {
        // this.selCoin = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
    }

    ngOnInit() {
        this.api.getCoin({
        }).subscribe(res => {
            if (res.success) {
                this.coins = res.data;
            }
        }, err => {

        });

        this.loadHistory();
    }

    loadHistory() {

        this.loading = true;
        this.api.getUserCoinHistory(this.selCoin, {
            user_id: this.user.selectedUser.id
        }).subscribe( res => {
            this.loading = false;
            var _parent = this;
            if (res.success) {
                this.history = res.data;
            }
        }, err => {
            this.loading = false;
        });
    }
    ngOnDestroy() {
    }

    ngAfterViewInit() {
    }

    onClickCoin(coin) {
        this.selCoin = coin.coin;
        this.loadHistory();
    }

    onAddManual() {
        this.manual_amount = 0;
        this.showManualModal = true;
    }

    addManual() {
        if (this.manual_amount == 0) {
            this.notify.showNotification('Warning', 'Please enter amount.', 'warning');
            return;
        }
        this.api.addCoinManual(this.selCoin, {
            user_id: this.user.selectedUser.id,
            amount: this.manual_amount
        }).subscribe(res => {
            if (res.success) {
                this.notify.showNotification('Success', 'Added successfully', 'success');
                this.showManualModal = false;
                this.loadHistory();

                this.user.getUserBalance();
            }
        }, err => {
            this.notify.showNotification('Error', 'Failed.', 'error');
        });
    }

    deleteManual(id) {
        this.api.deleteCoinManual(this.selCoin, {
            id: id
        }).subscribe(res => {
            if (res.success) {
                this.notify.showNotification('Success', 'Deleted successfully', 'success');
                this.loadHistory();

                this.user.getUserBalance();
            }
        }, err => {
            this.notify.showNotification('Error', 'Failed.', 'error');
        });
    }
}