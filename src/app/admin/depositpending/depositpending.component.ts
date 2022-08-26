import {Component, AfterViewInit, OnInit} from '@angular/core';
import {SettingsService} from "../../services/settings/settings.service";
import {Api} from "../../services/api.service";
import {BalanceService} from "../../services/balance.service";
@Component({
	templateUrl: './depositpending.component.html',
	styleUrls: ['./depositpending.component.scss']
})
export class DepositPendingComponent implements OnInit, AfterViewInit {
	constructor(
		public api: Api,
		public settings: SettingsService,
		public balance: BalanceService

	) {

	}

	ngOnInit() {

	}
	ngAfterViewInit(){}
}