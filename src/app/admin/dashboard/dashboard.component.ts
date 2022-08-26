import {Component, AfterViewInit, OnInit} from '@angular/core';
import {SettingsService} from "../../services/settings/settings.service";
import {BalanceService} from "../../services/balance.service";
import {AdminApi} from "../../services/adminApi.service";
import {CoinApi} from "../../services/coinApi.service";
@Component({
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
	usersts: any = {};
	coinsts: any = [];

	constructor (
		public api: AdminApi,
		public coinApi: CoinApi,
		public settings: SettingsService,
		public balance: BalanceService

	) {

	}

	ngOnInit() {
		this.api.getUserStatistics({}).subscribe(res => {
			if (res.success) {
				this.usersts = res.data;
			}
		});

		this.api.getCoinStatistics({}).subscribe(res => {
			if (res.success) {
				this.coinsts = res.data;
			}
		});
	}
	ngAfterViewInit(){}
}