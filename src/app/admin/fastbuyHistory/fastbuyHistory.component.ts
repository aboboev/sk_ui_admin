import {Component, AfterViewInit, OnInit} from '@angular/core';
import {SettingsService} from "../../services/settings/settings.service";
import {Api} from "../../services/api.service";
import {BalanceService} from "../../services/balance.service";
import {Notifications} from "../../services/notifications.service";
import {AdminApi} from "../../services/adminApi.service";

declare var $:any;

@Component({
	templateUrl: './fastbuyHistory.component.html',
	styleUrls: ['./fastbuyHistory.component.scss']
})
export class FastbuyHistoryComponent implements OnInit, AfterViewInit {
	selCoin = 'BTC';
	trans: any = [];

	datatable: any = null;
	coins: any = [];

	constructor (
		public adminApi: AdminApi,
		public settings: SettingsService,
		public balance: BalanceService,
		public notify: Notifications
	) {

	}

	ngOnInit() {
		this.adminApi.getCoin({
			only_coin: true
		}).subscribe(res => {
			if (res.success) {
				this.coins = res.data;
			}
		}, err => {

		});

		this.loadFastbuyHistory();
	}

	loadFastbuyHistory() {
		if (this.datatable) {
			this.datatable.destroy();
			this.datatable = null;
		}

		this.adminApi.getFastbuyHistory(this.selCoin, {

		}).subscribe( res => {
			if (res.success) {
				this.trans = res.data;

				if (res.data.length > 0) {
					var _parent = this;
					var timer = setInterval(function () {
						if (res.data.length == $('#historytable tbody tr').length) {
							_parent.datatable = $('#historytable').DataTable();
							clearInterval(timer);
						}
					}, 100);
				} else {

				}
			}
		});
	}

	onClickCoin(coin) {
		this.selCoin = coin.coin;
		this.loadFastbuyHistory();
	}

	ngAfterViewInit(){}
}