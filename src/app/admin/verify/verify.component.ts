import {Component, AfterViewInit, OnInit} from '@angular/core';
import {SettingsService} from "../../services/settings/settings.service";
import {AdminApi} from "../../services/adminApi.service";
import {BalanceService} from "../../services/balance.service";
import {Notifications} from "../../services/notifications.service";
@Component({
	templateUrl: './verify.component.html',
	styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit, AfterViewInit {
	users: any = [];

	selected: boolean = false;
	selectedUser: any = {};
	constructor (
		public adminApi: AdminApi,
		public settings: SettingsService,
		public balance: BalanceService,
		public notify: Notifications
	) {

	}

	ngOnInit() {
		this.loadUser();
	}

	onDetail(user) {
		this.adminApi.getUserProfile({
			user_id: user.id
		}).subscribe( res => {
			if (res.success) {
				this.selectedUser = res.data;
				this.selectedUser.email = user.email;
				this.selected = true;
			}
		});
	}

	loadUser() {
		this.adminApi.getUsers({
			verify_status: 1
		}).subscribe( res => {
			if (res.success) {
				this.users = res.data;
			}
		});
	}

	onVerify() {
		this.settings.loading = true;
		this.adminApi.verifyUserProfile({
			id: this.selectedUser.id,
			note: this.selectedUser.note,
			verify_status: 3
		}).subscribe( res=> {
			this.settings.loading = false;
			if (res.success) {
				this.loadUser();
				this.selectedUser = {};
				this.notify.showNotification('Success', 'Success', 'success');
			}
		}, err=> {
			this.settings.loading = false;
		});
	}

	onReject() {
		if (!this.selectedUser.note || this.selectedUser.note == '') {
			this.notify.showNotification('Warning', 'Please enter reject reason.', 'warning');
			return;
		}

		this.settings.loading = true;
		this.adminApi.verifyUserProfile({
			id: this.selectedUser.id,
			note: this.selectedUser.note,
			verify_status: 2
		}).subscribe( res=> {
			this.settings.loading = false;
			if (res.success) {
				this.loadUser();
				this.selectedUser = {};
				this.notify.showNotification('Success', 'Success', 'success');
			}
		}, err=> {
			this.settings.loading = false;
		});
	}

	ngAfterViewInit(){}
}