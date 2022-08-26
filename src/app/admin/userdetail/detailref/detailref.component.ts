import {Component, AfterViewInit, OnInit, OnDestroy, Input} from '@angular/core';
import {SettingsService} from "../../../services/settings/settings.service";
import {BalanceService} from "../../../services/balance.service";
import {Notifications} from "../../../services/notifications.service";
import {PusherService} from "../../../services/pusher.service";
import {SystemService} from "../../../services/system.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../service/user.service";
import {AdminApi} from "../../../services/adminApi.service";

declare const swal: any;
declare const $: any;

@Component({
    templateUrl: './detailref.component.html',
    styleUrls: ['./detailref.component.scss']
})
export class DetailRefComponent implements OnInit, AfterViewInit, OnDestroy {
    coins: any = [];

    friends: any = [];
    commissions: any = {};
    history: any = [];

    constructor(public api: AdminApi,
                public settings: SettingsService,
                public balance: BalanceService,
                public notify: Notifications,
                public pusher: PusherService,
                public system: SystemService,
                private activatedRoute: ActivatedRoute,
                public user: UserService
    ) {

    }

    ngOnInit() {
        this.api.getCoin({
        }).subscribe(res => {
            if (res.success) {
                this.coins = res.data;
            }
        }, err => {

        });

        this.api.getAdminReferral({
            user_id: this.user.selectedUser.id
        }).subscribe(res => {
            if (res.success) {
                this.friends = res.data;
            }
        });

        this.api.getAdminRefCommission({
            user_id: this.user.selectedUser.id
        }).subscribe(res => {
            if (res.success) {
                this.commissions = res.data;
            }
        });

        this.api.getAdminCommissionHistory({
            user_id: this.user.selectedUser.id
        }).subscribe(res => {
            if (res.success) {
                this.history = res.data;
            }
        });
    }

    ngOnDestroy() {
    }

    ngAfterViewInit() {
    }

}