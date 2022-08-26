import {Component, AfterViewInit, OnInit} from '@angular/core';
import {SettingsService} from "../../services/settings/settings.service";
import {Api} from "../../services/api.service";
import {BalanceService} from "../../services/balance.service";
import {Notifications} from "../../services/notifications.service";
import {AdminApi} from "../../services/adminApi.service";

declare var $:any;

@Component({
	templateUrl: './depositHistory.component.html',
	styleUrls: ['./depositHistory.component.scss']
})
export class DepositHistoryComponent implements OnInit, AfterViewInit {
	selCoin = 'TL';
	selCoinInfo: any = {
		explorer_url: ''
	};
	trans: any = [];

	coins: any = [];

	datatable: any = null;

	constructor (
		public adminApi: AdminApi,
		public settings: SettingsService,
		public balance: BalanceService,
		public notify: Notifications
	) {

	}

	ngOnInit() {
		this.adminApi.getCoin({
		}).subscribe(res => {
			if (res.success) {
				this.coins = res.data;
				this.selCoinInfo = res.data[0];
			}
		}, err => {

		});

		this.loadDepositHistory();
	}

	loadDepositHistory() {
		if (this.datatable) {
			this.datatable.destroy();
			this.datatable = null;
			this.trans = [];
		}

		this.adminApi.getDepositHistory(this.selCoin, {

		}).subscribe( res => {
			if (res.success) {
				this.trans = res.data;

				var _parent = this;
				var timer = setInterval(function () {
					if (res.data.length == $('#tlhistorytable tbody tr').length) {
						_parent.datatable = $('#tlhistorytable').DataTable();
						clearInterval(timer);
					}
				}, 100);
			}
		});
	}

	onClickCoin(coin) {
		this.selCoin = coin.coin;
		this.selCoinInfo = coin;

			this.loadDepositHistory();
	}

	ngAfterViewInit(){}
}