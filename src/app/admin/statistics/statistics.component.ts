import {Component, AfterViewInit, OnInit} from '@angular/core';
import {SettingsService} from "../../services/settings/settings.service";
import {BalanceService} from "../../services/balance.service";
import {AdminApi} from "../../services/adminApi.service";
import {CoinApi} from "../../services/coinApi.service";
@Component({
	templateUrl: './statistics.component.html',
	styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, AfterViewInit {
	walletsts: any = [];

	constructor (
		public api: AdminApi,
		public coinApi: CoinApi,
		public settings: SettingsService,
		public balance: BalanceService

	) {

	}

	ngOnInit() {

		this.api.getWalletStatistics().subscribe( res=> {
			if (res.success) {
				this.walletsts = res.data;
			}
		});
	}
	ngAfterViewInit(){}
}