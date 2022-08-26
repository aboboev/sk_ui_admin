import {Component, AfterViewInit, OnInit} from '@angular/core';
import {SettingsService} from "../../services/settings/settings.service";
import {Api} from "../../services/api.service";
import {BalanceService} from "../../services/balance.service";
import {Notifications} from "../../services/notifications.service";
import {AdminApi} from "../../services/adminApi.service";

declare var $:any;

@Component({
	templateUrl: './pairSetting.component.html',
	styleUrls: ['./pairSetting.component.scss']
})
export class PairSettingComponent implements OnInit, AfterViewInit {
	pairs: any = [];
	ieopairs: any = [];

	constructor (
		public adminApi: AdminApi,
		public settings: SettingsService,
		public balance: BalanceService,
		public notify: Notifications
	) {

	}

	ngOnInit() {
		this.adminApi.getAllCoinPairs().subscribe(res => {
			if (res.success) {
				this.pairs = res.data;
			}
		}, err => {

		});

        this.adminApi.getAllIeoCoinPairs().subscribe(res => {
            if (res.success) {
                this.ieopairs = res.data;
            }
        }, err => {

        });
	}

	ngAfterViewInit(){}

	suspend(pair) {
		this.settings.loading = true;
		this.adminApi.suspendCoinPair({
			id: pair.id
		}).subscribe(res => {
			this.settings.loading = false;
			if (res.success) {
				this.notify.showNotification('Success', 'Suspended', 'success');
				pair.suspended = 1;
			} else {
				this.notify.showNotification('Warning', res.error, 'warning');
			}
		}, err=> {
			this.settings.loading = false;
			this.notify.showNotification('Error', 'Please try again.', 'error');
		});
	}

	unsuspend(pair) {
		this.settings.loading = true;
		this.adminApi.unsuspendCoinPair({
			id: pair.id
		}).subscribe(res => {
			this.settings.loading = false;
			if (res.success) {
				this.notify.showNotification('Success', 'UnSuspended', 'success');
				pair.suspended = 0;
			} else {
				this.notify.showNotification('Warning', res.error, 'warning');
			}
		}, err=> {
			this.settings.loading = false;
			this.notify.showNotification('Error', 'Please try again.', 'error');
		});
	}
    ieosuspend(pair) {
        this.settings.loading = true;
        this.adminApi.suspendIeoCoinPair({
            id: pair.id
        }).subscribe(res => {
            this.settings.loading = false;
            if (res.success) {
                this.notify.showNotification('Success', 'Suspended', 'success');
                pair.suspended = 1;
            } else {
                this.notify.showNotification('Warning', res.error, 'warning');
            }
        }, err=> {
            this.settings.loading = false;
            this.notify.showNotification('Error', 'Please try again.', 'error');
        });
    }

    ieounsuspend(pair) {
        this.settings.loading = true;
        this.adminApi.unsuspendIeoCoinPair({
            id: pair.id
        }).subscribe(res => {
            this.settings.loading = false;
            if (res.success) {
                this.notify.showNotification('Success', 'UnSuspended', 'success');
                pair.suspended = 0;
            } else {
                this.notify.showNotification('Warning', res.error, 'warning');
            }
        }, err=> {
            this.settings.loading = false;
            this.notify.showNotification('Error', 'Please try again.', 'error');
        });
    }
}