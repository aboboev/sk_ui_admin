import {Component, AfterViewInit, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {SettingsService} from "../../../services/settings/settings.service";
import {BalanceService} from "../../../services/balance.service";
import {Notifications} from "../../../services/notifications.service";
import {PusherService} from "../../../services/pusher.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {SystemService} from "../../../services/system.service";
import {Router} from "@angular/router";
import {AdminApi} from "../../../services/adminApi.service";
import {DatatableComponent} from "@swimlane/ngx-datatable";

declare const swal: any;
declare const $: any;

@Component({
    templateUrl: './userscoin.component.html',
    styleUrls: ['./userscoin.component.scss']
})
export class UsersCoinComponent implements OnInit, AfterViewInit, OnDestroy {

    coins: any = [];

    selCoin = 'TL';
    loading = false;

    temp: any = [];
    users: any = [];
    total: any = {
        user_count: 0,
        balance: 0,
        pending: 0
    };

    datatable: any = null;
    @ViewChild(DatatableComponent) table: DatatableComponent;

    constructor(public adminApi: AdminApi,
                public settings: SettingsService,
                public balance: BalanceService,
                public notify: Notifications,
                public pusher: PusherService,
                public system: SystemService,
                public router: Router
    ) {


    }

    ngOnInit() {
        this.adminApi.getCoin({
        }).subscribe(res => {
            if (res.success) {
                this.coins = res.data;
            }
        }, err => {

        });
        this.loadCoinUsers();
    }

    loadCoinUsers() {
        this.loading = true;

        this.total.balance = 0;
        this.total.pending = 0;
        this.total.user_count = 0;
        this.adminApi.getCoinUsers(this.selCoin, {}).subscribe( res => {
            this.loading = false;
            if (res.success) {
                this.temp = res.data;
                this.users = res.data;

                this.total.user_count = res.data.length;
                for (var i = 0; i < res.data.length; i ++) {
                    this.total.balance += Number(res.data[i].balance_amount);
                    this.total.pending += Number(res.data[i].pending_amount);
                }
            }
        }, err => {
            this.loading = false;
        });
    }

    onClickCoin(e, coin) {
        this.selCoin = coin;

        this.loadCoinUsers();
    }

    ngOnDestroy() {
    }

    ngAfterViewInit() {
    }

    onDetail(user_id) {
        this.router.navigate(['/panel/users/detail/' + user_id + '/coin']);
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();

        const temp = this.temp.filter(user => user.email.toLowerCase().indexOf(val) > -1 || !val);

        this.users = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    }

}