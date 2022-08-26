import {Component, AfterViewInit, OnInit, OnDestroy} from '@angular/core';
import {SettingsService} from "../../../services/settings/settings.service";
import {BalanceService} from "../../../services/balance.service";
import {Notifications} from "../../../services/notifications.service";
import {PusherService} from "../../../services/pusher.service";
import {SystemService} from "../../../services/system.service";
import {Router} from "@angular/router";
import {AdminApi} from "../../../services/adminApi.service";

declare const swal: any;
declare const $: any;

@Component({
    templateUrl: './pendingtl.component.html',
    styleUrls: ['./pendingtl.component.scss']
})
export class DepositPendingTLComponent implements OnInit, AfterViewInit, OnDestroy {

    loading = true;

    pendings: any = [];

    constructor(public adminApi: AdminApi,
                public settings: SettingsService,
                public balance: BalanceService,
                public notify: Notifications,
                public pusher: PusherService,
                public system: SystemService,
                public router: Router) {


    }

    ngOnInit() {
        this.loadPending();
    }

    add(num1, num2) {
        return Number(num1) + Number(num2);
    }

    loadPending() {
        this.adminApi.getFinanceDepositPending('TL', {}).subscribe(res => {
            this.loading = false;
            if (res.success) {
                this.pendings = res.data;
            }
        }, err => {

        });

    }
    ngOnDestroy() {
    }

    ngAfterViewInit() {
    }

    withdraw(id) {
        let _parent = this;
        swal({
            title: 'Are you sure?',
            text: 'This transaction will be confirmed.',
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'Yes',
            buttonsStyling: false
        }, function () {
            _parent.settings.loading = true;
            _parent.adminApi.depositFinancePending('TL', {
                id: id,
            }).subscribe(res => {
                _parent.settings.loading = false;

                if (res.success) {
                    _parent.notify.showNotification('Success', 'Successfully Confirmed.', 'success');
                    _parent.loadPending();
                } else {
                    _parent.notify.showNotification('Warning', res.error, 'warning');
                }
            }, err => {
                _parent.notify.showNotification('Error', 'Please try again.', 'error');
                _parent.settings.loading = false;
            });
        });
    }

    reject(id) {
        let _parent = this;
        swal({
            title: 'Are you sure?',
            text: 'This transaction will be rejected.',
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'Yes',
            buttonsStyling: false
        }, function () {
            _parent.settings.loading = true;
            _parent.adminApi.rejectFinancePending('TL', {
                id: id,
            }).subscribe(res => {
                _parent.settings.loading = false;

                if (res.success) {
                    _parent.notify.showNotification('Success', 'Successfully Rejected.', 'success');
                    _parent.loadPending();
                } else {
                    _parent.notify.showNotification('Warning', res.error, 'warning');
                }
            }, err => {
                _parent.notify.showNotification('Error', 'Please try again.', 'error');
                _parent.settings.loading = false;
            });
        });
    }
}