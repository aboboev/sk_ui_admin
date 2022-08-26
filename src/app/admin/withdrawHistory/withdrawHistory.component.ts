import {Component, AfterViewInit, OnInit} from '@angular/core';
import {SettingsService} from "../../services/settings/settings.service";
import {Api} from "../../services/api.service";
import {BalanceService} from "../../services/balance.service";
import {Notifications} from "../../services/notifications.service";
import {AdminApi} from "../../services/adminApi.service";

declare var $:any;

@Component({
	templateUrl: './withdrawHistory.component.html',
	styleUrls: ['./withdrawHistory.component.scss']
})
export class WithdrawHistoryComponent implements OnInit, AfterViewInit {
	selCoin = 'TL';
	selCoinInfo: any = {};
	trans: any = [];

	details: any = [];

	detail_show = false;
	datatable: any = null;
	tldatatable: any = null;

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
		}).subscribe(res => {
			if (res.success) {
				this.coins = res.data;
				this.selCoinInfo = res.data[0];
			}
		}, err => {

		});

		this.loadWithdrawHistory();
	}

	loadWithdrawHistory() {
		if (this.datatable) {
			this.datatable.destroy();
			this.datatable = null;
		}

		if (this.tldatatable) {
			this.tldatatable.destroy();
			this.tldatatable = null;
		}

		this.adminApi.getWithdrawHistory(this.selCoin, {

		}).subscribe( res => {
			if (res.success) {
				this.trans = res.data;

				if (res.data.length > 0 && this.selCoinInfo.is_crypto == 0) {
					var _parent = this;
					var timer = setInterval(function () {
						if (res.data.length == $('#tlhistorytable tbody tr').length) {
							_parent.tldatatable = $('#tlhistorytable').DataTable();
							clearInterval(timer);
						}
					}, 100);
				} else if (res.data.length > 0 && this.selCoinInfo.is_crypto != 0) {
					var _parent = this;
					var timer = setInterval(function () {
						if (res.data.length == $('#historytable tbody tr').length) {
							_parent.datatable = $('#historytable').DataTable();
							clearInterval(timer);
						}
					}, 100);
				}
			}
		});
	}

	onClickCoin(coin) {
		this.selCoin = coin.coin;
		this.selCoinInfo = coin;
		this.loadWithdrawHistory();

		this.detail_show = false;
	}

	onDetail(txid) {
		this.adminApi.getWithdrawDetail(this.selCoin, {
			txid: txid
		}).subscribe( res => {
			if (res.success) {
				this.details = res.data;
				this.detail_show = true;
			}
		});
	}
	ngAfterViewInit(){}
}